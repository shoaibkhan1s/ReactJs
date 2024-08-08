import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./components/Product";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>

        <Route path="/cart" element={<Cart />}></Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
