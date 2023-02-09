const URL = 'https://newsapi.org/v2/everything';
const KEY = '3b8cd0881df0402aabe8cb936606f5c3'

export function getNews(query) {
    return fetch(`${URL}?apiKey=${KEY}&q=${query}`)
        .then(res => res.json());
       
 }