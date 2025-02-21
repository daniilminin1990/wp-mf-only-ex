import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "@/router/Router";

const root = document.getElementById('root')

if (!root){
  throw new Error('Root element not found')
}

const container = createRoot(root)

// ВОТ ЭТО ВЫРЕЗАЛИ И ВСТАВИЛИ В ROUTER
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/shop',
//         element: <Suspense fallback={<h1>Loading shop...</h1>}><Shop /></Suspense>
//       },
//     ]
//   }
// ])

// container.render(<App />)
container.render(
  <RouterProvider router={router} />
)