import * as actions from 'app/actions/categories';

const initialState = {
  slug: '',
  categories: [],
  page: 1,
  per_page: 30,
  total: 0,
  isFetching: false,
}

export default function categories(state=initialState, action) {
  switch (action.type) {
    case actions.CATEGORIES_REQUESTED:
      return {
        ...state,
        isFetching: true,
        page: action.payload.page,
      };

    case actions.CATEGORIES_INFO_REQUESTED:
      return {
        ...state,
        isFetching: true,
        slug: action.payload.slug,
        page: action.payload.page,
      };

    case actions.CATEGORIES_FETCH_SUCCESS:
      let { categories, total } = action.payload;
      return {
        ...state,
        isFetching: false,
        categories: categories,
        total: parseInt(total || categories.length),
      };

    case actions.CATEGORIES_INFO_FETCH_SUCCESS:
      const channel = action.payload;
      return {
        ...state,
        isFetching: false,
        categories: [ channel ], // Shame, its should has its own reducer for channel info
      };

    default:
      return state;
  }
}
