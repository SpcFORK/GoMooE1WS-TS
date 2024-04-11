var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/bp-gm1/bp.js
var require_bp = __commonJS({
  "src/bp-gm1/bp.js"(exports, module) {
    "use strict";
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var require_cowrle = __commonJS2({
      "src/encode/bullpress/cowrle.js"(exports2, module2) {
        function* encodeCOWRLEGenerator(input) {
          let encoded = "", i = 0, lastCount = i, count = 1, inBrackets = false, processChar = (char, nextChar) => {
            if (char === nextChar) {
              count++;
            } else {
              handleUniqueChar(char);
            }
          }, handleUniqueChar = (char) => {
            if (count > 1) {
              handleRepeatedChar(char);
            } else {
              handleSingleChar(char);
            }
            finalizeEncoding();
          }, handleRepeatedChar = (char) => {
            if (!inBrackets) {
              encoded += "[";
              inBrackets = true;
            }
            if (lastCount != count) {
              encoded += count;
              lastCount = count;
            }
            encoded += char;
          }, handleSingleChar = (char) => {
            if (inBrackets) {
              encoded += "]";
              inBrackets = false;
            }
            encoded += char;
          }, finalizeEncoding = () => {
            if (i == input.length - 1 && inBrackets) {
              encoded += "]";
            }
            count = 1;
          };
          {
            try {
              for (; i < input.length; i++) {
                processChar(input[i], input[i + 1]);
                yield encoded;
                encoded = "";
              }
            } catch (e) {
              console.error("Failed to encode COWRLE:", e);
            } finally {
              encoded = null;
            }
          }
        }
        function* decodeCOWRLEGenerator(input) {
          let decoded = "", count = "", inBrackets = false, lastCount = 1, i2 = 0, processCharacter = (character) => {
            if (character === "[") {
              inBrackets = true;
              return;
            }
            if (character === "]") {
              inBrackets = false;
              return;
            }
            if (character !== " " && !isNaN(character)) {
              updateCount(character);
            } else {
              handleCharacter(character);
            }
          }, updateCount = (character) => {
            count += character;
            lastCount = parseInt(count);
          }, handleCharacter = (character) => {
            if (parseInt(count) !== 0 && parseInt(count) !== lastCount) {
              decoded += character.repeat(lastCount);
            } else if (parseInt(count) == lastCount) {
              decoded += character.repeat(parseInt(count));
              count = "0";
            } else {
              if (inBrackets)
                decoded += character.repeat(parseInt(count) || lastCount);
              else
                decoded += character;
            }
          };
          try {
            for (; i2 < input.length; i2++) {
              processCharacter(input[i2]);
              yield decoded;
              decoded = "";
            }
          } catch (e) {
            console.error("Failed to decode COWRLE:", e);
          } finally {
            decoded = null;
          }
        }
        function encodeCOWRLE(input) {
          return [...encodeCOWRLEGenerator(input)].join("");
        }
        function decodeCOWRLE(input) {
          return [...decodeCOWRLEGenerator(input)].join("");
        }
        var eobj2 = {
          encodeCOWRLE,
          decodeCOWRLE
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.cowrle = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_BWT = __commonJS2({
      "src/encode/bullpress/BWT.js"(exports2, module2) {
        function burrowsWheelerTransform(input) {
          const rotations = [];
          for (let i2 = 0; i2 < input.length; i2++) {
            const rotation = input.slice(i2) + input.slice(0, i2);
            rotations.push(rotation);
          }
          rotations.sort();
          let transformedString = "";
          for (let i2 = 0; i2 < rotations.length; i2++) {
            transformedString += rotations[i2][input.length - 1];
          }
          let originalIndex;
          for (let i2 = 0; i2 < rotations.length; i2++) {
            if (rotations[i2] === input) {
              originalIndex = i2;
              break;
            }
          }
          return { transformedString, originalIndex };
        }
        function inverseBurrowsWheelerTransform(transformedString, originalIndex) {
          const table = [];
          for (let i2 = 0; i2 < transformedString.length; i2++) {
            table.push({ char: transformedString[i2], index: i2 });
          }
          table.sort((a, b) => {
            if (a.char < b.char)
              return -1;
            if (a.char > b.char)
              return 1;
            return 0;
          });
          let originalString = "";
          let currentIndex = originalIndex;
          for (let i2 = 0; i2 < transformedString.length; i2++) {
            originalString += table[currentIndex].char;
            currentIndex = table[currentIndex].index;
          }
          return originalString;
        }
        var eobj2 = {
          burrowsWheelerTransform,
          inverseBurrowsWheelerTransform
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.bwt = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_huffman = __commonJS2({
      "src/encode/bullpress/huffman.js"(exports2, module2) {
        var HuffmanNode = class {
          constructor(char, freq) {
            this.char = char;
            this.freq = freq;
            this.left = null;
            this.right = null;
          }
        };
        function buildFrequencyMap(str) {
          const freqMap = {};
          for (let i2 = 0; i2 < str.length; i2++) {
            if (freqMap.hasOwnProperty(str[i2])) {
              freqMap[str[i2]]++;
            } else {
              freqMap[str[i2]] = 1;
            }
          }
          return freqMap;
        }
        function buildHuffmanTree(freqMap) {
          const nodes = [];
          for (let char in freqMap) {
            nodes.push(new HuffmanNode(char, freqMap[char]));
          }
          while (nodes.length > 1) {
            nodes.sort((a, b) => a.freq - b.freq);
            const left = nodes.shift();
            const right = nodes.shift();
            const newNode = new HuffmanNode(null, left.freq + right.freq);
            newNode.left = left;
            newNode.right = right;
            nodes.push(newNode);
          }
          return nodes[0];
        }
        function buildCodeMap(node, code = "", codeMap = {}) {
          if (node.char !== null) {
            codeMap[node.char] = code;
          } else {
            buildCodeMap(node.left, code + "0", codeMap);
            buildCodeMap(node.right, code + "1", codeMap);
          }
          return codeMap;
        }
        function encode22(str, codeMap) {
          let encoded = "";
          for (let i2 = 0; i2 < str.length; i2++) {
            encoded += codeMap[str[i2]];
          }
          return encoded;
        }
        function compress(str) {
          const freqMap = buildFrequencyMap(str);
          const huffmanTree = buildHuffmanTree(freqMap);
          const codeMap = buildCodeMap(huffmanTree);
          const encoded = encode22(str, codeMap);
          return { encoded, codeMap };
        }
        function decompress(encoded, codeMap) {
          let decoded = "";
          let currentCode = "";
          for (let i2 = 0; i2 < encoded.length; i2++) {
            currentCode += encoded[i2];
            for (let char in codeMap) {
              if (codeMap[char] === currentCode) {
                decoded += char;
                currentCode = "";
                break;
              }
            }
          }
          return decoded;
        }
        var eobj2 = {
          buildFrequencyMap,
          buildHuffmanTree,
          buildCodeMap,
          encode: encode22,
          compress,
          decompress
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.huffman = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_cst = __commonJS2({
      "src/encode/bullpress/blocks/cst.js"(exports2, module2) {
        var CHUNK_LENGTH2 = 1024 * 8;
        var CHUCK_LENGTH_SPEED = 270;
        var CHAR_EXCHANGE_COST = CHUCK_LENGTH_SPEED / CHUNK_LENGTH2;
        function calculateCost2(string) {
          return string.length * CHAR_EXCHANGE_COST;
        }
        function calculateChunks2(string) {
          return Math.ceil(string.length / CHUNK_LENGTH2);
        }
        var eobj2 = {
          CHUNK_LENGTH: CHUNK_LENGTH2,
          CHUCK_LENGTH_SPEED,
          CHAR_EXCHANGE_COST,
          calculateCost: calculateCost2,
          calculateChunks: calculateChunks2
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.cst = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_casing = __commonJS2({
      "src/encode/bullpress/blocks/casing.js"(exports2, module2) {
        var eobj2 = {
          // Format: <BWT:{ transformedString }|{ originalIndex }:>
          caseChunk({ transformedString, originalIndex }) {
            return `<Bull_Chunk:${transformedString}|${originalIndex}:>`;
          },
          caseBull({ chunk }) {
            return `<Bull:${chunk}:>`;
          }
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.casing = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_avoidE = __commonJS2({
      "src/encode/bullpress/blocks/avoidE.js"(exports2, module2) {
        var eobj2 = {
          encode(input) {
            const caser = (_) => `(${_})`;
            return input.replace(
              /\d+/g,
              (match) => caser(
                match.split("").map(
                  (digit) => String.fromCharCode("A".charCodeAt(0) + parseInt(digit))
                ).join("")
              )
            );
          },
          decode(input) {
            return input.replace(
              /\((.*?)\)/g,
              (match, p1) => p1.split("").map((char) => char.charCodeAt(0) - "A".charCodeAt(0)).join("")
            );
          }
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.AvoidEnc = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_bracketE = __commonJS2({
      "src/encode/bullpress/blocks/bracketE.js"(exports2, module2) {
        var eobj2 = {
          encode(input) {
            return input.replace(/\]\(/g, "\u03E2").replace(/\)\[/g, "\u03E3").replace(/\]\{/g, "\u03E0").replace(/\}\[/g, "\u03E1").replace(/\)\{/g, "\u03DE").replace(/\}\(/g, "\u03DF").replace(/\(\[/g, "{").replace(/\]\)/g, "}").replace(/\[\(/g, "<").replace(/\)\]/g, ">");
          },
          decode(input) {
            return input.replace(/Ϣ/g, "](").replace(/ϣ/g, ")[").replace(/Ϡ/g, "]{").replace(/ϡ/g, "}[").replace(/Ϟ/g, "){").replace(/ϟ/g, "}(").replace(/\{/g, "([").replace(/\}/g, "])").replace(/\</g, "[(").replace(/\>/g, ")]");
          }
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.BracketEncoder = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var require_base64 = __commonJS2({
      "src/encode/bullpress/blocks/base64.js"(exports2, module2) {
        var base6422 = {
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          encode(input = "") {
            let chars = this.chars, output = "", i2 = 0;
            while (i2 < input.length) {
              let a = input.charCodeAt(i2++), b = input.charCodeAt(i2++), c = input.charCodeAt(i2++), index1 = a >> 2, index2 = (a & 3) << 4 | b >> 4, index3 = isNaN(b) ? 64 : (b & 15) << 2 | c >> 6, index4 = isNaN(c) ? 64 : c & 63;
              output += [index1, index2, index3, index4].map((index) => chars[index]).join("");
            }
            output = output.replace(/=+$/, "");
            return output;
          },
          decode(input = "") {
            let chars = this.chars, output = "", i2 = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i2 < input.length) {
              let index1 = chars.indexOf(input.charAt(i2++)), index2 = chars.indexOf(input.charAt(i2++)), index3 = chars.indexOf(input.charAt(i2++)), index4 = chars.indexOf(input.charAt(i2++)), a = index1 << 2 | index2 >> 4, b = (index2 & 15) << 4 | index3 >> 2, c = (index3 & 3) << 6 | index4;
              output += String.fromCharCode(a);
              if (index3 !== 64)
                output += String.fromCharCode(b);
              if (index4 !== 64)
                output += String.fromCharCode(c);
            }
            output = output.replace(/[\x00\uffff]+$/g, "");
            return output;
          }
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.base64 = base6422;
        if (typeof globalThis.Buffer !== "undefined")
          module2.exports = {
            encode(input) {
              return globalThis.Buffer.from(input).toString("base64");
            },
            decode(input) {
              return globalThis.Buffer.from(input, "base64").toString("ascii");
            }
          };
        else if (typeof module2 !== "undefined")
          module2.exports = base6422;
      }
    });
    var require_bullpress = __commonJS2({
      "src/encode/bullpress/bullpress.js"(exports2, module2) {
        var Cowrle2 = require_cowrle();
        var BWT2 = require_BWT();
        var Huffman2 = require_huffman();
        var {
          CHUNK_LENGTH: CHUNK_LENGTH2,
          CHUCK_LENGTH_SPEED,
          CHAR_EXCHANGE_COST,
          calculateCost: calculateCost2,
          calculateChunks: calculateChunks2
        } = require_cst();
        var casing = require_casing();
        var AvoidEnc = require_avoidE();
        var BracketEncoder = require_bracketE();
        var base6422 = require_base64();
        function encodeBullpress2(input, chunkSize = CHUNK_LENGTH2) {
          let encodedResult = "";
          for (let i2 = 0; i2 < input.length; i2 += chunkSize) {
            let chunk = input.substring(i2, Math.min(i2 + chunkSize, input.length)), basedKey = base6422.encode(chunk), res1 = BWT2.burrowsWheelerTransform(basedKey), numbedKey = AvoidEnc.encode(res1.transformedString), cowrString = Cowrle2.encodeCOWRLE(numbedKey), transformedString = BracketEncoder.encode(cowrString);
            encodedResult += casing.caseChunk({
              transformedString,
              originalIndex: res1.originalIndex
            });
          }
          return casing.caseBull({
            chunk: encodedResult
          });
        }
        function decodeBullpress2(input) {
          let output = "", deCasedBull = /<Bull:(.*):>/g.exec(input)[1], decodedResult = deCasedBull.match(/<Bull_Chunk:(.*?)\|(\d+):>/g);
          if (!decodedResult)
            return;
          for (let i2 = 0; i2 < decodedResult.length; i2++) {
            const chunk = decodedResult[i2], [, transformedString, originalIndex] = chunk.match(
              /<Bull_Chunk:(.*)\|(\d+):>/
            ), cowrString = BracketEncoder.decode(transformedString), numbedKey = Cowrle2.decodeCOWRLE(cowrString), res1 = AvoidEnc.decode(numbedKey), basedKey = BWT2.inverseBurrowsWheelerTransform(res1, originalIndex);
            output += base6422.decode(basedKey);
          }
          return output;
        }
        var eobj2 = {
          encodeBullpress: encodeBullpress2,
          decodeBullpress: decodeBullpress2,
          calculateCost: calculateCost2,
          calculateChunks: calculateChunks2,
          CHUNK_LENGTH: CHUNK_LENGTH2,
          CHUCK_LENGTH_SPEED,
          CHAR_EXCHANGE_COST,
          casing,
          AvoidEnc,
          base64: base6422,
          Cowrle: Cowrle2,
          BWT: BWT2,
          // Unused
          Huffman: Huffman2
        };
        if (typeof globalThis.window !== "undefined")
          globalThis.window.bullpress = eobj2;
        if (typeof module2 !== "undefined")
          module2.exports = eobj2;
      }
    });
    var {
      encodeBullpress,
      decodeBullpress,
      CHUNK_LENGTH,
      base64: base642,
      Cowrle,
      BWT,
      // Unused
      Huffman,
      calculateCost,
      calculateChunks
    } = require_bullpress();
    function encode2(input, logging = false) {
      const start = Date.now(), uriString = encodeURI(input);
      function logIfEnabled(...messages) {
        if (logging)
          console.log(...messages);
      }
      {
        logIfEnabled("Encode COST:    ", calculateCost(uriString));
      }
      if (input.length < 1e3) {
        logIfEnabled("Original String:   ", input);
        logIfEnabled(".");
        logIfEnabled("Original String (With URI ENCODE):   ", uriString);
        logIfEnabled("..");
        logIfEnabled();
      }
      const encodedString = encodeBullpress(uriString), isOptimized = encodedString.length < uriString.length, chunkCount = calculateChunks(uriString);
      {
        logIfEnabled(
          "Encoded String:   ",
          encodedString < 1e3 ? encodedString : encodedString.slice(0, 1e3) + "...",
          "\n"
        );
        logIfEnabled(
          "Optimization Status:   ",
          isOptimized ? "Optimized" : "Not Optimized",
          "\n"
        );
        logIfEnabled(
          "Encoded Length:   ",
          encodedString.length,
          "bytes (",
          (encodedString.length / 1024 / 1024).toFixed(2),
          "MB )"
        );
        logIfEnabled("Chunk Count:   ", chunkCount);
      }
      const end = Date.now(), timeSpent = end - start;
      {
        logIfEnabled("Processing Time:   ", timeSpent, "ms\n");
      }
      return {
        uriString,
        encodedString,
        isOptimized,
        endTime: end,
        startTime: start,
        timeSpent,
        chunkCount,
        presumedTime: calculateCost(uriString).toFixed(2)
      };
    }
    function encodeP(input, logging = false) {
      return new Promise((resolve, reject) => resolve(encode2(input, logging)));
    }
    function decode(input, logging = false) {
      function logIfEnabled(...messages) {
        if (logging)
          console.log(...messages);
      }
      const start = Date.now(), decodedString = decodeBullpress(input), chunkCount = calculateChunks(decodedString);
      {
        logIfEnabled(
          "Decoded String:   ",
          decodedString < 1e3 ? decodedString : decodedString.slice(0, 1e3) + "...",
          "\n"
        );
        logIfEnabled(
          "Decoded Length:   ",
          decodedString.length,
          "bytes (",
          (decodedString.length / 1024 / 1024).toFixed(2),
          "MB )"
        );
        logIfEnabled("Chunk Count:   ", chunkCount);
      }
      const end = Date.now(), timeSpent = end - start;
      {
        logIfEnabled("Processing Time:   ", timeSpent, "ms\n");
      }
      return {
        decodedString: decodeURI(decodedString),
        endTime: end,
        startTime: start,
        timeSpent,
        chunkCount
      };
    }
    function decodeP(input, logging = false) {
      return new Promise((resolve, reject) => resolve(decode(input, logging)));
    }
    function processEncoding(input, logging = false) {
      function logIfEnabled(...messages) {
        if (logging)
          console.log(...messages);
      }
      logIfEnabled(".-- Encoding... --.\n");
      const encodeResult = encode2(input, logging), {
        uriString,
        isOptimized,
        encodedString,
        endTime: encodeEndTime,
        startTime: encodeStartTime,
        timeSpent: encodeTimeSpent,
        chunkCount: encodeChunkCount,
        presumedTime
      } = encodeResult;
      logIfEnabled("'---- Encoded ----'\n");
      logIfEnabled(".-- Decoding... --.\n");
      const decodeResult = decode(encodedString, logging), {
        decodedString,
        endTime: decodeEndTime,
        startTime: decodeStartTime,
        timeSpent: decodeTimeSpent,
        chunkCount: decodeChunkCount
      } = decodeResult;
      logIfEnabled("'---- Decoded ----'\n");
      logIfEnabled(".-- Doing Math... --.\n");
      const timeDifference = decodeEndTime - encodeStartTime - presumedTime, ELEN = encodedString.length, OLEN = uriString.length, SLEN = decodedString.length, SDIFF = ELEN - OLEN, PDIFF = (SLEN - ELEN) / ELEN * 100, sizeDifference = SLEN - ELEN, sizeDifferencePerc = ((ELEN - OLEN) / OLEN * 100).toFixed(2), RESULT = uriString === decodedString;
      logIfEnabled("'-------------------'\n");
      logIfEnabled(".-- Doing Logs... --.\n");
      {
        logIfEnabled(
          "Original Length:   ",
          uriString.length,
          "bytes (",
          (uriString.length / 1024 / 1024).toFixed(2),
          "MB )"
        );
        logIfEnabled();
        logIfEnabled("Chunk Length:   ", CHUNK_LENGTH, "bytes");
        logIfEnabled(
          "Number of Chunks (Encoding):   ",
          encodeChunkCount
          // Displaying chunk count for encoding
        );
        logIfEnabled(
          "Number of Chunks (Decoding):   ",
          decodeChunkCount
          // Displaying chunk count for decoding
        );
        logIfEnabled();
        logIfEnabled("Encoding time:   ", encodeTimeSpent, "ms");
        logIfEnabled("Decoding time:   ", decodeEndTime - decodeStartTime, "ms");
        logIfEnabled("Presumed time:   ", presumedTime, "ms");
        logIfEnabled();
        logIfEnabled("Sizing difference:   ", sizeDifference, "bytes");
        logIfEnabled("Size difference %:   ", sizeDifferencePerc, "%");
        logIfEnabled();
        logIfEnabled(
          "Encoding Optimization:   ",
          isOptimized ? "Optimized" : "Not Optimized"
        );
        logIfEnabled();
        logIfEnabled("PDIFF:   ", PDIFF, "%");
        logIfEnabled();
        logIfEnabled(
          "Total Processing Time:   ",
          encodeEndTime - encodeStartTime + decodeEndTime - decodeStartTime,
          "ms"
        );
        logIfEnabled();
        logIfEnabled("Presumption Accuracy:   ", timeDifference.toFixed(2), "ms");
        logIfEnabled();
        logIfEnabled("Result:   ", RESULT ? "Success" : "Failure");
        logIfEnabled();
      }
      logIfEnabled("'-- Done logging! --'\n");
      return {
        decodedString: () => decodedString,
        decodeEndTime,
        decodeStartTime,
        decodeTimeSpent,
        encodedString: () => encodedString,
        encodeEndTime,
        encodeStartTime,
        encodeTimeSpent,
        isOptimized,
        presumedTime,
        result: RESULT,
        sizeDifference,
        sizeDifferencePerc,
        timeDifference,
        uriString: () => uriString
      };
    }
    var eobj = {
      encode: encode2,
      encodeP,
      decode,
      decodeP,
      Test: processEncoding,
      // @ Other exports
      CHUNK_LENGTH,
      calculateCost,
      calculateChunks,
      base64: base642,
      Cowrle,
      BWT,
      // Unused
      Huffman
    };
    if (typeof globalThis.window !== "undefined")
      globalThis.window.GoMooE1 = eobj;
    if (typeof module !== "undefined")
      module.exports = eobj;
  }
});

// src/bpws.ts
var bp = __toESM(require_bp());
import * as fs from "fs";
import * as path from "path";
import { JSDOM } from "jsdom";
function chaosWindow() {
  return globalThis.window;
}
var BP_SRC = () => fs.readFileSync(path.join(__dirname, "./bp-gm1/w/index.js"), "utf8");
var BP_HOOKIN = (_) => `${BP_SRC()}

// ---
;/BP_HOOKIN/;
${_ + ""}`;
var functionToIIFE = (code, _ = "") => `(${code})(${_});`;
var codeToIIFE = (code = "{}", _ = "") => functionToIIFE("_ => " + code, _);
var moduleToIIFE = (m, _) => {
  if (m?.then) {
    return m.then((nm) => moduleToIIFE(nm, _));
  } else if (typeof m === "function") {
    return functionToIIFE(m, _);
  } else if (typeof m === "object" && typeof m?.default === "function") {
    return functionToIIFE(m.default, _);
  } else if (typeof m?.WebEntry === "function") {
    return functionToIIFE(m.WebEntry, _);
  } else
    throw new Error("Unknown module type");
};
function makeCommentBlock(header, body, hasFooter = false) {
  const bodyHTML = body.split("\n").map((line) => `  ${line}`).join("\n");
  const makeCommentTagline = (name, h) => `<!-- ${hasFooter ? `${name} OF ` : ""}${h} -->`;
  const commentHead = makeCommentTagline("START", header);
  const commentFoot = hasFooter ? makeCommentTagline("END", header) : "";
  return `${commentHead}
${bodyHTML}
${commentFoot}`;
}
function BP_appendComment(container, text) {
  return container.appendChild(document.createComment(text));
}
function w_headProcessCleanup(name) {
  const scriptTag = document.querySelector("script[id=BPWS-SRC]");
  if (scriptTag)
    scriptTag.replaceWith(document.createComment(" BPWS_SOURCECODE_HIDDEN "));
  function deleteUneededTags(container) {
    container.innerHTML = container.innerHTML.replace(
      /(START OF (BP([^-]+){2})([^]+)END OF \2)/g,
      "BPWS_DEPACKED "
    );
  }
  [document.body, document.head].forEach(deleteUneededTags);
}
function w_JSHTMLUnpack(encodedHTML) {
  const dobj = window.GoMooE1.decode(encodedHTML), str = dobj.decodedString;
  chaosWindow().GM1Client = {
    ...chaosWindow().GM1Client || {},
    decodedObject: dobj,
    decodedString: str
  };
  addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = str;
  });
}
function w_makeResults(results) {
  chaosWindow().GM1Client = {
    serverToPeer: results
  };
}
function w_runScriptTagInvoker() {
  const scriptTags = document.querySelectorAll("script");
  const cBlockName = "BPWS_INVOKER_LOAD";
  BP_appendComment(document.head, `START OF ${cBlockName}`);
  scriptTags.forEach((scriptTag) => {
    if (scriptTag.dataset.bpwsinvoker === "0") {
      const { innerHTML } = scriptTag;
      scriptTag.remove();
      const script = document.createElement("script");
      script.innerHTML = innerHTML;
      script.dataset.bpwsinvoker = "1";
      BP_appendComment(document.head, "BPWS_INVOKER_ITEM");
      document.head.appendChild(script);
    }
  });
  BP_appendComment(document.head, `END OF ${cBlockName}`);
}
function makeDocument(head = "", body = "") {
  return new JSDOM(
    `<!DOCTYPE html><html>
<head>
${head}
</head>
<body>
${body}
</body>
</html>`
  );
}
function packWModule(mod) {
  const modStr = typeof mod === "string" ? mod : functionToIIFE("s");
  return `<script>${modStr}</script>`;
}
function packWModules(...mods) {
  return mods.map(packWModule).join("\n");
}
function packScriptTagInvoker(...scripts) {
  const scriptTags = packWModules(...scripts);
  const encodedScripts = bp.base64.encode(scriptTags);
  function unpackSI(scripts2) {
    const encodedScripts2 = window.GoMooE1.base64.decode(scripts2);
    const doc = new DOMParser().parseFromString(encodedScripts2, "text/html");
    const vHead = doc.querySelector("head");
    const cBlockName = "BP_SCRIPT_TAG_INVOKER";
    BP_appendComment(document.head, `START OF ${cBlockName}`);
    if (vHead)
      for (const child of Array.from(vHead.children)) {
        const script = document.createElement("script");
        script.innerHTML = child.innerHTML;
        document.head.appendChild(script);
      }
    BP_appendComment(document.head, `END OF ${cBlockName}`);
  }
  return makeCommentBlock(
    "BPWS_SCRIPT_TAG_INVOKER_PRE",
    [
      `<script data-bpwsinvoker="0">`,
      functionToIIFE(unpackSI.toString(), `"${encodedScripts}"`),
      `</script>`
    ].join("\n"),
    true
  );
}
function sendBP_HTML(res, head, html, ...functionScripts) {
  const allScripts = packScriptTagInvoker(...functionScripts), compHTML = bp.encode(allScripts + "\n\n" + html), unpacker = functionToIIFE(w_JSHTMLUnpack.toString(), `'${compHTML.encodedString}'`);
  const safeCompResult = Object.assign({}, compHTML);
  const safeCompResultPartial = safeCompResult;
  delete safeCompResultPartial.uriString;
  const deps = [BP_appendComment, chaosWindow];
  const dependandFunctions = makeCommentBlock(
    "BPWS_DEPENDANT_FUNCTIONS",
    [`<script>`, ...deps, `</script>`].join("\n"),
    true
  );
  const htmlUnpacker = makeCommentBlock(
    "BPWS_HTML_UNPACKER",
    [
      `<script>${functionToIIFE(w_makeResults.toString(), JSON.stringify(safeCompResult))}</script>`,
      `<script>${BP_HOOKIN(unpacker)}</script>`
    ].join("\n")
  );
  const scriptLoader = makeCommentBlock(
    "BPWS_SCRIPT_LOADER",
    [
      `<script>`,
      w_runScriptTagInvoker,
      w_headProcessCleanup,
      `addEventListener('DOMContentLoaded', w_runScriptTagInvoker)`,
      `addEventListener('DOMContentLoaded', w_headProcessCleanup)`,
      `</script>`
    ].join("\n")
  );
  const builtSMpl = [dependandFunctions, htmlUnpacker, scriptLoader].join("\n");
  const scriptRoot = makeCommentBlock("BP_UNPACKER_ARCHIVE", builtSMpl, true);
  const dom = makeDocument(head, scriptRoot);
  return [res.send(dom.serialize()), compHTML, (dom.window.close(), true)];
}
export {
  BP_HOOKIN,
  BP_SRC,
  bp,
  codeToIIFE,
  functionToIIFE,
  makeCommentBlock,
  makeDocument,
  moduleToIIFE,
  packScriptTagInvoker,
  packWModule,
  packWModules,
  sendBP_HTML,
  w_JSHTMLUnpack
};
