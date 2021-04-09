enum Property {
    query = 'query',
    body = 'body',
    headers = 'headers',
}

interface JWTBody {
    username?: string;
}

export {
    Property,
    JWTBody,
};
