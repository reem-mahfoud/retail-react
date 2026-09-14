/** @typedef {import('types/common').QueryParams} QueryParams */

/** @typedef {import('types/api').ListQueryParams} ListQueryParams */



/** @param {string} [search] @param {'search' | 'search_str'} wireKey @returns {QueryParams} */

export function searchQueryParam(search, wireKey = 'search') {

  const q = search?.trim();

  if (!q) return {};

  return { [wireKey]: q };

}



/** @param {number} [page] @param {number} [pageSize] @returns {QueryParams} */

export function paginationQueryParams(page = 1, pageSize = 10) {

  return { page, page_size: pageSize };

}



/** @param {boolean | null | undefined} isActive @returns {QueryParams} */

export function isActiveQueryParam(isActive) {

  if (isActive == null) return {};

  return { is_active: isActive };

}



/** @param {number | string | null | undefined} branchId @returns {QueryParams} */

export function branchIdQueryParam(branchId) {

  if (branchId == null || branchId === '' || branchId === 'all') return {};

  return { branch_id: branchId };

}



/** @param {number | string | null | undefined} departmentId @returns {QueryParams} */

export function departmentIdQueryParam(departmentId) {

  if (departmentId == null || departmentId === '' || departmentId === 'all') return {};

  return { department_id: departmentId };

}



/** @param {string} [dateStr] ISO date `YYYY-MM-DD` @returns {QueryParams} */

export function dateStrQueryParam(dateStr) {

  const d = dateStr?.trim();

  if (!d) return {};

  return { date_str: d };

}



/** @param {string} [granularity] maps to API `granularity` (alias of `period` on some endpoints) @returns {QueryParams} */

export function granularityQueryParam(granularity) {

  const g = granularity?.trim();

  if (!g) return {};

  return { granularity: g };

}



/**

 * Common list-endpoint query params (pagination + optional search + active filter).

 * @param {ListQueryParams} [options]

 * @returns {QueryParams}

 */

export function buildListQueryParams({

  page = 1,

  pageSize = 10,

  search,

  isActive,

  searchWireKey = 'search',

} = {}) {

  return {

    ...paginationQueryParams(page, pageSize),

    ...isActiveQueryParam(isActive),

    ...searchQueryParam(search, searchWireKey),

  };

}

