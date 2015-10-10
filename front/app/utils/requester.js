
import Qwest from 'qwest/src/qwest';
import { apiAddress } from 'helpers';

Qwest.base = apiAddress;

export function MergeObjects(...objects) {
  let result = {};
  for (const current of objects) {
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        if (typeof current[key] === "object" && typeof result[key] === "object") {
          result[key] = MergeObjects(result[key], current[key]);
        }
        else {
          result[key] = current[key];
        }
      }
    }
  }
  return result;
};

/**
 * Get base options for any request
 * @return {[type]} [description]
 */
function getOptions(opts = false) {
  let options = {};

  if (opts && opts.dataType == 'formdata') {
    options.dataType = 'formdata';
    options.headers = {};
  }
  else {
    options.dataType = 'json';
    options.headers = {
      'Content-Type': 'application/json'
    };
  }

  const token = localStorage.getItem('jwtoken');

  if (token) {
    options.headers.Authorization = token;
  }

  if (opts) {
    options = MergeObjects(options, opts);
  }
  return options;
}


/**
 * Catch all HTTP errors
 * @param  {} err
 * @param  {[type]} response
 */
function catchErrors(reject) {
  return (err, response) => {
    const errCode = Number(err.split(' ').first);

    // Catch invalid token
    if (errCode == 401 && response.error == 'Authorization token invalid') {
      localStorage.removeItem('jwtoken');
      return window.location.reload();
    }

    // Catch forbidden
    if (errCode === 403) {
      return Alert('request_ForbiddenError');
    }


    // ONLY IF WE WANT PASS ERROR-TEXT TO ACTIONS
    reject(err, response);
  };
}


export function transparentGet(url, data = {}, options = {}) {
  let pairs = [];

  for (const key in data) {
    pairs.push(`${key}=${data[key]}`);
  }

  options.dataType = 'formdata';
  return Qwest.get(url, pairs.join('&'), getOptions(options));
}


/**
 * Send GET request
 * @param  {String} url
 * @param  {Object} data What data is send
 * @param  {Object} options Override options from Qwest
 * @return {Promise}
 */
export function get(url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    transparentGet(url, data, options).then(resolve).catch(catchErrors(reject));
  });
}


/**
 * Send GET request
 * @param  {String} url
 * @param  {Object} data What data is send
 * @param  {Object} options Override options from Qwest
 * @return {Promise}
 */
export function post(url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    Qwest.post(url, data, getOptions(options)).then(resolve).catch(catchErrors(reject));
  });
}


/**
 * Send PUT request
 * @param  {String} url
 * @param  {Object} data What data is send
 * @param  {Object} options Override options from Qwest
 * @return {Promise}
 */
export function put(url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    Qwest.put(url, data, getOptions(options)).then(resolve).catch(catchErrors(reject));
  });
}


/**
 * Send DELETE request
 * @param  {String} url
 * @param  {Object} data What data is send
 * @param  {Object} options Override options from Qwest
 * @return {Promise}
 */
export function destroy(url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    Qwest['delete'](url, data, getOptions(options)).then(resolve).catch(catchErrors(reject));
  });
}

module.exports.delete = destroy;


export default module.exports;
