const API_URL = "https://script.google.com/macros/s/AKfycbybMjThAG4_rGj0Z7jOHHiFqs1hgWT0qnGUjEsBMAQIM6ls6LKjv_RBOzb1eGwageRY/exec";

async function getBooks() {

    try {

        const response = await fetch(
            API_URL + "?t=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        const books = await response.json();

        console.log("Books:", books.length);

        return books;

    } catch (error) {

        console.error(error);

        return [];

    }

}