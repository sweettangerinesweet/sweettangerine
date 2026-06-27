// ======================================
// Sweet Tangerine
// Main Script
// ======================================

let books = [];

// saat website dibuka
window.onload = async function () {

    books = await getBooks();

    console.log("Books loaded:", books.length);

    renderBooks(books);

};


// menampilkan buku
function renderBooks(bookList) {

    const container = document.getElementById("bookContainer");

    container.innerHTML = "";

    bookList.forEach(book => {

        container.innerHTML += `

            <div class="book-card">

                <img src="${book.cover}" alt="${book.title}">

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

    });

}