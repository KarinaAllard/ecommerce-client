import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Cart } from "./pages/shop/Cart";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { ProductDetails } from "./pages/shop/ProductDetails";
import { Products } from "./pages/shop/Products";
import { CreateCustomer } from "./pages/admin/CreateCustomer";
import { CreateProduct } from "./pages/admin/CreateProduct";
import { ManageCustomers } from "./pages/admin/ManageCustomers";
import { ManageOrders } from "./pages/admin/ManageOrders";
import { ManageProducts } from "./pages/admin/ManageProducts";
import { UpdateCustomer } from "./pages/admin/UpdateCustomer";
import { UpdateOrder } from "./pages/admin/UpdateOrder";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { OrderDetails } from "./pages/admin/OrderDetails";
import { CartProvider } from "./context/CartContext";
import { Checkout } from "./pages/shop/Checkout";
import { OrderConfirmation } from "./pages/shop/OrderConfirmation";

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
				element: <AdminLayout />,
				children: [
					{
						path: "manage-customers",
						element: <ManageCustomers />,
					},
					{
						path: "create-customer",
						element: <CreateCustomer />,
					},
					{
						path: "update-customer/:id",
						element: <UpdateCustomer />,
					},
					{
						path: "manage-products",
						element: <ManageProducts />,
					},
					{
						path: "create-product",
						element: <CreateProduct />,
					},
					{
						path: "update-product/:id",
						element: <UpdateProduct />,
					},
					{
						path: "manage-orders",
						element: <ManageOrders />,
					},
					{
						path: "order-details/:id",
						element: <OrderDetails />,
					},
					{
						path: "update-order/:id",
						element: <UpdateOrder />,
					},
				],
			},
			{
				path: "/products",
				element: (
					<CartProvider>
						<Products />
					</CartProvider>
				),
			},
			{
				path: "product/:id",
				element: (
					<CartProvider>
						<ProductDetails />
					</CartProvider>
				),
			},
			{
				path: "/cart",
				element: (
				<CartProvider>
					<Cart />
				</CartProvider>
				),
			},
			{
				path: "/checkout",
				element: (
				<CartProvider>
					<Checkout />
				</CartProvider>
				),
			},
			{
				path: "/order-confirmation",
				element: (
				<CartProvider>
					<OrderConfirmation />
				</CartProvider>
				),
			},
		],
	},
]);
