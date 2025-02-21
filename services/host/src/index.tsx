import {createRoot} from "react-dom/client";
// import {App} from "../components/App";
import {App} from "@/components/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LazyAbout} from "@/pages/about/About.lazy";
import {Shop} from "@/pages/shop";
import {Suspense} from "react";

const root = document.getElementById('root')

if (!root){
  throw new Error('Root element not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <Suspense fallback={<h1>Loading about...</h1>}><LazyAbout /></Suspense>,
      },
      // Чуть позже вместо компонент тут будут микрофронты, целый магазин
      {
        path: '/shop',
        element: <Suspense fallback={<h1>Loading shop...</h1>}><Shop /></Suspense>
      },
    ]
  }
])

// container.render(<App />)
container.render(
  <RouterProvider router={router} />
)