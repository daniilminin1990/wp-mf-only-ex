import {Link, Outlet} from "react-router-dom";

export const App = () => {
  return (
    <div data-testId = {'App'}>
      <h1>PAGE</h1>
      <Link to={'/about'}>ABOUT</Link>
      <br/>
      <Link to={'/shop/main'}>SHOP</Link>
      <br/>
      <Outlet />
    </div>
  );
};