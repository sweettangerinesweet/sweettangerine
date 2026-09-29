const API_URL = "./data/books.json";

async function getBooks() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const books = await response.json();

        console.log("Books loaded:", books.length);

        return books;

    } catch (error) {

        console.error("Failed to load books:", error);

        return [];

    }

}