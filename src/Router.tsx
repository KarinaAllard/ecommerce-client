import { createBrowserRouter } from "react-router";
import { Admin } from "./pages/Admin";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { ProductDetails } from "./pages/ProductDetails";
import { Products } from "./pages/Products";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/admin",
				element: <Admin />,
			},
			{
				path: "/products",
				element: <Products />,
				children: [
					{
						path: "product/:id",
						element: <ProductDetails />,
					},
				],
			},
			{
				path: "/cart",
				element: <Cart />,
			},
		],
	},
]);
