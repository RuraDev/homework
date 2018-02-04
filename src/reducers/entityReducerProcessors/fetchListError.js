export default (state, payload) => ({
  ...state,
  pages: {
    ...state.pages,
    [payload.currentPage]: {
      loading : false,
      error   : payload.error
    }
  }
});