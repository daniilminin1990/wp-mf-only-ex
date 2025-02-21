import {Link, Outlet} from "react-router-dom";

export const App = () => {
  return (
    <div>
      <h1>SHOP MODULE</h1>
      <h3>Я красавчик!</h3>
      <h3>Я красавчик!</h3>
      <h3>Я красавчик!</h3>
      <h3>Я красавчик!</h3>
      {/*Линки у нас будут в хостовом приложении*/}
      {/*<Link to={'/about'}>ABOUT</Link>*/}
      {/*<br/>*/}
      {/*<Link to={'/shop'}>SHOP</Link>*/}
      {/*<br/>*/}
      <Outlet />
    </div>
  );
};