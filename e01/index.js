/**
 * Initiates an asynchronous calculation and returns a promise.
 *
 * @format
 * @returns {Promise<number>} A promise that resolves with the result of the calculation.
 */

const makeCalculation = () => {
  const asynFunc = (resolve, reject) => {
    setTimeout(() => {
      console.log("calculating stuff");
      const division = 5 / 5;
      resolve(division);
    }, 1000);
  };
  return new Promise(asynFunc);
};

/**
 * Sends a result to the backend asynchronously.
 * @param {number} result - The result to send to the backend.
 * @returns {Promise<string>} A promise that resolves with a confirmation message.
 */
const sendStuffToBackend = (result) => {
  const asynFunc = (resolve, reject) => {
    setTimeout(() => {
      console.log(`sending to backend ${result}`);
      resolve("done");
    }, 1000);
  };
  return new Promise(asynFunc);
};

/**
 * Main function to initiate calculation and send result to backend.
 */
const main = () => {
  makeCalculation()
    .then((sum) => sendStuffToBackend(sum))
    .then((msg) => console.log(msg));
};

// Call the main function
main();
