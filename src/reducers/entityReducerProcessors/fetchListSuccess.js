export default (state, payload) => ({
  ...state,
  pages   : {
    ...state.pages,
    [payload.currentPage]: {
      loading : false,
      next    : payload.next,
      previous: payload.previous,
      results : payload.results
    }
  },
  raw_items: {
    ...state.raw_items,
    ...payload.results.reduce((result, current) => ({
      ...result,
      [current.url]: current
    }), {})
  }
});