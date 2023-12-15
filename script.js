const accessKey ="qp5L48OXTeZXTPQHO0FFUTfgDp4DixuwTNsO9agK4PA";

const heading = document.getElementById("headding");
const fromElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElement.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page ==1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++
    if(page>1){
        showMoreButton.style.display = "block"
    }

}

function redirectToHomePage() {
    window.location.href = "http://127.0.0.1:5500/index.html?"; // Replace with your home page URL
  }

heading.addEventListener("click",redirectToHomePage);

fromElement.addEventListener("submit",(event) =>{
    event.preventDefault()
    page = 1;
    searchImages()
})


showMoreButton.addEventListener("click",() =>{
    searchImages()
})