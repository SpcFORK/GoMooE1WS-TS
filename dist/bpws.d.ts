import { b as bp_d } from './bp.d-TonR61zm.js';
import { JSDOM } from 'jsdom';

declare const BP_SRC: () => string;
declare const BP_HOOKIN: (_: string) => string;
declare const functionToIIFE: (code: string, _?: string) => string;
declare const codeToIIFE: (code?: string, _?: string) => string;
declare const moduleToIIFE: (m: any, _: string) => string;
declare function makeCommentBlock(header: string, body: string, hasFooter?: boolean): string;
declare function w_JSHTMLUnpack(encodedHTML: string): void;
declare function makeDocument(head?: string, body?: string): JSDOM;
declare function packWModule(mod: any): string;
declare function packWModules(...mods: any[]): string;
declare function packScriptTagInvoker(...scripts: any[]): string;
declare function sendBP_HTML(res: any, head: string, html: string, ...functionScripts: any[]): [any, any, boolean];

declare const bpws_BP_HOOKIN: typeof BP_HOOKIN;
declare const bpws_BP_SRC: typeof BP_SRC;
declare const bpws_codeToIIFE: typeof codeToIIFE;
declare const bpws_functionToIIFE: typeof functionToIIFE;
declare const bpws_makeCommentBlock: typeof makeCommentBlock;
declare const bpws_makeDocument: typeof makeDocument;
declare const bpws_moduleToIIFE: typeof moduleToIIFE;
declare const bpws_packScriptTagInvoker: typeof packScriptTagInvoker;
declare const bpws_packWModule: typeof packWModule;
declare const bpws_packWModules: typeof packWModules;
declare const bpws_sendBP_HTML: typeof sendBP_HTML;
declare const bpws_w_JSHTMLUnpack: typeof w_JSHTMLUnpack;
declare namespace bpws {
  export { bpws_BP_HOOKIN as BP_HOOKIN, bpws_BP_SRC as BP_SRC, bp_d as bp, bpws_codeToIIFE as codeToIIFE, bpws_functionToIIFE as functionToIIFE, bpws_makeCommentBlock as makeCommentBlock, bpws_makeDocument as makeDocument, bpws_moduleToIIFE as moduleToIIFE, bpws_packScriptTagInvoker as packScriptTagInvoker, bpws_packWModule as packWModule, bpws_packWModules as packWModules, bpws_sendBP_HTML as sendBP_HTML, bpws_w_JSHTMLUnpack as w_JSHTMLUnpack };
}

export { BP_HOOKIN, BP_SRC, bpws as b, bp_d as bp, codeToIIFE, functionToIIFE, makeCommentBlock, makeDocument, moduleToIIFE, packScriptTagInvoker, packWModule, packWModules, sendBP_HTML, w_JSHTMLUnpack };
