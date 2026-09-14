/**

 * Axios-like error shape used by API helpers and list UI.

 *

 * @typedef {Object} ApiErrorInput

 * @property {{ status?: number, data?: unknown }} [response]

 * @property {string} [message]

 * @property {string} [code]

 * @property {unknown} [request]

 */



/**

 * @typedef {Object} PaginatedListResponse

 * @property {number} [total]

 * @property {number} [count]

 */



/**

 * Options for {@link import('lib/getQueryParams').buildListQueryParams}.

 *

 * @typedef {Object} ListQueryParams

 * @property {number} [page]

 * @property {number} [pageSize]

 * @property {string} [search]

 * @property {boolean | null} [isActive]

 * @property {'search' | 'search_str'} [searchWireKey]

 */



export {};

