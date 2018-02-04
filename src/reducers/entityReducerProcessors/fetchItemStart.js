export default (state, payload) => ({
  ...state,
  raw_items: {
    ...state.raw_items,
    [payload.url]: {}
  }
});