import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {Shop} from "@/pages/shop";

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/shop',
        element: <Suspense fallback={<h1>Loading shop...</h1>}><Shop /></Suspense>
      },
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes