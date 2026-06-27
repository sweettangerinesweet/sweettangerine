// ===============================
// Sweet Tangerine API
// ===============================

const API_URL = "https://script.google.com/macros/s/AKfycbybMjThAG4_rGj0Z7jOHHiFqs1hgWT0qnGUjEsBMAQIM6ls6LKjv_RBOzb1eGwageRY/exec";

async function getBooks() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const books = await response.json();

        return books;

    } catch (error) {

        console.error("API Error:", error);

        return [];

    }

}