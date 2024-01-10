export type TickerRequest = {
    symbol: string;
    timespan: string;
    from: string;
    to: string;
};

export type TickerResponse = {
    o: number;
    c: number;
    h: number;
    l: number;
    n: number;
    t: string;
    v: number;
    vw: number;
};
