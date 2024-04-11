// @ Constants
declare export const CHUNK_LENGTH: number;
declare export const CHUCK_LENGTH_SPEED: number;
declare export const CHAR_EXCHANGE_COST: number;
declare export function calculateCost(string: string): number;
declare export function calculateChunks(string: string): number;

declare interface EncodeDecode {
  encode(input: string): string;
  decode(input: string): string;
}

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
  export {
    CHUNK_LENGTH,
    CHUCK_LENGTH_SPEED,
    CHAR_EXCHANGE_COST,
    calculateCost,
    calculateChunks
  }
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
  export {
    encodeBullpress,
    decodeBullpress,
    calculateCost,
    calculateChunks,
    CHUNK_LENGTH,
    CHUCK_LENGTH_SPEED,
    CHAR_EXCHANGE_COST,
    casing,
    AvoidEnc,
    base64,
    Cowrle,
    BWT,
    // Unused
    Huffman
  };
}

declare interface basicResult {
  endTime: number,
  startTime: number,
  timeSpent: number,
  chunkCount: number
}

export interface EncodeResult extends basicResult {
  uriString: string,
  encodedString: string,
  isOptimized: boolean,
  presumedTime: string
};

export interface DecodeResult extends basicResult {
  decodedString: string,
  chunkCount: number
}

export interface ProcessEncodingResult {
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
};

export function encode(input: string, logging?: boolean): EncodeResult;
export function encodeP(input: string, logging?: boolean): Promise<EncodeResult>;
export function decode(input: string, logging?: boolean): DecodeResult;
export function decodeP(input: string, logging?: boolean): Promise<DecodeResult>;
export function processEncoding(input: string, logging?: boolean): ProcessEncodingResult;

// @ Other exports
export var base64: any;
export var Cowrle: any;
export var BWT: any;

// Unused
export var Huffman: any;

declare module "src/encode/bullpress/index" {
  export {
    encodeBullpress,
    decodeBullpress,
    CHUNK_LENGTH,
    base64,
    Cowrle,
    BWT,
    // Unused
    Huffman,
    calculateCost,
    calculateChunks
  }
}

declare global {
  interface Window {
    GoMooE1: any;
  }
}