import axios from "axios";
import { toast } from "react-toastify";

// you might be asked, why create a wrapper? why create this file? well, basically, its messy if i want to
// show error on every call. repetitive code... too! much! code!

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * Axios
 * GET Request
 *
 * @param url
 * @param callback
 * @param params
 */
export const get = (url, callback, params = null) => {
  axios.get(`${SERVER_BASE_URL}/${url}`, {params: params})
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      handleError(error)
    });
};

/**
 * Axios
 * Post Request
 *
 * @param url
 * @param data
 * @param callback
 */
export const post = (url, data, callback) => {
  axios.post(`${SERVER_BASE_URL}/${url}`, data)
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      handleError(error)
    });
}

/**
 * Handle all incoming errors
 *
 * @param error
 */
const handleError = (error) => {
  const status = error?.response?.status;
  let message = error?.response?.data?.message;
  let prepared_message = "";

  if (status === 400) {
    if (!Array.isArray(message)) {
      message = [message];
    }

    message.forEach((msg) => {
      prepared_message += `${msg}.\n`
    })
  }

  if (status === 404) {
    prepared_message = '404 occurred. Something seems to be broken!'
  }

  toast.error(prepared_message);
}