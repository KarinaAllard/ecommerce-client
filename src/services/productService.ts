import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { IProduct, ProductCreate, ProductUpdate } from "../types/IProduct";

export const fetchProducts = async (): Promise<IProduct[]> => {
    return await handleRequest(axios.get(`${API_URL}/products`));
}

export const createProduct = async (payload: ProductCreate): Promise<IProduct> => {
    return await handleRequest(axios.post(`${API_URL}/products`, payload));
};

export const updateProduct = async (id: number, payload: ProductUpdate): Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.patch(`${API_URL}/products/${id}`, payload))
}

export const deleteProduct = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/products/${id}`))
}