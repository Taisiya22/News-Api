import {NewsApi} from './api.js'
import { LoadMoreBtn } from './componenets/loadMoreBtn.js';

const form = document.getElementById("form");
const list = document.getElementById("articlesWrapper");
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMoreBtn',
  isHidden: true
})


// let inputValue = ''; 
const newsApi = new NewsApi();

form.addEventListener("submit", onSubmit);
loadMoreBtn.button.addEventListener("click", fetchNews)

function onSubmit(e) {
  e.preventDefault();
  clearNewsList();
  console.log(newsApi)
  newsApi.resetPage();
  loadMoreBtn.show();
  const form = e.currentTarget;
   newsApi.searchQuery = form.elements.news.value.trim();

  fetchNews().finally(() => form.reset())

  
   }
   

function createMarkup({ author, title, description, url, urlToImage }) { 
  return `<div class="article-card">
        <h2 class="article-title">${title}</h2>
        <h3 class="article-author">${author || "Anonym"}</h3>
        <img src=${urlToImage} class="article-img">
        <p class="article-description">${description}</p>
        <a href=${url} class="article-link" target="_blank">Read more</a>
    </div>`
}


function updateNewsList(markup) {
  list.insertAdjacentHTML('beforeend', markup)
}
 
function fetchNews(e) { 
  loadMoreBtn.disable();
console.log(newsApi)
  return newsApi.getNews().then(({ articles }) => {
    console.log(articles)
    if (articles.length === 0) throw new Error("No data");
    return articles.reduce((markup, article) => createMarkup(article) + markup , "")
  })
    .then(markup => { 
      updateNewsList(markup);
      loadMoreBtn.enable();
    })
    .catch(onError)
    
}

function onError(err) {
  console.error(err);
  updateNewsList("<p>Articles not found</p>");
}

function clearNewsList() { 
  list.innerHTML = '';
}