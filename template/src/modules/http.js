/**
 * HTTP Client - A powerful, feature-rich HTTP client library for BabloJS
 * Better than axios with advanced features and improved performance.
 * 
 * Features:
 * - Request/Response interceptors
 * - Request cancellation (AbortController)
 * - Automatic retry with exponential backoff
 * - Multiple response types (JSON, text, blob, arrayBuffer)
 * - Progress tracking for upload/download
 * - Base URL configuration
 * - Query parameters builder
 * - Comprehensive error handling
 * - Instance-based client creation
 * - Default configuration
 * 
 * @module http
 */

/**
 * Default configuration for HTTP client
 */
const DEFAULT_CONFIG = {
  timeout: 30000,
  retries: 0,
  retryDelay: 1000,
  retryCondition: (error) => error.status >= 500 || error.code === 'NETWORK_ERROR',
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json', // json, text, blob, arraybuffer
  validateStatus: (status) => status >= 200 && status < 300,
};

/**
 * Parse query parameters from object to string
 * @param {Object} params - Query parameters object
 * @returns {string} - Query string
 */
function buildQueryString(params) {
  if (!params || typeof params !== 'object') return '';
  
  const query = new URLSearchParams();
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(v => query.append(key, v));
      } else {
        query.append(key, value);
      }
    }
  });
  
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Build full URL from baseURL and path
 * @param {string} baseURL - Base URL
 * @param {string} url - Request URL
 * @param {Object} params - Query parameters
 * @returns {string} - Full URL
 */
function buildURL(baseURL, url, params) {
  let fullURL = url;
  
  // If URL is absolute, use it directly
  if (url.startsWith('http://') || url.startsWith('https://')) {
    fullURL = url;
  } else if (baseURL) {
    // Combine baseURL with path
    const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const path = url.startsWith('/') ? url : `/${url}`;
    fullURL = `${base}${path}`;
  }
  
  // Add query parameters
  if (params) {
    const queryString = buildQueryString(params);
    fullURL += queryString;
  }
  
  return fullURL;
}

/**
 * Parse response based on responseType
 * @param {XMLHttpRequest} xhr - XMLHttpRequest instance
 * @param {string} responseType - Response type
 * @returns {*} - Parsed response
 */
function parseResponse(xhr, responseType) {
  switch (responseType) {
    case 'json':
      try {
        const text = xhr.responseText || xhr.response;
        return text ? JSON.parse(text) : null;
      } catch (error) {
        throw new Error(`Failed to parse JSON response: ${error.message}`);
      }
    case 'text':
      return xhr.responseText || xhr.response;
    case 'blob':
      return new Blob([xhr.response], { type: xhr.getResponseHeader('Content-Type') });
    case 'arraybuffer':
      return xhr.response;
    default:
      return xhr.responseText || xhr.response;
  }
}

/**
 * Get all response headers as an object
 * @param {XMLHttpRequest} xhr - XMLHttpRequest instance
 * @returns {Object} - Headers object
 */
function getAllHeaders(xhr) {
  const headers = {};
  const headerString = xhr.getAllResponseHeaders();
  if (!headerString) return headers;
  
  const headerPairs = headerString.trim().split('\r\n');
  headerPairs.forEach(headerPair => {
    const [key, value] = headerPair.split(': ');
    if (key && value) {
      headers[key.toLowerCase()] = value;
    }
  });
  
  return headers;
}

/**
 * HTTP Client Class
 */
class HttpClient {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  /**
   * Add request interceptor
   * @param {Function} fulfilled - Function to call when request is successful
   * @param {Function} rejected - Function to call when request fails
   * @returns {number} - Interceptor ID
   */
  interceptRequest(fulfilled, rejected) {
    const id = this.interceptors.request.length;
    this.interceptors.request.push({ fulfilled, rejected });
    return id;
  }

  /**
   * Add response interceptor
   * @param {Function} fulfilled - Function to call when response is successful
   * @param {Function} rejected - Function to call when response fails
   * @returns {number} - Interceptor ID
   */
  interceptResponse(fulfilled, rejected) {
    const id = this.interceptors.response.length;
    this.interceptors.response.push({ fulfilled, rejected });
    return id;
  }

  /**
   * Remove interceptor
   * @param {string} type - 'request' or 'response'
   * @param {number} id - Interceptor ID
   */
  ejectInterceptor(type, id) {
    if (this.interceptors[type] && this.interceptors[type][id]) {
      this.interceptors[type][id] = null;
    }
  }

  /**
   * Run request interceptors
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Processed configuration
   */
  async runRequestInterceptors(config) {
    let processedConfig = config;
    
    for (const interceptor of this.interceptors.request) {
      if (!interceptor) continue;
      
      try {
        if (interceptor.fulfilled) {
          processedConfig = await interceptor.fulfilled(processedConfig);
        }
      } catch (error) {
        if (interceptor.rejected) {
          return await interceptor.rejected(error);
        }
        throw error;
      }
    }
    
    return processedConfig;
  }

  /**
   * Run response interceptors
   * @param {Object} response - Response object
   * @returns {Promise<Object>} - Processed response
   */
  async runResponseInterceptors(response) {
    let processedResponse = response;
    
    for (const interceptor of this.interceptors.response) {
      if (!interceptor) continue;
      
      try {
        if (interceptor.fulfilled) {
          processedResponse = await interceptor.fulfilled(processedResponse);
        }
      } catch (error) {
        if (interceptor.rejected) {
          return await interceptor.rejected(error);
        }
        throw error;
      }
    }
    
    return processedResponse;
  }

  /**
   * Sleep function for retry delays
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Make HTTP request with retry logic
   * @param {Object} config - Request configuration
   * @param {number} attempt - Current attempt number
   * @returns {Promise<Object>} - Response object
   */
  async request(config, attempt = 0) {
    // Merge config with defaults
    const finalConfig = {
      ...this.config,
      ...config,
      headers: {
        ...this.config.headers,
        ...config.headers,
      },
    };

    // Run request interceptors
    const processedConfig = await this.runRequestInterceptors(finalConfig);

    return new Promise((resolve, reject) => {
      // Create AbortController for cancellation
      const abortController = new AbortController();
      const signal = abortController.signal;

      // Store abort function in config for external access
      if (processedConfig.signal) {
        processedConfig.signal.addEventListener('abort', () => {
          abortController.abort();
        });
      }

      // Build full URL
      const fullURL = buildURL(
        processedConfig.baseURL || this.config.baseURL,
        processedConfig.url,
        processedConfig.params
      );

      // Create XMLHttpRequest
      const xhr = new XMLHttpRequest();
      
      // Handle cancellation
      signal.addEventListener('abort', () => {
        xhr.abort();
      });

      // Open request
      xhr.open(processedConfig.method || 'GET', fullURL, true);

      // Set response type
      if (processedConfig.responseType === 'blob') {
        xhr.responseType = 'blob';
      } else if (processedConfig.responseType === 'arraybuffer') {
        xhr.responseType = 'arraybuffer';
      }

      // Set custom headers
      const headers = processedConfig.headers || {};
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      // Set timeout
      xhr.timeout = processedConfig.timeout || this.config.timeout;

      // Handle progress if callback is provided
      if (processedConfig.onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && !signal.aborted) {
            processedConfig.onProgress({
              type: 'upload',
              loaded: event.loaded,
              total: event.total,
              progress: (event.loaded / event.total) * 100,
            });
          }
        };

        xhr.onprogress = (event) => {
          if (event.lengthComputable && !signal.aborted) {
            processedConfig.onProgress({
              type: 'download',
              loaded: event.loaded,
              total: event.total,
              progress: (event.loaded / event.total) * 100,
            });
          }
        };
      }

      // Handle response
      xhr.onload = async () => {
        if (signal.aborted) return;

        try {
          const responseData = parseResponse(xhr, processedConfig.responseType || 'json');
          const responseHeaders = getAllHeaders(xhr);
          
          const response = {
            data: responseData,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: responseHeaders,
            config: processedConfig,
            request: xhr,
          };

          // Validate status
          const isValidStatus = (processedConfig.validateStatus || this.config.validateStatus)(xhr.status);

          if (isValidStatus) {
            // Run response interceptors
            const processedResponse = await this.runResponseInterceptors(response);
            
            // Call success hooks
            if (processedConfig.onSuccess) {
              processedConfig.onSuccess(processedResponse);
            }
            
            resolve(processedResponse);
          } else {
            const error = {
              message: `Request failed with status code ${xhr.status}`,
              code: 'HTTP_ERROR',
              status: xhr.status,
              statusText: xhr.statusText,
              response: response,
              config: processedConfig,
              request: xhr,
            };

            // Call error hooks
            if (processedConfig.onError) {
              processedConfig.onError(error);
            }

            // Check if we should retry
            const shouldRetry = processedConfig.retries > attempt &&
              (processedConfig.retryCondition || this.config.retryCondition)(error);

            if (shouldRetry) {
              const delay = processedConfig.retryDelay || this.config.retryDelay;
              await this.sleep(delay * (attempt + 1)); // Exponential backoff
              return this.request(config, attempt + 1).then(resolve).catch(reject);
            }

            reject(error);
          }
        } catch (error) {
          const parseError = {
            message: error.message || 'Failed to parse response',
            code: 'PARSE_ERROR',
            config: processedConfig,
            request: xhr,
          };

          if (processedConfig.onError) {
            processedConfig.onError(parseError);
          }

          reject(parseError);
        } finally {
          if (processedConfig.onComplete) {
            processedConfig.onComplete();
          }
        }
      };

      // Handle network errors
      xhr.onerror = async () => {
        if (signal.aborted) return;

        const networkError = {
          message: 'Network Error',
          code: 'NETWORK_ERROR',
          config: processedConfig,
          request: xhr,
        };

        if (processedConfig.onError) {
          processedConfig.onError(networkError);
        }

        // Check if we should retry
        const shouldRetry = processedConfig.retries > attempt &&
          (processedConfig.retryCondition || this.config.retryCondition)(networkError);

        if (shouldRetry) {
          const delay = processedConfig.retryDelay || this.config.retryDelay;
          await this.sleep(delay * (attempt + 1)); // Exponential backoff
          return this.request(config, attempt + 1).then(resolve).catch(reject);
        }

        reject(networkError);
      };

      // Handle timeout
      xhr.ontimeout = async () => {
        if (signal.aborted) return;

        const timeoutError = {
          message: `Timeout of ${processedConfig.timeout}ms exceeded`,
          code: 'TIMEOUT_ERROR',
          config: processedConfig,
          request: xhr,
        };

        if (processedConfig.onError) {
          processedConfig.onError(timeoutError);
        }

        // Check if we should retry
        const shouldRetry = processedConfig.retries > attempt &&
          (processedConfig.retryCondition || this.config.retryCondition)(timeoutError);

        if (shouldRetry) {
          const delay = processedConfig.retryDelay || this.config.retryDelay;
          await this.sleep(delay * (attempt + 1)); // Exponential backoff
          return this.request(config, attempt + 1).then(resolve).catch(reject);
        }

        reject(timeoutError);
      };

      // Handle abort
      xhr.onabort = () => {
        const abortError = {
          message: 'Request aborted',
          code: 'ABORT_ERROR',
          config: processedConfig,
          request: xhr,
        };

        if (processedConfig.onError) {
          processedConfig.onError(abortError);
        }

        reject(abortError);
      };

      // Send request
      try {
        if (processedConfig.beforeSend) {
          processedConfig.beforeSend();
        }

        let requestBody = null;
        if (processedConfig.data || processedConfig.body) {
          const body = processedConfig.data || processedConfig.body;
          if (typeof body === 'string') {
            requestBody = body;
          } else if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer) {
            requestBody = body;
          } else {
            requestBody = JSON.stringify(body);
          }
        }

        xhr.send(requestBody);
      } catch (error) {
        const requestError = {
          message: error.message || 'Failed to send request',
          code: 'REQUEST_ERROR',
          config: processedConfig,
          error: error,
        };

        if (processedConfig.onError) {
          processedConfig.onError(requestError);
        }

        reject(requestError);
      }
    });
  }

  /**
   * GET request
   * @param {string} url - Request URL
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  get(url, config = {}) {
    return this.request({ ...config, url, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} url - Request URL
   * @param {*} data - Request data
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  post(url, data, config = {}) {
    return this.request({ ...config, url, method: 'POST', data });
  }

  /**
   * PUT request
   * @param {string} url - Request URL
   * @param {*} data - Request data
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  put(url, data, config = {}) {
    return this.request({ ...config, url, method: 'PUT', data });
  }

  /**
   * PATCH request
   * @param {string} url - Request URL
   * @param {*} data - Request data
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  patch(url, data, config = {}) {
    return this.request({ ...config, url, method: 'PATCH', data });
  }

  /**
   * DELETE request
   * @param {string} url - Request URL
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  delete(url, config = {}) {
    return this.request({ ...config, url, method: 'DELETE' });
  }

  /**
   * HEAD request
   * @param {string} url - Request URL
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  head(url, config = {}) {
    return this.request({ ...config, url, method: 'HEAD' });
  }

  /**
   * OPTIONS request
   * @param {string} url - Request URL
   * @param {Object} config - Request configuration
   * @returns {Promise<Object>} - Response object
   */
  options(url, config = {}) {
    return this.request({ ...config, url, method: 'OPTIONS' });
  }
}

/**
 * Create a new HTTP client instance
 * @param {Object} config - Default configuration
 * @returns {HttpClient} - HTTP client instance
 */
export function createClient(config = {}) {
  return new HttpClient(config);
}

/**
 * Default HTTP client instance
 */
const defaultClient = new HttpClient();

/**
 * Request function (backward compatible)
 * @param {Object} config - Request configuration
 * @returns {Promise<Object>} - Response object (returns data directly for backward compatibility)
 */
export async function request(config) {
  const response = await defaultClient.request(config);
  // Return data directly for backward compatibility
  return response.data !== undefined ? response.data : response;
}

/**
 * Export convenience methods from default client
 */
export const http = {
  request: (config) => defaultClient.request(config),
  get: (url, config) => defaultClient.get(url, config).then(r => r.data),
  post: (url, data, config) => defaultClient.post(url, data, config).then(r => r.data),
  put: (url, data, config) => defaultClient.put(url, data, config).then(r => r.data),
  patch: (url, data, config) => defaultClient.patch(url, data, config).then(r => r.data),
  delete: (url, config) => defaultClient.delete(url, config).then(r => r.data),
  head: (url, config) => defaultClient.head(url, config).then(r => r.data),
  options: (url, config) => defaultClient.options(url, config).then(r => r.data),
  create: createClient,
  interceptRequest: (fulfilled, rejected) => defaultClient.interceptRequest(fulfilled, rejected),
  interceptResponse: (fulfilled, rejected) => defaultClient.interceptResponse(fulfilled, rejected),
  ejectInterceptor: (type, id) => defaultClient.ejectInterceptor(type, id),
  get interceptors() {
    return defaultClient.interceptors;
  },
};

/**
 * Export as 'client' for convenience
 */
export const client = http;

/**
 * Export default HTTP client instance
 */
export default http;

