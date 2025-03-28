import { useCallback, useContext, useEffect, useState } from "react";
import { ICustomer } from "../../types/ICustomer";
import axios from "axios";
import { Button } from "../../components/Button";
import { Link } from "react-router";
import { API_URL } from "../../services/baseService";
import "../../styles/checkout.css"
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import CartContext from "../../context/CartContext";

const stripePromise = loadStripe('pk_test_51R4HWuJgBMb1kgR6M53MA065w6sD9NqRol0862iMHYh4YgdyKvWOKLjwX3tLwLZTOEohLQMha95ouScTn8sWSnnH00k9vKJutX');

export const Checkout = () => {
	const [formData, setFormData] = useState<ICustomer>(() => {
		const savedData = localStorage.getItem("checkoutFormData");
		return savedData ? JSON.parse(savedData) : {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			phone: "",
			street_address: "",
			postal_code: "",
			city: "",
			country: "",
		}
	});
	const [existingCustomer, setExistingCustomer] = useState<ICustomer | null>(
		null
	);
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const { cart } = useContext(CartContext);

	useEffect(() => {
		localStorage.setItem("checkoutFormData", JSON.stringify(formData))
	}, [formData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		setError("");

		try {
			const response = await axios.get(`${API_URL}/customers/email/${formData.email}`);
			setExistingCustomer(response.data);
			console.log("Customer found:", response.data);
		} catch (err) {
			setError("Customer not found. Creating new customer.");
			try {
				const createResponse = await axios.post(`${API_URL}/customers`, formData);
				setExistingCustomer(createResponse.data);
				console.log("New customer created")
			} catch (error) {
				console.log("Error creating customer");
			}
		} finally {
			setIsLoading(false);
		}
	};


	const fetchClientSecret = useCallback(async () => {
		if (!existingCustomer || cart.length === 0) return;

		try {
			const { data } = await axios.post(`${API_URL}/stripe/create-checkout-session`, {
				customer_id: existingCustomer.id,
				cart,
			});
			setClientSecret(data.clientSecret);
		} catch (error) {
			setError("Error creating payment session.");
		}
	}, [existingCustomer, cart]);

	useEffect(() => {
		if (existingCustomer?.id) {
			fetchClientSecret();
		}
	}, [existingCustomer?.id, fetchClientSecret])

	return (
		<div className="checkout-wrapper">
			<h1>Checkout</h1>
			<div className="checkout-div">
				{error && <p className="error-banner">{error}</p>}
				{!existingCustomer && (

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
				)}

			{existingCustomer && clientSecret && (
				<div className="embedded-checkout">
					<div className="payment-container">
						<div className="embedded-div">
							<EmbeddedCheckoutProvider
								stripe={stripePromise}
								options={{ clientSecret }}
								>
								<EmbeddedCheckout />
							</EmbeddedCheckoutProvider>
						</div>
					</div>
						<div className="button-div">
							<Link to={"/cart"}>Back to Cart</Link>
						</div>
				</div>
                
            )}
			</div>
		</div>
	);
};
