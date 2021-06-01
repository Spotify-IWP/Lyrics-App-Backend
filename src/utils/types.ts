export enum Property {
    query = 'query',
    body = 'body',
    headers = 'headers',
}

export interface JWTBody {
    username?: string;
}
