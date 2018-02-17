import axios from './axios';

/**
 * Send GET request to project API
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data converts to URI: ?key=value&foo=bar
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function get(url, data = {}, options = {}) {
  return axios.get(url, { params: data, ...options });
}

/**
 * Send POST request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function post(url, data = {}, options = {}) {
  return axios.post(url, data, options);
}

/**
 * Send PUT request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function put(url, data = {}, options = {}) {
  return axios.put(url, data, options);
}

/**
 * Send PATCH request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function patch(url, data = {}, options = {}) {
  return axios.patch(url, data, options);
}

/**
 * Send DELETE request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function destroy(url, data = {}, options = {}) {
  return axios.delete(url, data, options);
}
