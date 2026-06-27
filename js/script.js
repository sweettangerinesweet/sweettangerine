// ===============================
// Sweet Tangerine v1.0
// ===============================

let allBooks = [];
let displayedBooks = 24;

// ===============================
// LOAD WEBSITE
// ===============================

window.addEventListener("DOMContentLoaded", async () => {

    allBooks = await getBooks();

    // Urutkan berdasarkan SORTED DATE (terbaru)
    allBooks.sort((a, b) => new Date(b.sortedDate) - new Date(a.sortedDate));

    renderNewReleases();
    renderBooks();

});

// ===============================
// NEW RELEASES
// ===============================

function renderNewReleases() {

    const container = document.getElementById("newReleases");

    container.innerHTML = "";

    allBooks.slice(0, 12).forEach(book => {

        container.innerHTML += createBookCard(book);

    });

}

// ===============================
// LATEST BOOKS
// ===============================

function renderBooks(list = allBooks) {

    const container = document.getElementById("bookContainer");

    container.innerHTML = "";

    list.slice(0, displayedBooks).forEach(book => {

        container.innerHTML += createBookCard(book);

    });

}

// ===============================
// BOOK CARD
// ===============================

function createBookCard(book) {

    return `

    <div class="book-card">

        <img
            src="${book.cover}"
            alt="${book.title}"
            loading="lazy"
        >

        <div class="book-info">

            <div class="book-title">

                ${book.title}

            </div>

            <div class="book-author">

                ${book.author}

            </div>

        </div>

    </div>

    `;

}

// ===============================
// LOAD MORE
// ===============================

document.getElementById("loadMoreBtn").addEventListener("click", () => {

    displayedBooks += 24;

    renderBooks();

});