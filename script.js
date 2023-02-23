let apiQuotes = [];
let randomNum;
let quote;
const quoteButton = document.getElementById("quote-button");
const quoteContainer = document.getElementById("container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const loader = document.getElementById("loader");
//display loader
const loading = () => {
  quoteContainer.classList.add("hidden");
  loader.hidden = false;
};
//hide loader
const complete = () => {
  quoteContainer.classList.remove("hidden");
  loader.hidden = true;
};
const getQuotes = async () => {
  const apiURL = `https://type.fit/api/quotes`;
  //try catch allows us to attempt a fetch request, but if it doesnt work we can catch the error and do something with it
  try {
    loading();
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
    updateUI();
    complete();
  } catch (error) {
    //catch error here
    apiQuotes = localQuotes;
    newQuote();
    updateUI();
  }
};
//show new quote
const newQuote = () => {
  randomNum = Math.floor(Math.random() * apiQuotes.length);

  quote = apiQuotes[randomNum];

  console.log(quote);
  return quote;
};

//change dom
const updateUI = () => {
  quoteText.textContent = quote.text;
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
  //check quote length to determine styling
  if (quote.text.length > 90) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
};
quoteButton.addEventListener("click", getQuotes);
//tweet quote
const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}

  `;
  window.open(twitterURL, "_blank");
};
twitterButton.addEventListener("click", tweetQuote);
//onload
getQuotes();
