import { useEffect, useState } from "react";
import { ICustomer } from "../../types/ICustomer";
import { createCustomer, fetchCustomers } from "../../services/customerService";

export const useCustomers = () => {
	const [customers, setCustomers] = useState<ICustomer[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchCustomersHandler();
	}, []);

	const fetchCustomersHandler = async () => {
		setIsLoading(true);
        setError(null)
		try {
			const data = await fetchCustomers();
			setCustomers(data);
		} catch (error) {
			setError("Failed to fetch customers.");
		} finally {
			setIsLoading(false);
		}
	};

    const addCustomer = async (newCustomer: ICustomer) => {
        try {
            const createdCustomer = await createCustomer(newCustomer);
            setCustomers((existingCustomers) => [...existingCustomers, newCustomer]);
        } catch (error) {
            setError("Failed to add customer.");
        }
    }

    return {
        customers,
        isLoading,
        error,
        addCustomer,
    }
};
