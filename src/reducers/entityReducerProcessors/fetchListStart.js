export default (state, payload) => ({
  ...state,
  currentPage : payload.currentPage,
  pages : {
    ...state.pages,
    [payload.currentPage]: {
      loading : true,
      next    : null,
      previous: null,
      results : []
    }
  }
});