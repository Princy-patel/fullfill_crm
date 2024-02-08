const reducer = function (state, action) {
  if (action.type === "SET_DATA") {
    return {
      ...state,
      data: action.payload,
    };
  }

  if (action.type === "SET_TOTAL_DATA") {
    return {
      ...state,
      totalData: action.payload,
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (action.type === "SET_PAGE_NO") {
    return {
      ...state,
      pageNo: action.payload,
    };
  }

  if (action.type === "SET_PER_PAGE") {
    return {
      ...state,
      perPage: action.payload,
    };
  }

  if (action.type === "SEARCH_DATA") {
    return {
      ...state,
      searchInput: action.payload,
      pageNo: 1,
    };
  }
};

export default reducer;
