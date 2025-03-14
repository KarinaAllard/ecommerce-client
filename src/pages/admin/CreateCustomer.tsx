import { useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
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
					<input
						type="text"
						name="firstname"
						value={formData.firstname}
						onChange={handleChange}
						placeholder="First Name"
						required
					/>
					<input
						type="text"
						name="lastname"
						value={formData.lastname}
						onChange={handleChange}
						placeholder="Last Name"
						required
					/>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Password"
						className="input-pw"
						required
					/>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="Phone Number"
					/>
					<input
						type="text"
						name="street_address"
						value={formData.street_address}
						onChange={handleChange}
						placeholder="Street Address"
					/>
					<input
						type="text"
						name="postal_code"
						value={formData.postal_code}
						onChange={handleChange}
						placeholder="Postal Code"
					/>
					<input
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						placeholder="City"
					/>
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
