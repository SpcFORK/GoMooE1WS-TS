// GoMooEncoder1-Webserver-TS
// Copyright (C) 2024  SpcFORK

// @ Constants
declare const CHUNK_LENGTH: number;
declare const CHUCK_LENGTH_SPEED: number;
declare const CHAR_EXCHANGE_COST: number;
declare function calculateCost(string: string): number;
declare function calculateChunks(string: string): number;

// Module declarations

declare module "src/encode/bullpress/cowrle" {
  export function encodeCOWRLE(input: string): string;
  export function decodeCOWRLE(input: string): string;
}

declare module "src/encode/bullpress/BWT" {
  export function burrowsWheelerTransform(input: string): { transformedString: string; originalIndex: number; };
  export function inverseBurrowsWheelerTransform(transformedString: string, originalIndex: number): string;
}

declare module "src/encode/bullpress/huffman" {
  export function buildFrequencyMap(str: string): Record<string, number>;
  export function buildHuffmanTree(freqMap: Record<string, number>): any;
  export function buildCodeMap(node: any, code?: string, codeMap?: Record<string, string>): Record<string, string>;
  export function encode(str: string, codeMap: Record<string, string>): string;
  export function compress(str: string): { encoded: string; codeMap: Record<string, string>; };
  export function decompress(encoded: string, codeMap: Record<string, string>): string;
}

declare module "src/encode/bullpress/blocks/cst" {
  export { CHUNK_LENGTH, CHUCK_LENGTH_SPEED, CHAR_EXCHANGE_COST, calculateCost, calculateChunks }
}

declare module "src/encode/bullpress/blocks/casing" {
  export function caseChunk(data: { transformedString: string; originalIndex: number; }): string;
  export function caseBull(data: { chunk: string; }): string;
}

declare module "src/encode/bullpress/blocks/avoidE" {
  export function encode(input: string): string;
  export function decode(input: string): string;
}

declare module "src/encode/bullpress/blocks/bracketE" {
  export function encode(input: string): string;
  export function decode(input: string): string;
}

declare module "src/encode/bullpress/blocks/base64" {
  export function encode(input: string): string;
  export function decode(input: string): string;
}

declare module "src/encode/bullpress/bullpress" {
  export { encodeBullpress, decodeBullpress, calculateCost, calculateChunks, CHUNK_LENGTH, CHUCK_LENGTH_SPEED, CHAR_EXCHANGE_COST, casing, AvoidEnc, base64, Cowrle, BWT, Huffman };
}

declare interface basicResult {
  endTime: number,
  startTime: number,
  timeSpent: number,
  chunkCount: number
}

interface EncodeResult extends basicResult {
  uriString: string,
  encodedString: string,
  isOptimized: boolean,
  presumedTime: string
}

interface DecodeResult extends basicResult {
  decodedString: string,
  chunkCount: number
}

interface ProcessEncodingResult {
  decodedString: () => string,
  decodeEndTime: number,
  decodeStartTime: number,
  decodeTimeSpent: number,
  encodedString: () => string,
  encodeEndTime: number,
  encodeStartTime: number,
  encodeTimeSpent: number,
  isOptimized: boolean,
  presumedTime: string,
  result: boolean,
  sizeDifference: number,
  sizeDifferencePerc: string,
  timeDifference: number,
  uriString: () => string
}

declare function encode(input: string, logging?: boolean): EncodeResult;
declare function encodeP(input: string, logging?: boolean): Promise<EncodeResult>;
declare function decode(input: string, logging?: boolean): DecodeResult;
declare function decodeP(input: string, logging?: boolean): Promise<DecodeResult>;
declare function processEncoding(input: string, logging?: boolean): ProcessEncodingResult;

// @ Other exports
declare var base64: any;
declare var Cowrle: any;
declare var BWT: any;

// Unused
declare var Huffman: any;

declare module "src/encode/bullpress/index" {
  export { encodeBullpress, decodeBullpress, CHUNK_LENGTH, base64, Cowrle, BWT, Huffman, calculateCost, calculateChunks }
}

declare global {
  interface Window {
    GoMooE1: any;
  }
}

declare const bp_d_BWT: typeof BWT;
declare const bp_d_CHAR_EXCHANGE_COST: typeof CHAR_EXCHANGE_COST;
declare const bp_d_CHUCK_LENGTH_SPEED: typeof CHUCK_LENGTH_SPEED;
declare const bp_d_CHUNK_LENGTH: typeof CHUNK_LENGTH;
declare const bp_d_Cowrle: typeof Cowrle;
type bp_d_DecodeResult = DecodeResult;
type bp_d_EncodeResult = EncodeResult;
declare const bp_d_Huffman: typeof Huffman;
type bp_d_ProcessEncodingResult = ProcessEncodingResult;
declare const bp_d_base64: typeof base64;
declare const bp_d_calculateChunks: typeof calculateChunks;
declare const bp_d_calculateCost: typeof calculateCost;
declare const bp_d_decode: typeof decode;
declare const bp_d_decodeP: typeof decodeP;
declare const bp_d_encode: typeof encode;
declare const bp_d_encodeP: typeof encodeP;
declare const bp_d_processEncoding: typeof processEncoding;
declare namespace bp_d {
  export { bp_d_BWT as BWT, bp_d_CHAR_EXCHANGE_COST as CHAR_EXCHANGE_COST, bp_d_CHUCK_LENGTH_SPEED as CHUCK_LENGTH_SPEED, bp_d_CHUNK_LENGTH as CHUNK_LENGTH, bp_d_Cowrle as Cowrle, type bp_d_DecodeResult as DecodeResult, type bp_d_EncodeResult as EncodeResult, bp_d_Huffman as Huffman, type bp_d_ProcessEncodingResult as ProcessEncodingResult, bp_d_base64 as base64, bp_d_calculateChunks as calculateChunks, bp_d_calculateCost as calculateCost, bp_d_decode as decode, bp_d_decodeP as decodeP, bp_d_encode as encode, bp_d_encodeP as encodeP, bp_d_processEncoding as processEncoding };
}

export { BWT as B, CHUNK_LENGTH as C, type DecodeResult as D, type EncodeResult as E, Huffman as H, type ProcessEncodingResult as P, CHUCK_LENGTH_SPEED as a, bp_d as b, CHAR_EXCHANGE_COST as c, calculateCost as d, calculateChunks as e, encode as f, encodeP as g, decode as h, decodeP as i, base64 as j, Cowrle as k, processEncoding as p };
