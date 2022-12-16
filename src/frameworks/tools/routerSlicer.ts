export const routerSlicer = {
  getRoute() {
    return window.location.hash.slice(1);
  },
};
