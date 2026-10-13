"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

type IntroStage =
  | "typing"
  | "switching"
  | "statement";

/* =========================================================
   MAIN CODE
========================================================= */

const codeLines = [
  "const draft = await ai.generate(requirements);",
  "reviewUserFlow(draft);",
  "checkResponsive(draft);",
  "checkAccessibility(draft);",
  'handleStates(["loading", "empty", "error"]);',
  "const result = refactor(draft);",
  "return result;",
];

/* =========================================================
   DETAIL CODE

   돋보기 안에서는 설명이 아니라
   해당 코드를 더 구체적으로 풀어 보여줌.
========================================================= */

const detailCodes = [
  {
    number: "01",
    title: "AI DRAFT",

    lines: [
      "const draft = await ai.generate({",
      "  goal, context, constraints,",
      "});",
    ],
  },

  {
    number: "02",
    title: "USER FLOW",

    lines: [
      "analyzeFlow(draft);",
      "removeFriction();",
      "prioritizeAction();",
    ],
  },

  {
    number: "03",
    title: "RESPONSIVE",

    lines: [
      'testViewport("desktop");',
      'testViewport("tablet");',
      'testViewport("mobile");',
    ],
  },

  {
    number: "04",
    title: "ACCESSIBILITY",

    lines: [
      "checkSemantic();",
      "checkKeyboard();",
      "checkContrast();",
    ],
  },

  {
    number: "05",
    title: "EDGE CASES",

    lines: [
      "if (loading) showSkeleton();",
      "if (empty) showEmpty();",
      "if (error) showError();",
    ],
  },

  {
    number: "06",
    title: "REFACTOR",

    lines: [
      "extractComponents();",
      "simplifyLogic();",
      "removeDuplication();",
    ],
  },

  {
    number: "07",
    title: "RESULT",

    lines: [
      "const result = validate(draft);",
      "return result;",
    ],
  },
];

/* =========================================================
   IMPORTANT KEYWORDS
========================================================= */

const importantKeywords = [
  "ai.generate",
  "reviewUserFlow",
  "handleStates",
  "refactor",
  "return result",
];

/* =========================================================
   PIXELS
========================================================= */

const pixelBits = [
  { x: 7, y: 9, w: 8, h: 8 },
  { x: 20, y: 16, w: 16, h: 5 },
  { x: 35, y: 8, w: 5, h: 5 },

  { x: 63, y: 11, w: 5, h: 5 },
  { x: 83, y: 8, w: 16, h: 5 },
  { x: 95, y: 19, w: 7, h: 7 },

  { x: 6, y: 38, w: 14, h: 5 },
  { x: 17, y: 58, w: 7, h: 7 },
  { x: 27, y: 32, w: 5, h: 5 },

  { x: 75, y: 36, w: 6, h: 6 },
  { x: 88, y: 55, w: 15, h: 5 },
  { x: 96, y: 32, w: 7, h: 7 },

  { x: 8, y: 80, w: 7, h: 7 },
  { x: 22, y: 89, w: 14, h: 5 },
  { x: 38, y: 77, w: 5, h: 5 },

  { x: 64, y: 84, w: 5, h: 5 },
  { x: 80, y: 91, w: 14, h: 5 },
  { x: 94, y: 79, w: 8, h: 8 },
];

const pixelSequence = [
  pixelBits[0],
  pixelBits[10],
  pixelBits[4],
  pixelBits[12],
  pixelBits[7],
  pixelBits[2],
  pixelBits[15],
  pixelBits[5],
  pixelBits[9],
  pixelBits[13],
  pixelBits[3],
  pixelBits[16],
  pixelBits[6],
  pixelBits[11],
  pixelBits[1],
  pixelBits[17],
  pixelBits[8],
  pixelBits[14],
];

const totalCharacters =
  codeLines.reduce(
    (total, line) =>
      total + line.length,
    0
  );

/* =========================================================
   PAGE
========================================================= */

export default function IntroPage() {
  const router =
    useRouter();

  const introRef =
    useRef<HTMLElement | null>(
      null
    );

  const [
    introStage,
    setIntroStage,
  ] = useState<IntroStage>(
    "typing"
  );

  const [
    typedLines,
    setTypedLines,
  ] = useState<string[]>([""]);

  const [
    activeLineIndex,
    setActiveLineIndex,
  ] = useState(0);

  const [
    visiblePixelCount,
    setVisiblePixelCount,
  ] = useState(0);

  const [
    isTypingDone,
    setIsTypingDone,
  ] = useState(false);

  const [
    hasPointer,
    setHasPointer,
  ] = useState(false);

  const [
    hoveredLine,
    setHoveredLine,
  ] = useState<number | null>(
    null
  );

  const [
    isExiting,
    setIsExiting,
  ] = useState(false);

  /* =======================================================
     TYPING
  ======================================================= */

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let typedCount = 0;

    let timer:
      | number
      | undefined;

    let cancelled =
      false;

    const schedule = (
      callback: () => void,
      delay: number
    ) => {
      timer =
        window.setTimeout(
          () => {
            if (!cancelled) {
              callback();
            }
          },
          delay
        );
    };

    const isImportantCharacter =
      (
        line: string,
        index: number
      ) => {
        return importantKeywords.some(
          (keyword) => {
            const start =
              line.indexOf(
                keyword
              );

            if (
              start === -1
            ) {
              return false;
            }

            const end =
              start +
              keyword.length -
              1;

            return (
              index >=
                start &&
              index <= end
            );
          }
        );
      };

    const isKeywordEnd = (
      line: string,
      index: number
    ) => {
      return importantKeywords.some(
        (keyword) => {
          const start =
            line.indexOf(
              keyword
            );

          if (
            start === -1
          ) {
            return false;
          }

          return (
            index ===
            start +
              keyword.length -
              1
          );
        }
      );
    };

    const getTypingDelay = (
      character: string,
      currentLine: string,
      currentCharIndex: number
    ) => {
      let delay =
        18 +
        Math.random() * 7;

      if (
        character === " "
      ) {
        delay = 8;
      }

      if (
        character === ";" ||
        character === "," ||
        character === "(" ||
        character === ")" ||
        character === "[" ||
        character === "]"
      ) {
        delay = 11;
      }

      if (
        isImportantCharacter(
          currentLine,
          currentCharIndex
        )
      ) {
        delay *= 1.5;
      }

      if (
        isKeywordEnd(
          currentLine,
          currentCharIndex
        )
      ) {
        delay += 38;
      }

      return delay;
    };

    const getLinePause = (
      finishedLineIndex: number
    ) => {
      switch (
        finishedLineIndex
      ) {
        case 0:
          return 150;

        case 1:
          return 105;

        case 2:
        case 3:
          return 75;

        case 4:
          return 165;

        case 5:
          return 150;

        default:
          return 90;
      }
    };

    const typeNextCharacter =
      () => {
        const currentLine =
          codeLines[
            lineIndex
          ];

        /* =========================
           LINE COMPLETE
        ========================= */

        if (
          charIndex >=
          currentLine.length
        ) {
          /* =======================
             ALL COMPLETE
          ======================= */

          if (
            lineIndex >=
            codeLines.length -
              1
          ) {
            setVisiblePixelCount(
              pixelSequence.length
            );

            setIsTypingDone(
              true
            );

            /*
              DETAIL COMPLETE_
              깜빡이는 시간.
            */

            schedule(() => {
              setHasPointer(
                false
              );

              setHoveredLine(
                null
              );

              setIntroStage(
                "switching"
              );

              /*
                코드가 사라진 뒤
                카피 등장.
              */

              schedule(() => {
                setIntroStage(
                  "statement"
                );
              }, 420);
            }, 1200);

            return;
          }

          const finishedLine =
            lineIndex;

          lineIndex += 1;
          charIndex = 0;

          setActiveLineIndex(
            lineIndex
          );

          setTypedLines(
            (prev) => [
              ...prev,
              "",
            ]
          );

          schedule(
            typeNextCharacter,
            getLinePause(
              finishedLine
            )
          );

          return;
        }

        /* =========================
           CHARACTER
        ========================= */

        const nextCharacter =
          currentLine[
            charIndex
          ];

        setActiveLineIndex(
          lineIndex
        );

        setTypedLines(
          (prev) => {
            const next = [
              ...prev,
            ];

            next[lineIndex] =
              (next[
                lineIndex
              ] ?? "") +
              nextCharacter;

            return next;
          }
        );

        charIndex += 1;
        typedCount += 1;

        /* =========================
           PIXELS
        ========================= */

        const progress =
          typedCount /
          totalCharacters;

        const target =
          Math.floor(
            progress *
              pixelSequence.length
          );

        setVisiblePixelCount(
          Math.min(
            target,
            pixelSequence.length
          )
        );

        schedule(
          typeNextCharacter,
          getTypingDelay(
            nextCharacter,
            currentLine,
            charIndex - 1
          )
        );
      };

    schedule(
      typeNextCharacter,
      350
    );

    return () => {
      cancelled = true;

      if (timer) {
        window.clearTimeout(
          timer
        );
      }
    };
  }, []);

  /* =======================================================
     LENS POINTER
  ======================================================= */

  const handleCodePointerMove =
    (
      event: PointerEvent<HTMLDivElement>
    ) => {
      if (
        !introRef.current ||
        introStage !==
          "typing"
      ) {
        return;
      }

      const rect =
        introRef.current.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left;

      const y =
        event.clientY -
        rect.top;

      introRef.current.style.setProperty(
        "--mouse-x",
        `${x}px`
      );

      introRef.current.style.setProperty(
        "--mouse-y",
        `${y}px`
      );

      setHasPointer(
        true
      );
    };

  /* =======================================================
     ENTER
  ======================================================= */

  const enterPortfolio =
    () => {
      if (isExiting) {
        return;
      }

      setIsExiting(
        true
      );

      setHasPointer(
        false
      );

      /*
        글자 지지직 퇴장 후
        HOME으로 이동.
      */

      window.setTimeout(
        () => {
          router.push(
            "/home"
          );
        },
        720
      );
    };

  /* =======================================================
     DETAIL
  ======================================================= */

  const detailIndex =
    hoveredLine ??
    Math.min(
      activeLineIndex,
      detailCodes.length -
        1
    );

  const currentDetail =
    detailCodes[
      detailIndex
    ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      ref={introRef}
      className={[
        styles.intro,

        introStage ===
        "switching"
          ? styles.sceneSwitching
          : "",

        isExiting
          ? styles.introExit
          : "",
      ].join(" ")}
    >
      {/* GRID */}

      <div
        className={
          styles.grid
        }
      />

      {/* ===================================================
          PIXELS
      =================================================== */}

      <div
        className={[
          styles.pixelField,

          introStage ===
          "statement"
            ? styles.pixelFieldStatement
            : "",
        ].join(" ")}
      >
        {pixelSequence
          .slice(
            0,
            visiblePixelCount
          )
          .map(
            (
              bit,
              index
            ) => (
              <span
                key={index}
                className={
                  styles.pixelBit
                }
                style={
                  {
                    "--x": `${bit.x}%`,
                    "--y": `${bit.y}%`,
                    "--w": `${bit.w}px`,
                    "--h": `${bit.h}px`,
                  } as CSSProperties
                }
              />
            )
          )}
      </div>

      {/* ===================================================
          CODE SCENE
      =================================================== */}

      {introStage !==
        "statement" && (
        <section
          className={
            styles.codeStage
          }
        >
          <div
            className={
              styles.codeLabel
            }
          >
            <span
              className={
                styles.labelDot
              }
            />

            PROCESSING DETAIL_
          </div>

          <div
            className={
              styles.codeWindow
            }
            onPointerMove={
              handleCodePointerMove
            }
            onPointerEnter={() => {
              if (
                introStage ===
                "typing"
              ) {
                setHasPointer(
                  true
                );
              }
            }}
            onPointerLeave={() => {
              setHasPointer(
                false
              );

              setHoveredLine(
                null
              );
            }}
          >
            {typedLines.map(
              (
                line,
                index
              ) => {
                const isActive =
                  index ===
                    activeLineIndex &&
                  !isTypingDone &&
                  line.length >
                    0;

                const stableText =
                  isActive
                    ? line.slice(
                        0,
                        -1
                      )
                    : line;

                const lastCharacter =
                  isActive
                    ? line.slice(
                        -1
                      )
                    : "";

                return (
                  <div
                    key={
                      index
                    }
                    className={[
                      styles.codeLine,

                      hoveredLine ===
                      index
                        ? styles.codeLineHovered
                        : "",
                    ].join(
                      " "
                    )}
                    onPointerEnter={() =>
                      setHoveredLine(
                        index
                      )
                    }
                  >
                    <span
                      className={
                        styles.lineNumber
                      }
                    >
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span
                      className={
                        styles.codeText
                      }
                    >
                      {
                        stableText
                      }

                      {isActive && (
                        <span
                          className={
                            styles.typingChar
                          }
                          data-char={
                            lastCharacter
                          }
                        >
                          {
                            lastCharacter
                          }
                        </span>
                      )}
                    </span>
                  </div>
                );
              }
            )}

            {!isTypingDone && (
              <span
                className={
                  styles.codeCursor
                }
              >
                _
              </span>
            )}

            {isTypingDone && (
              <div
                className={
                  styles.completeCode
                }
              >
                DETAIL COMPLETE_
              </div>
            )}
          </div>

          {introStage ===
            "typing" && (
            <p
              className={
                styles.lensHint
              }
            >
              HOVER CODE TO
              SEE THE DETAIL_
            </p>
          )}
        </section>
      )}

      {/* ===================================================
          DETAIL LENS

          설명 없음.
          오직 구체화된 코드만 보여줌.
      =================================================== */}

      {introStage ===
        "typing" && (
        <div
          className={[
            styles.detailLens,

            hasPointer
              ? styles.detailLensVisible
              : "",
          ].join(" ")}
        >
          {/* GLASS REFLECTION */}

          <span
            className={
              styles.lensReflection
            }
          />

          {/* LENS CODE */}

          <div
            key={
              detailIndex
            }
            className={
              styles.lensContent
            }
          >
            <div
              className={
                styles.lensHeader
              }
            >
              <span>
                DETAIL /
                {
                  currentDetail.number
                }
              </span>

              <b>
                {
                  currentDetail.title
                }
              </b>
            </div>

            <span
              className={
                styles.lensDivider
              }
            />

            <div
              className={
                styles.lensCode
              }
            >
              {currentDetail.lines.map(
                (
                  line,
                  index
                ) => (
                  <code
                    key={`${detailIndex}-${index}`}
                    className={
                      index === 0
                        ? styles.lensCodePrimary
                        : ""
                    }
                  >
                    {line}
                  </code>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          STATEMENT
      =================================================== */}

      {introStage ===
        "statement" && (
        <section
          className={
            styles.statement
          }
        >
          

          <div
            className={
              styles.statementTitleWrap
            }
          >
            <h1
              className={
                styles.statementTitle
              }
              data-text={
                "AI가 닿지 않는 디테일까지\n코드로 완성합니다"
              }
            >
              AI가 닿지 않는 디테일까지
              <br />

              코드로 완성합니다.
            </h1>
          </div>

          <p
            className={
              styles.statementDescription
            }
          >
            Full-Stack Developer ㆍ 김지우
          </p>

          <button
            type="button"
            className={
              styles.enterButton
            }
            onClick={
              enterPortfolio
            }
          >
            <span>
              ENTER PORTFOLIO
            </span>

            <b>
              →
            </b>
          </button>
        </section>
      )}
    </main>
  );
}