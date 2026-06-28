let allBooks = [];

document.addEventListener("DOMContentLoaded", async () => {

    allBooks = await getBooks();

    renderNewReleases();

    renderBooks();

});

function createBookCard(book){

    return `

        <article class="book-card">

            <img src="${book.cover}" alt="${book.title}">

            <h3>${book.title}</h3>

            <p>${book.author}</p>

        </article>

    `;

}

function renderNewReleases(){

    const container = document.getElementById("newReleaseGrid");

    container.innerHTML = "";

    allBooks
        .slice(0,8)
        .forEach(book=>{

            container.innerHTML += createBookCard(book);

        });

}

function renderBooks(){

    const container = document.getElementById("bookGrid");

    container.innerHTML = "";

    allBooks
        .slice(0,24)
        .forEach(book=>{

            container.innerHTML += createBookCard(book);

        });

}