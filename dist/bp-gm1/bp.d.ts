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

export { BWT, CHAR_EXCHANGE_COST, CHUCK_LENGTH_SPEED, CHUNK_LENGTH, Cowrle, type DecodeResult, type EncodeResult, Huffman, type ProcessEncodingResult, base64, calculateChunks, calculateCost, decode, decodeP, encode, encodeP, processEncoding };
