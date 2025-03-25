import { useState } from "react";
import { ICustomer } from "../../types/ICustomer";
import axios from "axios";
import { Button } from "../../components/Button";
import { Link } from "react-router";
import { API_URL } from "../../services/baseService";
import "../../styles/checkout.css"

export const Checkout = () => {
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
	const [existingCustomer, setExistingCustomer] = useState<ICustomer | null>(
		null
	);
	const [error, setError] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.get(`${API_URL}/customers/email/${formData.email}`);
			setExistingCustomer(response.data);
		} catch (err) {
			setError("Customer not found. Creating new customer...");
			await axios.post(`${API_URL}/customers`, formData);
			setExistingCustomer(formData);
		}
	};

	return (
		<div className="checkout-wrapper">
			<h1>Checkout</h1>
			<div className="checkout-div">
                {error && <p>Error: {error}</p>}
				<form onSubmit={handleSubmit}>
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
						Proceed to Payment
					</Button>
					<Link to={"/cart"}>Back to Cart</Link>
				</div>
                </form>
			</div>
		</div>
	);
};
