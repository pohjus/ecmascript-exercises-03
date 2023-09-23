/** @format */

const fs = require("fs");
const readlineSync = require("readline-sync");

/**
 * This function is provided as a callback to fs.readFile
 * @param {Error|null} err - Error object if an error occurred, null otherwise.
 * @param {string} data - File content in UTF-8 format.
 */
const showContent = (err, data) => {
  if (err) {
    console.log(`file ${file} does not exist.`);
  } else {
    try {
      const jsonObj = JSON.parse(data);
      const property = "name";
      if (property in jsonObj) {
        console.log(jsonObj.name);
      } else {
        console.log(`file ${file} contains json but not property ${property}`);
      }
    } catch (error) {
      console.log(`file ${file} does not contain json`);
    }
  }
};

/**
 * Main function to read a file and show its content.
 */
const main = () => {
  const file = readlineSync.question("Give file name: ");
  fs.readFile(file, "utf8", showContent);
};

// Call the main function
main();
