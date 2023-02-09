import {getNews} from './api.js'

const form = document.getElementById("form");
const list = document.getElementById("articlesWrapper");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const inputValue = form.elements.news.value;
  console.log("🚀 ~ file: index.js:12 ~ onSubmit ~ inputValue ", inputValue)
  getNews(inputValue).then(({ articles }) => {
    if (articles.length === 0) {
      throw new Error('No data')
    };
    return articles.reduce((markup, article) => createMarkup(article) + markup , "")
  })
    .then(updateNewsList)
    .catch(console.error())
    .finally(() => form.reset())

  
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
  list.innerHTML = markup
 }