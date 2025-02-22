import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {LazyAbout} from "@/pages/about/About.lazy";

const routes = [
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: '/admin/about',
        element: <Suspense fallback={<h1>Loading about...</h1>}><LazyAbout /></Suspense>,
      },
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes