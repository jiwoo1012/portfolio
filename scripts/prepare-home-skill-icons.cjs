const fs = require('node:fs/promises');
const sharp = require('sharp');
const path = require('node:path');
const directory = path.resolve('public/about/skill');
const sources = {
  'jQuery.png': 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/jquery.svg',
  'Codex.png': 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/codex_light.svg',
  'Midjourney.png': 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/midjourney.svg',
  'Gemini.png': 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/gemini.svg',
  'Claude.png': 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/claude-ai-icon.svg',
  'Swiper.png': 'https://cdn.simpleicons.org/swiper',
};
async function main() {
  for (const [name, url] of Object.entries(sources)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    await sharp(Buffer.from(await response.arrayBuffer())).resize(160, 160, { fit: 'inside' }).png().toFile(path.join(directory, name));
  }
  await sharp(path.join(directory, 'chartjs.svg')).resize(160, 160, { fit: 'inside' }).png().toFile(path.join(directory, 'Chartjs.png'));
  const illustrations = {
    'Canvas.png': '<rect x="20" y="25" width="120" height="100" rx="9" fill="#fff8ea" stroke="#222" stroke-width="6"/><path d="M36 106 67 66l26 28 17-21 18 33" fill="none" stroke="#ef3936" stroke-width="9"/><circle cx="111" cy="50" r="10" fill="#f0c347"/>',
    'WebSocket.png': '<path d="M25 55h110l-24-24m24 74H25l24 24" fill="none" stroke="#252525" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>',
    'KlingAI.png': '<rect x="8" y="8" width="144" height="144" rx="32" fill="#141414"/><text x="80" y="77" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="bold" fill="#daff76">KLING</text><text x="80" y="116" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="bold" fill="white">AI</text>',
  };
  for (const [name, content] of Object.entries(illustrations)) {
    await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">${content}</svg>`)).png().toFile(path.join(directory, name));
  }
  console.log('Prepared 10 PNG skill icons.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
