/** @format */

const fs = require("fs");
const readlineSync = require("readline-sync");
const util = require("util");
const readFile = util.promisify(fs.readFile);

/**
 * Parses JSON data and returns the 'name' property.
 * @param {string} data - The JSON data to parse.
 * @returns {Promise<string>} A promise that resolves with the 'name' property or rejects with an error message.
 */
const parseJson = (data) => {
  const func = (resolve, reject) => {
    const jsonObj = JSON.parse(data);
    const property = "name";
    if (property in jsonObj) {
      resolve(jsonObj.name);
    } else {
      reject(`file contains json but not property ${property}`);
    }
  };
  return new Promise(func);
};

/**
 * Main function to read a file, parse its JSON content, and display the 'name' property.
 */
const main = () => {
  const file = readlineSync.question("Give file name: ");
  readFile(file, "utf-8")
    .then(parseJson)
    .then((data) => console.log(data))
    .catch((msg) => console.log(msg));
};

// Call the main function
main();
