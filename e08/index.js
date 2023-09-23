/** @format */

const rs = require("readline-sync");

/**
 * Fetches JSON data from a given URL.
 * @param {string} url - The URL to fetch the JSON data from.
 * @returns {Promise<Object>} A promise that resolves with the fetched JSON data or rejects with an error.
 * @throws {Error} Throws an error if fetching fails or parsing fails.
 */
const fetchIt = async (url) => {
  try {
    // Perform the fetch operation for the given URL
    const hr = await fetch(url);

    // Check if the fetch operation was successful
    if (!hr.ok) {
      throw new Error(`HTTP error! Status: ${hr.status}`);
    }

    // Parse and return the JSON data from the fetch response
    const jsonData = await hr.json();
    return jsonData;
  } catch (error) {
    // Throw a new error in case fetching or parsing fails
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

/**
 * Fetches the details of a character by their ID.
 * @param {string} personUrl - The URL for the character.
 * @returns {Promise<string>} - The title of the first movie of the character.
 * @throws {Error} Throws an error if fetching fails or data is incomplete.
 */
const fetchTitle = async (personUrl) => {
  try {
    const jsonPerson = await fetchIt(personUrl);

    // Overkill checking
    if (!jsonPerson.films || jsonPerson.films.length === 0) {
      throw new Error("No films available for this character");
    }

    const jsonFilm = await fetchIt(jsonPerson.films[0]);

    if (!jsonFilm.title) {
      throw new Error("Film has no title");
    }

    return jsonFilm.title;
  } catch (error) {
    throw new Error(`Failed to fetch title: ${error.message}`);
  }
};

/**
 * Prompts user for ID and fetches title based on it.
 * @returns {Promise<void>}
 */
const main = async () => {
  try {
    // Validate and get ID from user
    let id = rs.question("Give ID: ").trim();
    if (!id || isNaN(id)) {
      throw new Error("Invalid ID.");
    }

    // Construct the URL
    const url = `http://swapi.dev/api/people/${id}`;

    // Fetch and display title
    const title = await fetchTitle(url);
    if (!title) {
      throw new Error("Title not found.");
    }
    console.log(title);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

main();
