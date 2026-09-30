import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes();
export {
  routeTree
};
