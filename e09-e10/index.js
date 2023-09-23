/** @format */

// Base URL for the SWAPI API.
const SWAPI_BASE_URL = "http://swapi.dev/api";

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
 * Fetch movie titles of a person by their ID from the SWAPI API.
 *
 * @param {number} id - The ID of the person.
 * @returns {Object} - An object containing the name of the person and their movie titles.
 */
async function fetchAllTitles(id) {
  try {
    // Construct the URL to fetch data for the specific person.
    const url = `${SWAPI_BASE_URL}/people/${id}`;

    // Fetch the person's data from SWAPI.
    const person = await fetchIt(url);

    // Fetch data for each film concurrently.
    const moviesInJson = await Promise.all(
      person.films.map((url) => fetchIt(url))
    );

    // Extract the title from each movie's data.
    const titles = moviesInJson.map((movie) => movie.title);

    // Return the person's name and their list of movie titles.
    return { name: person.name, movies: titles };
  } catch (error) {
    // Log any errors that occurred during fetching and return null.
    console.error(`Error fetching titles for ID ${id}: ${error.message}`);
    return null;
  }
}

/**
 * Validates that an array contains only unique integers greater than 0.
 *
 * @param {number[]} inputArray - The array to validate.
 * @returns {boolean} - Returns true if all conditions are met, otherwise false.
 */
const isValidInput = (inputArray) => {
  // Create a new Set to store unique integers.
  const uniqueSet = new Set();

  // Loop through each number in the input array.
  for (let num of inputArray) {
    // Check if the number is not a number, less than or equal to 0, or already exists in the Set.
    if (isNaN(num) || num <= 0 || uniqueSet.has(num)) {
      return false;
    }
    // Add the number to the Set, confirming it as unique.
    uniqueSet.add(num);
  }

  // All checks passed, return true.
  return true;
};

/**
 * Entry point of the program. Fetches movie titles for characters based on user input.
 *
 * - Extracts command line arguments and converts them to numbers.
 * - Validates the input to ensure they are unique integers greater than 0.
 * - Initiates fetching movie titles for each valid ID.
 * - Logs the result or errors if any occur.
 *
 * @async
 */
const main = async () => {
  try {
    // get user input, turn it into numbers
    // .map(Number) => .map((element) => Number(element))
    // If not number, array will contain NaN
    let ids = process.argv.slice(2).map(Number);

    if (!isValidInput(ids)) {
      console.log("give valid input");
      return;
    }

    // changes id array to a promise array
    const promiseArr = ids.map((id) => fetchAllTitles(id));

    // Do all the promises at the same time and return the data in an array
    const dataArr = await Promise.all(promiseArr);
    console.log(dataArr);
  } catch (error) {
    // Log any errors that occur during the entire process.
    console.error(`Failed to fetch data: ${error.message}`);
  }
};

main();
