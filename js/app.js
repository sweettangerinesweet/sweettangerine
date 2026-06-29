// ===============================
// SWEET TANGERINE v2
// APP
// ===============================

let allBooks = [];
let filteredBooks = [];
let currentCategory = "All";
let currentSort = "default";
let booksPerPage = 24;

// ===============================
// START
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

    allBooks = await getBooks();

    filteredBooks = [...allBooks];

    updateStatistics();

    loadCategories();

    renderBooks();

    initSearch();

    initCategoryFilter();

    initSort();

    initLoadMore();

});

// ===============================
// RENDER BOOKS
// ===============================

function renderBooks() {

    const latestSection = document.getElementById("latestSection");
    const latestContainer = document.getElementById("bookGrid");
    const newContainer = document.getElementById("newReleaseGrid");
    const emptyState = document.getElementById("emptyState");
    const button = document.getElementById("loadMoreBtn");

    if (!latestSection || !latestContainer || !newContainer) return;

    latestContainer.innerHTML = "";
    newContainer.innerHTML = "";

    // ===============================
    // EMPTY STATE
    // ===============================

    if (emptyState) {

        if (filteredBooks.length === 0) {

            latestSection.style.display = "none";
            emptyState.style.display = "block";

        } else {

            latestSection.style.display = "block";
            emptyState.style.display = "none";

        }

    }

    // ===============================
    // LATEST BOOKS
    // ===============================

    filteredBooks
        .slice(0, booksPerPage)
        .forEach(book => {

            latestContainer.innerHTML += createBookCard(book);

        });

    // ===============================
    // NEW RELEASES
    // ===============================

    allBooks
        .slice(0, 8)
        .forEach(book => {

            newContainer.innerHTML += createBookCard(book);

        });

    // ===============================
    // LOAD MORE BUTTON
    // ===============================

    if (button) {

        if (booksPerPage >= filteredBooks.length) {

            button.style.display = "none";

        } else {

            button.style.display = "inline-block";

        }

    }

}


// ===============================
// BOOK CARD
// ===============================

function createBookCard(book){

    return `

        <article class="book-card">

            <img
                src="${book.cover}"
                alt="${book.title}"
                loading="lazy"
            >

            <h3>${book.title}</h3>

            <p>${book.author}</p>

        </article>

    `;

}

// ===============================
// LOAD CATEGORIES
// ===============================

function loadCategories(){

    const select = document.getElementById("categorySelect");

    if(!select) return;

    // Kosongkan dropdown
    select.innerHTML = `
        <option value="All">📚 All Genres</option>
    `;

    // Ambil semua kategori unik
    const categories = [...new Set(

        allBooks
            .map(book => book.category)
            .filter(category => category)

    )];

    // Urutkan A-Z
    categories.sort();

    // Tambahkan ke dropdown
    categories.forEach(category=>{

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        select.appendChild(option);

    });

}

// ===============================
// SEARCH
// ===============================

function initSearch(){

    const input = document.getElementById("searchInput");

    input.addEventListener("input", applyFilters);

}

// ===============================
// CATEGORY FILTER
// ===============================

function initCategoryFilter(){

    const select = document.getElementById("categorySelect");

    select.addEventListener("change", ()=>{

        currentCategory = select.value;

        applyFilters();

    });

}

// ===============================
// SORT
// ===============================

function initSort(){

    const select = document.getElementById("sortSelect");

    if(!select) return;

    select.addEventListener("change", ()=>{

        currentSort = select.value;

        applyFilters();

    });

}

// ===============================
// APPLY FILTERS
// ===============================

function applyFilters(){

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();
    
    booksPerPage = 24;

    filteredBooks = allBooks.filter(book=>{

        const title = String(book.title || "").toLowerCase();

const author = String(book.author || "").toLowerCase();

const matchSearch =

    title.includes(keyword)

    ||

    author.includes(keyword);

        const matchCategory =

            currentCategory==="All"

            ||

            book.category===currentCategory;

        return matchSearch && matchCategory;

    });

    // ===============================
// SORTING
// ===============================

switch(currentSort){

    case "titleAsc":

        filteredBooks.sort((a,b)=>

            a.title.localeCompare(b.title)

        );

        break;

    case "titleDesc":

        filteredBooks.sort((a,b)=>

            b.title.localeCompare(a.title)

        );

        break;

    case "authorAsc":

        filteredBooks.sort((a,b)=>

            a.author.localeCompare(b.author)

        );

        break;

    case "authorDesc":

        filteredBooks.sort((a,b)=>

            b.author.localeCompare(a.author)

        );

        break;

    case "newest":

        filteredBooks.sort((a,b)=>

            new Date(b.publishedDate)-new Date(a.publishedDate)

        );

        break;

    case "oldest":

        filteredBooks.sort((a,b)=>

            new Date(a.publishedDate)-new Date(b.publishedDate)

        );

        break;

}

    renderBooks();

}

// ===============================
// LIBRARY STATISTICS
// ===============================

function updateStatistics(){

    const bookCount = document.getElementById("bookCount");
    const authorCount = document.getElementById("authorCount");
    const genreCount = document.getElementById("genreCount");

    if(!bookCount || !authorCount || !genreCount) return;

    // Total Books
    bookCount.textContent = allBooks.length.toLocaleString();

    // Total Authors
    const authors = new Set(
        allBooks
            .map(book => book.author)
            .filter(author => author)
    );

    authorCount.textContent = authors.size.toLocaleString();

    // Total Genres
    const genres = new Set(
        allBooks
            .map(book => book.category)
            .filter(category => category)
    );

    genreCount.textContent = genres.size.toLocaleString();

}

// ===============================
// LOAD MORE
// ===============================

function initLoadMore(){

    const button = document.getElementById("loadMoreBtn");

    if(!button) return;

    button.addEventListener("click", ()=>{

        booksPerPage += 24;

        renderBooks();

    });

}