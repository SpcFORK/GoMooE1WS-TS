// GoMooEncoder1-Webserver-TS
// Copyright (C) 2024  SpcFORK

import * as bp from "./bp-gm1/bp"
import * as fs from "fs";
import * as path from "path";

import * as express from "express";

import { JSDOM } from "jsdom";

function chaosWindow() { return (globalThis.window as any) }

// ---

const BP_SRC = (): string =>
  fs.readFileSync(path.join(__dirname, "./bp-gm1/w/index.js"), "utf8");

const BP_HOOKIN = (_: string): string => `${BP_SRC()}

// ---
;/BP_HOOKIN/;
${_ + ""}`;

// ---

const functionToIIFE = (code: string, _: string = ""): string => `(${code})(${_});`;
const codeToIIFE = (code: string = "{}", _: string = ""): string => functionToIIFE("_ => " + code, _);
const moduleToIIFE = (m: any, _: string): string => {
  if (m?.then) {
    return m.then((nm: any) => moduleToIIFE(nm, _));
  }
  //
  else if (typeof m === "function") {
    return functionToIIFE(m, _);
  }
  //
  else if (typeof m === "object" && typeof m?.default === "function") {
    return functionToIIFE(m.default, _);
  }
  //
  else if (typeof m?.WebEntry === "function") {
    return functionToIIFE(m.WebEntry, _);
  }
  //
  else throw new Error("Unknown module type");
};

// ---

function makeCommentBlock(header: string, body: string, hasFooter: boolean = false): string {
  const bodyHTML = body
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

  const makeCommentTagline = (name: string, h: string) =>
    `<!-- ${hasFooter ? `${name} OF ` : ""}${h} -->`;

  const commentHead = makeCommentTagline("START", header);
  const commentFoot = hasFooter ? makeCommentTagline("END", header) : "";

  return `${commentHead}\n${bodyHTML}\n${commentFoot}`;
}

// ---
// @Web

// @Deps
function BP_appendComment(container: Node, text: string): Node {
  return container.appendChild(document.createComment(text));
}

function w_headProcessCleanup(name: string): void {
  const scriptTag = document.querySelector("script[id=BPWS-SRC]");

  if (scriptTag)
    scriptTag.replaceWith(document.createComment(" BPWS_SOURCECODE_HIDDEN "));

  function deleteUneededTags(container: Element): void {
    container.innerHTML = container.innerHTML.replace(
      /(START OF (BP([^-]+){2})([^]+)END OF \2)/g,
      "BPWS_DEPACKED ",
    );
  }

  [document.body, document.head].forEach(deleteUneededTags);
}

// @Core
function w_JSHTMLUnpack(encodedHTML: string): void {
  const dobj = window.GoMooE1.decode(encodedHTML),
    str = dobj.decodedString;

  chaosWindow().GM1Client = {
    ...(chaosWindow().GM1Client || {}),

    decodedObject: dobj,
    decodedString: str,
  };

  addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = str;
  });
}

function w_makeResults(results: any): void {
  chaosWindow().GM1Client = {
    serverToPeer: results,
  };
}

function w_runScriptTagInvoker(): void {
  const scriptTags = document.querySelectorAll("script");

  const cBlockName = "BPWS_INVOKER_LOAD";

  BP_appendComment(document.head, `START OF ${cBlockName}`);

  scriptTags.forEach((scriptTag: HTMLScriptElement) => {
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

// ---

function makeDocument(head: string = "", body: string = ""): JSDOM {
  return new JSDOM(
    `<!DOCTYPE html><html>\n<head>\n${head}\n</head>\n<body>\n${body}\n</body>\n</html>`,
  );
}

function unpackDocument(doc: Partial<typeof globalThis>): { head: string; body: string } {
  if (typeof doc === "string") (doc as JSDOM) = new JSDOM(doc);

  const { window } = doc;
  if (!window) throw new Error("No window object");

  const head = window.document.head.innerHTML;
  const body = window.document.body.innerHTML;
  return { head, body };
}

function packWModule(mod: any): string {
  const modStr: string = typeof mod === "string" ? mod : functionToIIFE("s");
  return `<script>${modStr}</script>`;
}

function packWModules(...mods: any[]): string {
  return mods.map(packWModule).join("\n");
}

function packScriptTagInvoker(...scripts: any[]): string {
  const scriptTags = packWModules(...scripts);
  const encodedScripts = bp.base64.encode(scriptTags);

  function unpackSI(scripts: string): void {
    const encodedScripts = window.GoMooE1.base64.decode(scripts);

    const doc = new DOMParser().parseFromString(encodedScripts, "text/html");
    const vHead = doc.querySelector("head")

    const cBlockName = "BP_SCRIPT_TAG_INVOKER";

    BP_appendComment(document.head, `START OF ${cBlockName}`);

    if (vHead) for (const child of Array.from(vHead.children)) {
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
      `</script>`,
    ].join("\n"),
    true,
  );
}

function sendBP_HTML(res: any, head: string, html: string, ...functionScripts: any[]): [any, any, boolean] {
  const allScripts = packScriptTagInvoker(...functionScripts),
    compHTML = bp.encode(allScripts + "\n\n" + html),
    unpacker = functionToIIFE(w_JSHTMLUnpack.toString(), `'${compHTML.encodedString}'`);

  const safeCompResult = Object.assign({}, compHTML);

  const safeCompResultPartial: Partial<typeof safeCompResult> = safeCompResult;
  delete safeCompResultPartial.uriString;

  const deps = [BP_appendComment, chaosWindow];

  const dependandFunctions = makeCommentBlock(
    "BPWS_DEPENDANT_FUNCTIONS",
    [`<script>`, ...deps, `</script>`].join("\n"),
    true,
  );

  const htmlUnpacker = makeCommentBlock(
    "BPWS_HTML_UNPACKER",
    [
      `<script>${functionToIIFE(w_makeResults.toString(), JSON.stringify(safeCompResult))}</script>`,
      `<script>${BP_HOOKIN(unpacker)}</script>`,
    ].join("\n"),
  );

  const scriptLoader = makeCommentBlock(
    "BPWS_SCRIPT_LOADER",
    [
      `<script>`,
      w_runScriptTagInvoker,
      w_headProcessCleanup,
      `addEventListener('DOMContentLoaded', w_runScriptTagInvoker)`,
      `addEventListener('DOMContentLoaded', w_headProcessCleanup)`,
      `</script>`,
    ].join("\n"),
  );

  const builtSMpl = [dependandFunctions, htmlUnpacker, scriptLoader].join("\n");

  const scriptRoot = makeCommentBlock("BP_UNPACKER_ARCHIVE", builtSMpl, true);

  const dom = makeDocument(head, scriptRoot);

  return [res.send(dom.serialize()), compHTML, (dom.window.close(), true)];
}

// ---

/**
 * @param {express.Application} app - Express application
 *
 * @param cb - Express Callback function
 *
 * If CB returns false, the request is not processed.
 */
function createCompressionRoute(app: express.Application, cb?: (req: express.Request, res: express.Response) => {}) {
  app.use(express.static("./bp-gm1/w"));

  app.get("/bpws/compress/:file", (req, res) => {
    var cbTemp: any;
    if (cb) cbTemp = cb(req, res);

    if (cbTemp !== false) {
      const file = req.params.file;

      // Prevent Directory Traversal Exp
      if (file.includes("..")) return res.sendStatus(403);

      const file_path = path.join(__dirname, "../front", file);
      if (!fs.existsSync(file_path)) return res.sendStatus(404);

      const file_content = fs.readFileSync(file_path, "utf8"),
        comp_content = bp.encode(file_content);

      var tempContent: Partial<bp.EncodeResult> = Object.assign({}, comp_content);
      delete tempContent.uriString;

      res
        .type('json')
        .send(JSON.stringify(
          tempContent,
        ))
    }
  })
}

export {
  // @ COMPRESSION
  BP_HOOKIN,

  createCompressionRoute,

  BP_SRC,
  w_JSHTMLUnpack,
  makeDocument,

  // @ REQUESTS
  sendBP_HTML,
  unpackDocument,
  // ---

  // ---

  // @ JS-CORE
  functionToIIFE,
  codeToIIFE,
  moduleToIIFE,

  packWModules,
  packWModule,
  packScriptTagInvoker,
  // ---

  // @ TOOLING
  makeCommentBlock,
  // ---

  bp,
};
