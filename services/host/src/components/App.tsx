import {Link, Outlet} from "react-router-dom";
import {adminRoutes} from "@packages/shared/src/routes/admin"
import {shopRoutes} from "@packages/shared/src/routes/shop"

export const App = () => {
  return (
    <div data-testId = {'App'}>
      <h1>PAGE</h1>
      {/*<Link to={'/about'}>ABOUT</Link>*/}
      <Link to={adminRoutes.about}>ABOUT</Link>
      <br/>
      {/*<Link to={'/shop/main'}>SHOP</Link>*/}
      <Link to={shopRoutes.main}>SHOP</Link>
      <br/>
      <Outlet />
    </div>
  );
};