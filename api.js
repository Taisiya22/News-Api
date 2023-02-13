const URL = 'https://newsapi.org/v2/everything';
const KEY = '3b8cd0881df0402aabe8cb936606f5c3';


export class NewsApi { 
    constructor() { 
        this.queryPage = 1;
        this.searchQuery = '';
    }

     getNews() {
    return fetch(`${URL}?apiKey=${KEY}&q=${ this.searchQuery}&pageSize=5&page=${this.queryPage}`)
        .then(res => res.json()).then(data => {
            this.incrementPage();
             return data});
       
    }
    
    resetPage() {
        this.queryPage = 1;
    }

    incrementPage() {
        this.queryPage += 1;
     }
    
}


   