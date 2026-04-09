const { httpGet } = require('./mock-http-interface');

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses into an internal object format.
 *
 * @param {string[]} urls The urls to be requested
 * @return {Promise} A promise which resolves to a results array.
 *
 * An example results array:
 *
 * [
 *   { 'Arnie Quote': 'Some cool quote' },
 *   { 'FAILURE': 'Your request has been terminated' },
 * ]
 **/
const getArnieQuotes = async (urls) => {
  // No `try...catch` needed since httpGet already hides the error.
  // I assume it is a wrapper owned by us and trust its implementation without further information.
  const arnieQuoteResponses = await Promise.all(urls.map(httpGet));
  return arnieQuoteResponses.map(reps => {
    const { message } = JSON.parse(reps.body);
    // It may need more sophisticated status handling for production, but for now httpGet wrapped
    // the status of success result to exact 200
    return reps.status === 200
      ? { "Arnie Quote": message }
      : { "FAILURE": message };
  });
};

module.exports = {
  getArnieQuotes,
};
