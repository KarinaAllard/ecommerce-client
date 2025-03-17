import { useState } from "react";
import { useNavigate, useParams } from "react-router"
import { updateOrder } from "../../services/orderService";
import { Button } from "../../components/Button";

export const UpdateOrder = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [orderStatus, setOrderStatus] = useState<string>("pending");
    const [paymentStatus, setPaymentStatus] = useState<string>("unpaid");

    const handleSaveChanges = async () => {
        try {
            await updateOrder(Number(id), {
                order_status: orderStatus, payment_status: paymentStatus,
                payment_id: ""
            });
            navigate(`/admin/order-details/${id}`);
        } catch (error) {
            console.error("Failed to update order", error)

        }
    }

    return (
        <div>
            <h1>Edit Order #{id}</h1>

            <h3>Order Status</h3>
            <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
            </select>


            <h3>Payment Status</h3>
            <select
                value={orderStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
            >
                <option value="unpaid">Unpaid</option>
                <option value="processing">Processing</option>
                <option value="paid">Paid</option>
            </select>

            <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
    )
}