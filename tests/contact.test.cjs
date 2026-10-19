const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(path, globals = {}) {
  const exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(compiled, { exports, Response, Request, URL, AbortSignal, ...globals });
  return exports;
}
const validation = load('src/lib/contact.ts');
function route(env = {}, fetch = () => { throw new Error('Unexpected outgoing request'); }) {
  return load('src/app/api/contact/route.ts', { require: () => validation, process: { env }, fetch }).POST;
}
function request(body, origin = 'https://portfolio.example') {
  return new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
}

test('email validation accepts normal addresses and rejects malformed addresses', () => {
  for (const email of ['hello@example.com', 'person+work@sub.example.co.kr']) assert.equal(validation.validateContact(email, '질문').email, '');
  for (const email of ['', 'hello', 'a@localhost', '.a@example.com', 'a..b@example.com', 'a@-example.com', 'a@example..com', 'a\r\n@example.com']) assert.notEqual(validation.validateContact(email, '질문').email, '');
});
test('messages cannot be blank or oversized', () => {
  assert.ok(validation.validateContact('hello@example.com', ' \n ').message);
  assert.ok(validation.validateContact('hello@example.com', 'x'.repeat(5001)).message);
});
test('server rejects invalid input without contacting the provider', async () => {
  for (const body of [{}, { email: 'bad', message: 'question' }, { email: 'a@example.com', message: '  ' }, { email: [], message: 'test' }]) assert.equal((await route()(request(body))).status, 400);
});
test('server rejects cross-origin and honeypot submissions', async () => {
  assert.equal((await route()(request({ email: 'a@example.com', message: 'question' }, 'https://other.example'))).status, 403);
  assert.equal((await route()(request({ email: 'a@example.com', message: 'question', website: 'bot' }))).status, 400);
});
test('missing configuration is an error, not a fake success', async () => {
  assert.equal((await route()(request({ email: 'a@example.com', message: 'question' }))).status, 503);
});
test('successful send fixes the recipient and uses the visitor address only for replies', async () => {
  let payload;
  const send = route({ RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'contact@verified.example' }, async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    payload = JSON.parse(options.body);
    return Response.json({ id: 'mock-email-id' });
  });
  const response = await send(request({ email: ' visitor@example.com ', message: ' <script>question</script> ', to: 'other@example.com' }));
  assert.equal(response.status, 200);
  assert.deepEqual(payload.to, ['jiwoo6306@gmail.com']);
  assert.equal(payload.reply_to, 'visitor@example.com');
  assert.equal(payload.from, 'contact@verified.example');
  assert.equal(payload.html, undefined);
  assert.ok(payload.text.includes('<script>question</script>'));
});
test('provider rejection and connection failure never return success', async () => {
  const env = { RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'contact@verified.example' };
  for (const fetch of [async () => Response.json({ error: 'rejected' }, { status: 429 }), async () => { throw new Error('offline'); }, async () => Response.json({})]) {
    assert.equal((await route(env, fetch)(request({ email: 'a@example.com', message: 'question' }))).status, 502);
  }
});
test('configured Gmail inbox overrides the default and cannot be overridden by a visitor', async () => {
  let payload;
  const send = route({ RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'onboarding@resend.dev', CONTACT_TO_EMAIL: ' owner@gmail.com ' }, async (_, options) => {
    payload = JSON.parse(options.body);
    return Response.json({ id: 'mock-email-id' });
  });
  assert.equal((await send(request({ email: 'visitor@example.com', message: 'question', to: 'other@example.com' }))).status, 200);
  assert.deepEqual(payload.to, ['owner@gmail.com']);
  assert.equal(payload.reply_to, 'visitor@example.com');
});
test('invalid configured recipient does not contact the provider', async () => {
  assert.equal((await route({ RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'onboarding@resend.dev', CONTACT_TO_EMAIL: 'invalid' })(request({ email: 'visitor@example.com', message: 'question' }))).status, 503);
});
test('test-sender recipient restriction explains the setup issue without exposing provider details', async () => {
  const send = route({ RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'onboarding@resend.dev', CONTACT_TO_EMAIL: 'owner@gmail.com' }, async () => Response.json({ name: 'validation_error', message: 'You can only send testing emails to your own email address (private@example.com).' }, { status: 403 }));
  const response = await send(request({ email: 'visitor@example.com', message: 'question' }));
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.ok(result.error.includes('Resend 가입 이메일'));
  assert.ok(!result.error.includes('private@example.com'));
});
