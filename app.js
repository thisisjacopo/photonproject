// Your API key: 563492ad6f91700001000001e346925025b84f789a609f6a6f9443d5

const auth = "563492ad6f91700001000001e346925025b84f789a609f6a6f9443d5";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (event) => {
  event.preventDefault(); //prevents the page from refreshing when submitting the form
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(event) {
  searchValue = event.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePics(data);
}

function generatePics(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-image");
    galleryImg.innerHTML = `
    <div class='gallery-info'>
            <p>Photo by: ${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img>`;
    gallery.append(galleryImg);
  });
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePics(data);
}

function clear() {
  //Clears form input and gallery body so that the searched photos appear on top of the page
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePics(data);   
}

curatedPhotos();
