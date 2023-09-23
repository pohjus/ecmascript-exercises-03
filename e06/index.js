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
 * @returns {Promise<string>} A promise that resolves with a confirmation message.
 */
const sendStuffToBackend = (result) => {
  const asynFunc = (resolve) => {
    setTimeout(() => {
      console.log(`sending to backend ${result}`);
      resolve("done");
    }, 1000);
  };
  return new Promise(asynFunc);
};

/**
 * Makes a calculation, sends the result to the backend, and returns a message.
 * @returns {Promise<string>} A promise that resolves with a message indicating the operation is complete.
 */
const makeCalculationAndSendStuffToBackend = async () => {
  const result = await makeCalculation(10, 2);
  const msg = await sendStuffToBackend(result);
  return msg;
};

/**
 * Main function to perform calculations and send results to the backend.
 */
const main = () => {
  makeCalculationAndSendStuffToBackend().then((msg) => console.log(msg));
};

// Call the main function
main();
