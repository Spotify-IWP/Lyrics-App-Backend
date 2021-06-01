import { Response, Request } from 'express';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import unidecode from 'unidecode';
import User from '../../models/user';
import { notFound, serverError } from '../../utils/expressResponses';

export const getLyrics = async (req: Request, res: Response) => {
    try {
        const delim1 = '<div class="hwc"><div class="BNeawe tAd8D AP7Wnd"><div><div class="BNeawe tAd8D AP7Wnd">';
        const delim2 = '<span class="hwc"><div class="BNeawe uEec3 AP7Wnd">';
        const url = 'https://www.google.com/search?q=';
        const { artist, song } = req.query;

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
            return notFound(res);
        }

        const lines = lyrics.split('\n').map((line: string) => htmlToText(line));

        await User.findOneAndUpdate({
            username: res.locals.user.username,
        }, {
            $push: { searchHistory: { artist, song } },
        });

        return res.send({ lyrics: unidecode(lines.join('\n')).trim() });
    } catch {
        return serverError(res);
    }
};

export const getHistory = async (req: Request, res: Response) => {
    try {
        const { searchHistory } = await User.findOne({
            username: res.locals.user.username,
        });

        return res.send({ searchHistory });
    } catch {
        return serverError(res);
    }
};
