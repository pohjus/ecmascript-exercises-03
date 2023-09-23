/**
 * Initiates an asynchronous calculation and returns a promise.
 *
 * @format
 * @param {number} a - Numerator
 * @param {number} b - Denominator
 * @returns {Promise<number>} A promise that resolves with the result of the division or rejects with an error.
 */

const makeCalculation = (a, b) => {
  const asynFunc = (resolve, reject) => {
    if (b === 0) {
      reject("cannot divide with zero.");
    } else {
      setTimeout(() => {
        console.log("calculating stuff");
        const division = a / b;
        resolve(division);
      }, 1000);
    }
  };
  return new Promise(asynFunc);
};

/**
 * Sends a result to the backend asynchronously.
 * @param {number} result - The result to send to the backend.
 * @returns {Promise<string>} A promise that resolves with a confirmation message or rejects with an error.
 */
const sendStuffToBackend = (result) => {
  const asynFunc = (resolve, reject) => {
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      reject("failed to connect to backend.");
    } else {
      setTimeout(() => {
        console.log(`sending to backend ${result}`);
        resolve("done");
      }, 1000);
    }
  };
  return new Promise(asynFunc);
};

/**
 * Main function to initiate calculation, send result to backend, and handle errors.
 */
const main = () => {
  makeCalculation(10, 5)
    .then((division) => sendStuffToBackend(division))
    .then((msg) => console.log(msg))
    .catch((errormsg) => console.log(errormsg));
};

// Call the main function
main();
