import { Response, Request } from 'express';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import MIMEType from 'whatwg-mimetype';
import iconv from 'iconv-lite';
import User from '../../models/user';
import { notFound, serverError } from '../../utils/expressResponses';

axios.interceptors.response.use((response) => {
    const mimeType = new MIMEType(response.headers['content-type']);
    const charset = mimeType.parameters.get('charset') || 'UTF-8';
    const c = iconv.encodingExists(charset) ? charset : 'UTF-8';
    response.data = iconv.decode(response.data, c);
    return response;
});

export const getLyrics = async (req: Request, res: Response) => {
    try {
        const delim1 = '<div class="hwc"><div class="BNeawe tAd8D AP7Wnd"><div><div class="BNeawe tAd8D AP7Wnd">';
        const delim2 = '<span class="hwc"><div class="BNeawe uEec3 AP7Wnd">';
        const url = 'https://www.google.com/search?q=';
        const { artist, song } = req.query;

        const user = await User.findOneAndUpdate({
            username: res.locals.user.username,
        }, {
            $push: { searchHistory: { artist, song } },
        });

        if (!user) {
            return notFound(res, 'Error: user not found');
        }

        const searchQueries = [
            encodeURIComponent(`${artist} ${song} song`),
            encodeURIComponent(`${artist} ${song} lyrics`),
            encodeURIComponent(`${artist} ${song} song lyrics`),
            encodeURIComponent(`${artist} ${song}`),
        ];

        const lyricsArr = await Promise.all(searchQueries.map(async (searchQuery) => {
            try {
                const { data: searchResult } = await axios.get(`${url}${searchQuery}`);
                return searchResult.split(delim1)[1].split(delim2)[0];
            } catch {
                return '';
            }
        }));

        const lyrics = lyricsArr.find((l) => l);

        if (!lyrics) {
            return notFound(res, 'Error: could not find the lyrics');
        }

        const lines = lyrics.split('\n').map((line: string) => htmlToText(line));
        return res.send({ lyrics: lines.join('\n').trim() });
    } catch (e) {
        return serverError(res, e.message);
    }
};

export const getHistory = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            username: res.locals.user.username,
        });

        if (!user) {
            return notFound(res, 'Error: user not found');
        }

        const { searchHistory } = user;
        return res.send({ searchHistory });
    } catch (e) {
        return serverError(res, e.message);
    }
};

export const clearHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = id ? await User.findOneAndDelete({
            id,
        }) : await User.findOneAndDelete();

        if (!user) {
            return notFound(res, 'Error: user not found');
        }

        return res.send({ success: true });
    } catch (e) {
        return serverError(res, e.message);
    }
};
