/* eslint-disable */
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from 'prism-react-renderer/prism';
import rangeParser from "parse-numeric-range";
import classnames from "classnames";

import CopyButton from "./CopyButton";
import { DocumentIcon, ClipboardCopyIcon } from '@heroicons/react/solid'

// Extend base classes
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-java");

const diffBgColorMap = {
  "+": "var(--prism-highlight-added-background)",
  "-": "var(--prism-highlight-removed-background)",
  "|": "var(--prism-highlight-background)",
};

const symColorMap = {
  "+": "var(--prism-highlight-added-text)",
  "-": "var(--prism-highlight-removed-text)",
  "|": "var(--prism-highlight-text)",
};

const symbols = {
  normal: "|",
  add: "+",
  delete: "-",
};

function cleanTokens(tokens) {
  const tokensLength = tokens.length;
  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];

  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

const propList = ["copy", "terminal", "no-lines"];

export default function Code({ children, className, ...props }) {
  let language = className && className.replace(/language-/, "");
  let breakWords = false;
  let diffArray = [];
  if (props?.metastring?.includes("highlight")) {
    const parts = props.highlight.split("|");
    parts.forEach((part) => {
      diffArray = [part.split(";"), ...diffArray];
    });
  }

  if (propList.includes(language)) {
    breakWords = true;
  }

  const code = children;
  const hasCopy = props.copy || language === "copy";
  const isTerminal = props.terminal || language === "terminal";
  const fileName = props.file || language === "file";
  const hasLines = fileName || props.lines;

  const tokenCopyClass = `${hasCopy ? "has-copy-button" : ""} ${
    breakWords ? "break-words" : ""
  }`;

  return (
    <div className="code-block">

      <div className="code-block_highlight">
        <Highlight {...defaultProps} code={code} language={language}>
          {({
            className: blockClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre
              className={classnames(blockClassName, {
                "is-terminal": isTerminal,
              })}
              style={style}
            >

              <code>
                {cleanTokens(tokens).map((line, i) => {
                  let lineClass = {
                    backgroundColor: "",
                    symbColor: "",
                  };

                  let isDiff = false;
                  let diffSymbol = "";

                  if (
                    (line[0] &&
                      line[0].content.length &&
                      (line[0].content[0] === "+" ||
                        line[0].content[0] === "-" ||
                        line[0].content[0] === "|")) ||
                    (line[0] &&
                      line[0].content === "" &&
                      line[1] &&
                      (line[1].content === "+" ||
                        line[1].content === "-" ||
                        line[1].content === "|"))
                  ) {
                    diffSymbol =
                      line[0] && line[0].content.length
                        ? line[0].content[0]
                        : line[1].content;
                    lineClass = {
                      backgroundColor: diffBgColorMap[diffSymbol],
                      symbColor: symColorMap[diffSymbol],
                    };
                    isDiff = true;
                  }

                  if (diffArray.length !== 0) {
                    diffArray.forEach((arr) => {
                      if (rangeParser(arr[0]).includes(i + 1)) {
                        diffSymbol = symbols[arr[1]];
                        lineClass = {
                          backgroundColor: diffBgColorMap[diffSymbol],
                          symbColor: symColorMap[diffSymbol],
                        };
                        isDiff = true;
                      }
                    });
                  }

                  const lineProps = getLineProps({ line, key: i });

                  lineProps.style = { ...lineClass };

                  return (
                    <div className="line" key={line + i} {...lineProps}>
                      {isTerminal && !isDiff && (
                        <span className="line_number">$</span>
                      )}
                      {!isTerminal && !isDiff && hasLines && (
                        <span className="line_number">{i + 1}</span>
                      )}
                      {isDiff && hasLines && (
                        <span
                          className="line_number"
                          style={{ color: lineClass.symbColor }}
                        >
                          {["+", "-"].includes(diffSymbol) ? diffSymbol : i + 1}
                        </span>
                      )}
                      <span
                        className={classnames("line_content", tokenCopyClass)}
                      >
                        {line.map((token, key) => {
                          if (isDiff) {
                            if (
                              (key === 0 || key === 1) &&
                              (token.content.charAt(0) === "+" ||
                                token.content.charAt(0) === "-" ||
                                token.content.charAt(0) === "|")
                            ) {
                              return (
                                <span
                                  {...getTokenProps({
                                    token: {
                                      ...token,
                                      content: token.content.slice(1),
                                    },
                                    key,
                                  })}
                                />
                              );
                            }
                          }
                          return <span {...getTokenProps({ token, key })} />;
                        })}
                      </span>
                    </div>
                  );
                })}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
