import { useEffect, useState } from "react";
import { CustomerCreate, CustomerUpdate, ICustomer } from "../types/ICustomer";
import {
	createCustomer,
	deleteCustomer,
	fetchCustomers,
	updateCustomer,
} from "../services/customerService";

export const useCustomers = () => {
	const [customers, setCustomers] = useState<ICustomer[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchCustomersHandler();
	}, []);

	const fetchCustomersHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await fetchCustomers();
			setCustomers(data);
		} catch (error) {
			setError("Failed to fetch customers.");
		} finally {
			setIsLoading(false);
		}
	};

	const createCustomerHandler = async (payload: CustomerCreate) => {
		setIsLoading(true);

		try {
			const createdCustomer = await createCustomer(payload);
			const updatedCustomers = [...customers, createdCustomer];
			localStorage.setItem("customers", JSON.stringify(updatedCustomers));
			setCustomers(updatedCustomers);
		} catch (error) {
			setError("Failed to add customer.");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// const updateCustomerHandler = async (id: number, updatedData: CustomerUpdate) => {
	//     setIsLoading(true);

	//     try {
	//             const updatedCustomer = await updateCustomer(id, updatedData);
	//             setCustomers((existingCustomers) =>
	//                 existingCustomers.map((customer) =>
	//                     customer.id === id ? {...customer, ...updateCustomer} : customer
	//             )
	//         )
	//     } catch (error){
	//         setError("Failed to update customer.")
	//     } finally {
	//         setIsLoading(false);
	//     }
	// }

	const updateCustomerHandler = async (id: number, payload: CustomerUpdate) => {
		setIsLoading(true);
		const existingCustomers = customers;

		try {
			const updatedCustomers = customers.map((customer) =>
				customer.id === id ? { ...customer, ...payload } : customer
			);
			localStorage.setItem("customer", JSON.stringify(updatedCustomers));
			setCustomers(updatedCustomers);
			await updateCustomer(id, payload);
		} catch (error) {
			setError("Failed to update customer.");
			rollBackCustomerChanges(existingCustomers);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const deleteCustomerHandler = async (id: number) => {
		const existingCustomers = customers;

		try {
			const updatedCustomers = customers.filter(
				(customer) => customer.id !== id
			);
			localStorage.setItem("customers", JSON.stringify(updatedCustomers));
			setCustomers(updatedCustomers);
			await deleteCustomer(id);
		} catch (error) {
			setError("Failed to delete customer");
			rollBackCustomerChanges(existingCustomers);
			throw error;
		} finally {
		}
	};

	const rollBackCustomerChanges = (existingCustomers: ICustomer[]) => {
		localStorage.setItem("customers", JSON.stringify(existingCustomers));
		setCustomers(existingCustomers);
	};

	return {
		customers,
		isLoading,
		error,
		createCustomerHandler,
		updateCustomerHandler,
		deleteCustomerHandler,
	};
};
