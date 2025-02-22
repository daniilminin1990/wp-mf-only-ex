import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {Shop} from "@/pages/shop";
import {UserCard} from "@packages/shared/src/components/UserCard";

const routes = [
  {
    path: '/shop', // Меняем путь корневого роута с '/' на '/shop'
    element: <App />,
    children: [
      {
        path: '/shop/main', // А тут например с '/shop' на 'shop/main'
        element: <Suspense fallback={<h1>Loading shop...</h1>}><Shop /></Suspense>
      },
      {
        path: '/shop/second', // Допустим еще один роут
        element: <Suspense fallback={<h1>Loading shop...</h1>}>
          <div style={{color: 'red'}}>
            <UserCard username={"САНЯ from SHOP"} />
          </div>
        </Suspense>
      },
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes