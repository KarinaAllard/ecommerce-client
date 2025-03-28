import { useEffect, useState } from "react";
import { ProductCreate, ProductUpdate, IProduct } from "../types/IProduct";
import {
	createProduct,
	deleteProduct,
	fetchProducts,
	updateProduct,
} from "../services/productService";

export const useProducts = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchProductsHandler();
	}, []);

	const fetchProductsHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await fetchProducts();
			setProducts(data);
		} catch (error) {
			setError("Failed to fetch products.");
		} finally {
			setIsLoading(false);
		}
	};

	const createProductHandler = async (payload: ProductCreate) => {
		setIsLoading(true);

		try {
			const createdProduct = await createProduct(payload);
			const updatedProducts = [...products, createdProduct];
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			setProducts(updatedProducts);
		} catch (error) {
			setError("Failed to add product.");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const updateProductHandler = async (id: number, payload: ProductUpdate) => {
		setIsLoading(true);
		const existingProducts = products;

		try {
			const updatedProducts = products.map((product) =>
				product.id === id ? { ...product, ...payload } : product
			);
			localStorage.setItem("product", JSON.stringify(updatedProducts));
			setProducts(updatedProducts);
			await updateProduct(id, payload);
		} catch (error) {
			setError("Failed to update product.");
			rollBackProductChanges(existingProducts);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const deleteProductHandler = async (id: number) => {
		const existingProducts = products;

		try {
			const updatedProducts = products.filter((product) => product.id !== id);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			setProducts(updatedProducts);
			await deleteProduct(id);
		} catch (error) {
			setError("Failed to delete product");
			rollBackProductChanges(existingProducts);
			throw error;
		} finally {
		}
	};

	const rollBackProductChanges = (existingProducts: IProduct[]) => {
		localStorage.setItem("products", JSON.stringify(existingProducts));
		setProducts(existingProducts);
	};

	return {
		products,
		isLoading,
		error,
		createProductHandler,
		updateProductHandler,
		deleteProductHandler,
	};
};
