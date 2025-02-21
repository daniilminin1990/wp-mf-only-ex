import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
//@ts-ignore
import shopRoutes from "shop/Router"; // Для импорта пишем название модуля, затем имя, которое хотим импортировать (как было в модуле shop -- name: shop, и жкспортируемый модуль Router
//@ts-ignore
import adminRoutes from "admin/Router";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...shopRoutes,
      ...adminRoutes
    ]
  }
])