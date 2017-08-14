import feedcast from 'feedcast-client';

export const CATEGORIES_REQUESTED = 'CATEGORIES_REQUESTED';
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS';
export const CATEGORIES_FETCH_FAIL = 'CATEGORIES_FETCH_FAIL';

export const CATEGORIES_INFO_REQUESTED = 'CATEGORIES_INFO_REQUESTED';
export const CATEGORIES_INFO_FETCH_SUCCESS = 'CATEGORIES_INFO_FETCH_SUCCESS';

export function asyncFetchCategories(params) {
  if (params.slug) {
    return feedcast.getEpisodesByCategory(params)
  }

  return feedcast.getCategories(params);
}

export function requestCategories({ page, perPage }) {
  return {
    type: CATEGORIES_REQUESTED,
    payload: { page, per_page: perPage }
  };
}

export function requestCategoryInfo(slug) {
  return {
    type: CATEGORIES_INFO_REQUESTED,
    payload: { page:1, per_page: 100, slug: slug }
  };
}

export function requestChannelInfoSuccess(data) {
  return {
    type: CATEGORIES_INFO_FETCH_SUCCESS,
    payload: data,
  };
}

export function requestCategoriesSuccess(data) {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload: data,
  };
}

export function requestCategoriesFail(error) {
  return {
    type: CATEGORIES_FETCH_FAIL,
    payload: {error},
  };
}
