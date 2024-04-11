// src/bp-gm1/w/index.js
(() => {
  var u = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
  var $ = u((Qe, S) => {
    function* Se(n) {
      let t = "", e = i = 0, r = 1, o = false, l = (f, g) => {
        f === g ? r++ : d(f);
      }, d = (f) => {
        r > 1 ? s(f) : a(f), c();
      }, s = (f) => {
        o || (t += "[", o = true), e != r && (t += r, e = r), t += f;
      }, a = (f) => {
        o && (t += "]", o = false), t += f;
      }, c = () => {
        i == n.length - 1 && o && (t += "]"), r = 1;
      };
      try {
        for (; i < n.length; i++)
          l(n[i], n[i + 1]), yield t, t = "";
      } catch (f) {
        console.error("Failed to encode COWRLE:", f);
      } finally {
        t = null;
      }
    }
    function* ye(n) {
      let t = "", e = "", r = false, o = 1, l = 0, d = (c) => {
        if (c === "[") {
          r = true;
          return;
        }
        if (c === "]") {
          r = false;
          return;
        }
        c !== " " && !isNaN(c) ? s(c) : a(c);
      }, s = (c) => {
        e += c, o = parseInt(e);
      }, a = (c) => {
        parseInt(e) !== 0 && parseInt(e) !== o ? t += c.repeat(o) : parseInt(e) == o ? (t += c.repeat(parseInt(e)), e = "0") : r ? t += c.repeat(parseInt(e) || o) : t += c;
      };
      try {
        for (; l < n.length; l++)
          d(n[l]), yield t, t = "";
      } catch (c) {
        console.error("Failed to decode COWRLE:", c);
      } finally {
        t = null;
      }
    }
    function xe(n) {
      return [...Se(n)].join("");
    }
    function Ne(n) {
      return [...ye(n)].join("");
    }
    var M = { encodeCOWRLE: xe, decodeCOWRLE: Ne };
    typeof globalThis.window < "u" && (globalThis.window.cowrle = M);
    typeof S < "u" && (S.exports = M);
  });
  var X = u((Ve, y) => {
    function Oe(n) {
      let t = [];
      for (let o = 0; o < n.length; o++) {
        let l = n.slice(o) + n.slice(0, o);
        t.push(l);
      }
      t.sort();
      let e = "";
      for (let o = 0; o < t.length; o++)
        e += t[o][n.length - 1];
      let r;
      for (let o = 0; o < t.length; o++)
        if (t[o] === n) {
          r = o;
          break;
        }
      return { transformedString: e, originalIndex: r };
    }
    function ke(n, t) {
      let e = [];
      for (let l = 0; l < n.length; l++)
        e.push({ char: n[l], index: l });
      e.sort((l, d) => l.char < d.char ? -1 : l.char > d.char ? 1 : 0);
      let r = "", o = t;
      for (let l = 0; l < n.length; l++)
        r += e[o].char, o = e[o].index;
      return r;
    }
    var v = { burrowsWheelerTransform: Oe, inverseBurrowsWheelerTransform: ke };
    typeof globalThis.window < "u" && (globalThis.window.bwt = v);
    typeof y < "u" && (y.exports = v);
  });
  var Y = u((Ye, x) => {
    var C = class {
      constructor(t, e) {
        this.char = t, this.freq = e, this.left = null, this.right = null;
      }
    };
    function Z(n) {
      let t = {};
      for (let e = 0; e < n.length; e++)
        t.hasOwnProperty(n[e]) ? t[n[e]]++ : t[n[e]] = 1;
      return t;
    }
    function J(n) {
      let t = [];
      for (let e in n)
        t.push(new C(e, n[e]));
      for (; t.length > 1; ) {
        t.sort((l, d) => l.freq - d.freq);
        let e = t.shift(), r = t.shift(), o = new C(null, e.freq + r.freq);
        o.left = e, o.right = r, t.push(o);
      }
      return t[0];
    }
    function m(n, t = "", e = {}) {
      return n.char !== null ? e[n.char] = t : (m(n.left, t + "0", e), m(n.right, t + "1", e)), e;
    }
    function Q(n, t) {
      let e = "";
      for (let r = 0; r < n.length; r++)
        e += t[n[r]];
      return e;
    }
    function Le(n) {
      let t = Z(n), e = J(t), r = m(e);
      return { encoded: Q(n, r), codeMap: r };
    }
    function Be(n, t) {
      let e = "", r = "";
      for (let o = 0; o < n.length; o++) {
        r += n[o];
        for (let l in t)
          if (t[l] === r) {
            e += l, r = "";
            break;
          }
      }
      return e;
    }
    var V = { buildFrequencyMap: Z, buildHuffmanTree: J, buildCodeMap: m, encode: Q, compress: Le, decompress: Be };
    typeof globalThis.window < "u" && (globalThis.window.huffman = V);
    typeof x < "u" && (x.exports = V);
  });
  var te = u((en, N) => {
    var ee = 0.032958984375;
    function He(n) {
      return n.length * ee;
    }
    function De(n) {
      return Math.ceil(n.length / 8192);
    }
    var ne = { CHUNK_LENGTH: 8192, CHUCK_LENGTH_SPEED: 270, CHAR_EXCHANGE_COST: ee, calculateCost: He, calculateChunks: De };
    typeof globalThis.window < "u" && (globalThis.window.cst = ne);
    typeof N < "u" && (N.exports = ne);
  });
  var ie = u((nn, O) => {
    var oe = { caseChunk({ transformedString: n, originalIndex: t }) {
      return `<Bull_Chunk:${n}|${t}:>`;
    }, caseBull({ chunk: n }) {
      return `<Bull:${n}:>`;
    } };
    typeof globalThis.window < "u" && (globalThis.window.casing = oe);
    typeof O < "u" && (O.exports = oe);
  });
  var le = u((tn, k) => {
    var re = { encode(n) {
      let t = (e) => `(${e})`;
      return n.replace(/\d+/g, (e) => t(e.split("").map((r) => String.fromCharCode(65 + parseInt(r))).join("")));
    }, decode(n) {
      return n.replace(/\((.*?)\)/g, (t, e) => e.split("").map((r) => r.charCodeAt(0) - 65).join(""));
    } };
    typeof globalThis.window < "u" && (globalThis.window.AvoidEnc = re);
    typeof k < "u" && (k.exports = re);
  });
  var ce = u((on, L) => {
    var de = { encode(n) {
      return n.replace(/\]\(/g, "\u03E2").replace(/\)\[/g, "\u03E3").replace(/\]\{/g, "\u03E0").replace(/\}\[/g, "\u03E1").replace(/\)\{/g, "\u03DE").replace(/\}\(/g, "\u03DF").replace(/\(\[/g, "{").replace(/\]\)/g, "}").replace(/\[\(/g, "<").replace(/\)\]/g, ">");
    }, decode(n) {
      return n.replace(/Ϣ/g, "](").replace(/ϣ/g, ")[").replace(/Ϡ/g, "]{").replace(/ϡ/g, "}[").replace(/Ϟ/g, "){").replace(/ϟ/g, "}(").replace(/\{/g, "([").replace(/\}/g, "])").replace(/\</g, "[(").replace(/\>/g, ")]");
    } };
    typeof globalThis.window < "u" && (globalThis.window.BracketEncoder = de);
    typeof L < "u" && (L.exports = de);
  });
  var fe = u((rn, T) => {
    var se = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", encode(n = "") {
      let t = this.chars, e = "", r = 0;
      for (; r < n.length; ) {
        let o = n.charCodeAt(r++), l = n.charCodeAt(r++), d = n.charCodeAt(r++), s = o >> 2, a = (o & 3) << 4 | l >> 4, c = isNaN(l) ? 64 : (l & 15) << 2 | d >> 6, f = isNaN(d) ? 64 : d & 63;
        e += [s, a, c, f].map((g) => t[g]).join("");
      }
      return e = e.replace(/=+$/, ""), e;
    }, decode(n = "") {
      let t = this.chars, e = "", r = 0;
      for (n = n.replace(/[^A-Za-z0-9\+\/\=]/g, ""); r < n.length; ) {
        let o = t.indexOf(n.charAt(r++)), l = t.indexOf(n.charAt(r++)), d = t.indexOf(n.charAt(r++)), s = t.indexOf(n.charAt(r++)), a = o << 2 | l >> 4, c = (l & 15) << 4 | d >> 2, f = (d & 3) << 6 | s;
        e += String.fromCharCode(a), d !== 64 && (e += String.fromCharCode(c)), s !== 64 && (e += String.fromCharCode(f));
      }
      return e = e.replace(/[\x00\uffff]+$/g, ""), e;
    } };
    typeof globalThis.window < "u" && (globalThis.window.base64 = se);
    typeof globalThis.Buffer < "u" ? T.exports = { encode(n) {
      return globalThis.Buffer.from(n).toString("base64");
    }, decode(n) {
      return globalThis.Buffer.from(n, "base64").toString("ascii");
    } } : typeof T < "u" && (T.exports = se);
  });
  var he = u((ln, H) => {
    var D = $(), I = X(), Ie = Y(), { CHUNK_LENGTH: ae, CHUCK_LENGTH_SPEED: Ae, CHAR_EXCHANGE_COST: Re, calculateCost: _e, calculateChunks: qe } = te(), B = ie(), A = le(), ue = ce(), R = fe();
    function Pe(n, t = ae) {
      let e = "";
      for (let r = 0; r < n.length; r += t) {
        let o = n.substring(r, Math.min(r + t, n.length)), l = R.encode(o), d = I.burrowsWheelerTransform(l), s = A.encode(d.transformedString), a = D.encodeCOWRLE(s), c = ue.encode(a);
        e += B.caseChunk({ transformedString: c, originalIndex: d.originalIndex });
      }
      return B.caseBull({ chunk: e });
    }
    function je(n) {
      let t = "", e = /<Bull:(.*):>/g.exec(n)[1], r = e.match(/<Bull_Chunk:(.*?)\|(\d+):>/g);
      if (r) {
        for (let o = 0; o < r.length; o++) {
          let l = r[o], [, d, s] = l.match(/<Bull_Chunk:(.*)\|(\d+):>/), a = ue.decode(d), c = D.decodeCOWRLE(a), f = A.decode(c), g = I.inverseBurrowsWheelerTransform(f, s);
          t += R.decode(g);
        }
        return t;
      }
    }
    var ge = { encodeBullpress: Pe, decodeBullpress: je, calculateCost: _e, calculateChunks: qe, CHUNK_LENGTH: ae, CHUCK_LENGTH_SPEED: Ae, CHAR_EXCHANGE_COST: Re, casing: B, AvoidEnc: A, base64: R, Cowrle: D, BWT: I, Huffman: Ie };
    typeof globalThis.window < "u" && (globalThis.window.bullpress = ge);
    typeof H < "u" && (H.exports = ge);
  });
  var Xe = u((dn, q) => {
    var { encodeBullpress: Fe, decodeBullpress: Ge, CHUNK_LENGTH: pe, base64: Ue, Cowrle: We, BWT: Ke, Huffman: ze, calculateCost: _, calculateChunks: P } = he();
    function j(n, t = false) {
      let e = Date.now(), r = encodeURI(n);
      function o(...f) {
        t && console.log(...f);
      }
      o("Encode COST:    ", _(r)), n.length < 1e3 && (o("Original String:   ", n), o("."), o("Original String (With URI ENCODE):   ", r), o(".."), o());
      let l = Fe(r), d = l.length < r.length, s = P(r);
      o("Encoded String:   ", l < 1e3 ? l : l.slice(0, 1e3) + "...", `
`), o("Optimization Status:   ", d ? "Optimized" : "Not Optimized", `
`), o("Encoded Length:   ", l.length, "bytes (", (l.length / 1024 / 1024).toFixed(2), "MB )"), o("Chunk Count:   ", s);
      let a = Date.now(), c = a - e;
      return o("Processing Time:   ", c, `ms
`), { uriString: r, encodedString: l, isOptimized: d, endTime: a, startTime: e, timeSpent: c, chunkCount: s, presumedTime: _(r).toFixed(2) };
    }
    function Me(n, t = false) {
      return new Promise((e, r) => e(j(n, t)));
    }
    function F(n, t = false) {
      function e(...a) {
        t && console.log(...a);
      }
      let r = Date.now(), o = Ge(n), l = P(o);
      e("Decoded String:   ", o < 1e3 ? o : o.slice(0, 1e3) + "...", `
`), e("Decoded Length:   ", o.length, "bytes (", (o.length / 1024 / 1024).toFixed(2), "MB )"), e("Chunk Count:   ", l);
      let d = Date.now(), s = d - r;
      return e("Processing Time:   ", s, `ms
`), { decodedString: decodeURI(o), endTime: d, startTime: r, timeSpent: s, chunkCount: l };
    }
    function $e(n, t = false) {
      return new Promise((e, r) => e(F(n, t)));
    }
    function ve(n, t = false) {
      function e(...Ee) {
        t && console.log(...Ee);
      }
      e(`.-- Encoding... --.
`);
      let r = j(n, t), { uriString: o, isOptimized: l, encodedString: d, endTime: s, startTime: a, timeSpent: c, chunkCount: f, presumedTime: g } = r;
      e(`'---- Encoded ----'
`), e(`.-- Decoding... --.
`);
      let me = F(d, t), { decodedString: b, endTime: p, startTime: w, timeSpent: Te, chunkCount: be } = me;
      e(`'---- Decoded ----'
`), e(`.-- Doing Math... --.
`);
      let G = p - a - g, h = d.length, E = o.length, U = b.length, Ze = h - E, we = (U - h) / h * 100, W = U - h, K = ((h - E) / E * 100).toFixed(2), z = o === b;
      return e(`'-------------------'
`), e(`.-- Doing Logs... --.
`), e("Original Length:   ", o.length, "bytes (", (o.length / 1024 / 1024).toFixed(2), "MB )"), e(), e("Chunk Length:   ", pe, "bytes"), e("Number of Chunks (Encoding):   ", f), e("Number of Chunks (Decoding):   ", be), e(), e("Encoding time:   ", c, "ms"), e("Decoding time:   ", p - w, "ms"), e("Presumed time:   ", g, "ms"), e(), e("Sizing difference:   ", W, "bytes"), e("Size difference %:   ", K, "%"), e(), e("Encoding Optimization:   ", l ? "Optimized" : "Not Optimized"), e(), e("PDIFF:   ", we, "%"), e(), e("Total Processing Time:   ", s - a + p - w, "ms"), e(), e("Presumption Accuracy:   ", G.toFixed(2), "ms"), e(), e("Result:   ", z ? "Success" : "Failure"), e(), e(`'-- Done logging! --'
`), { decodedString: () => b, decodeEndTime: p, decodeStartTime: w, decodeTimeSpent: Te, encodedString: () => d, encodeEndTime: s, encodeStartTime: a, encodeTimeSpent: c, isOptimized: l, presumedTime: g, result: z, sizeDifference: W, sizeDifferencePerc: K, timeDifference: G, uriString: () => o };
    }
    var Ce = { encode: j, encodeP: Me, decode: F, decodeP: $e, Test: ve, CHUNK_LENGTH: pe, calculateCost: _, calculateChunks: P, base64: Ue, Cowrle: We, BWT: Ke, Huffman: ze };
    typeof globalThis.window < "u" && (globalThis.window.GoMooE1 = Ce);
    typeof q < "u" && (q.exports = Ce);
  });
  Xe();
})();
