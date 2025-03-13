import { Link } from "react-router"
import { Button } from "../../components/Button"

export const ManageProducts = () => {

    return (
        <div className="product-wrapper">
            <div className="button-div">
					<Button type="button" className="edit-btn">
						<Link to={"/admin/create-product"}>Create Product</Link>
					</Button>
				</div>
        
        </div>
    )
}