export enum Property {
    query = 'query',
    body = 'body',
    headers = 'headers',
    params = 'params',
}

export interface JWTBody {
    username?: string;
}
