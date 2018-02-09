export type mapCallback = (key: string, value: any, i: number, keys: string[], values: any[]) => Object;

export type reduceCallback = (accum: any, cur: string, value: any) => any

export type filterCallback = (key: string, value: any) => Object;