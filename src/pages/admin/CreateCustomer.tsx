import { useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { ICustomer } from "../../types/ICustomer";
import { Button } from "../../components/Button";
import { Link } from "react-router";

export const CreateCustomer = () => {
	const { createCustomerHandler } = useCustomers();
	const [formData, setFormData] = useState<ICustomer>({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		phone: "",
		street_address: "",
		postal_code: "",
		city: "",
		country: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createCustomerHandler(formData);
		setFormData({
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			phone: "",
			street_address: "",
			postal_code: "",
			city: "",
			country: "",
		});
	};

	return (
		<div className="customer-wrapper">
			<form onSubmit={handleSubmit}>
				<h2>Create New Customer</h2>
				<div className="form-div">
					<label htmlFor="firstname">First Name:</label>
					<input
						type="text"
						name="firstname"
						value={formData.firstname}
						onChange={handleChange}
						placeholder="First Name"
						required
					/>
					<label htmlFor="lastname">Last Name:</label>
					<input
						type="text"
						name="lastname"
						value={formData.lastname}
						onChange={handleChange}
						placeholder="Last Name"
						required
					/>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email"
						required
					/>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Password"
						className="input-pw"
						required
					/>
					<label htmlFor="phone">Phone:</label>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="Phone Number"
					/>
					<label htmlFor="street_address">Street Address:</label>
					<input
						type="text"
						name="street_address"
						value={formData.street_address}
						onChange={handleChange}
						placeholder="Street Address"
					/>
					<label htmlFor="postal_code">Postal Code:</label>
					<input
						type="text"
						name="postal_code"
						value={formData.postal_code}
						onChange={handleChange}
						placeholder="Postal Code"
					/>
					<label htmlFor="city">City:</label>
					<input
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						placeholder="City"
					/>
					<label htmlFor="country">Country:</label>
					<input
						type="text"
						name="country"
						value={formData.country}
						onChange={handleChange}
						placeholder="Country"
					/>
				</div>
				<div className="button-div">
					<Button type="submit" className="submit-btn">
						Create Customer
					</Button>
					<Link to={"/admin/manage-customers"}>Go back</Link>
				</div>
			</form>
		</div>
	);
};
