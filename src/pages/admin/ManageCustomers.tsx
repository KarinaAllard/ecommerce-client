import { useEffect } from "react";
import { useCustomers } from "../hooks/useCustomers"
import { fetchCustomers } from "../../services/customerService";

export const ManageCustomers = () => {
    const { customers, isLoading, error } = useCustomers();

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return (
        <div>
            <h1>Manage Customers</h1>
            {isLoading && <p>Loading customers...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {customers.length === 0 && !isLoading && <p>No customers found.</p>}
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.firstname} {customer.lastname} - {customer.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}