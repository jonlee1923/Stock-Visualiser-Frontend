export type AggregateRequest = {
    symbol: string;
    timespan: string;
    from: string;
    to: string;
};

export type AggregateResponse = {
    o: number;
    c: number;
    h: number;
    l: number;
    n: number;
    t: string;
    v: number;
    vw: number;
};

export type TickerRequest = {
    symbol: string;
};

export type TickerResponse = {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik: string;
    composite_figi: string;
    share_class_figi: string;
    last_updated_utc: string;
};
