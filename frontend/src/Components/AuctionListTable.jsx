import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AuctionListTable({ auctionList }) {

    const navigate = useNavigate()

    const gotoDetails = (item, index) => {
        navigate(`/auction/item/${item._id}`)
    }

	return (
		<Table striped="columns">
			<thead>
				<tr>
					<th>Owner</th>
					<th>Current Price</th>
					<th>Model</th>
					<th>Brand</th>
                    <th>Action</th>
				</tr>
			</thead>
			<tbody>
                {
                    auctionList && auctionList.length > 0 && auctionList.map((eactItem, index) => {
                        return (
                            <tr key={index}>
                                <td>{eactItem.owner.fullName}</td>
                                <td>{
                                    eactItem?.lastBidder?.biddedPrice ? 
                                    eactItem?.lastBidder?.biddedPrice + eactItem.incrementPrice : 
                                    eactItem.openingPrice + eactItem.incrementPrice }</td>
                                <td>{eactItem.model}</td>
                                <td>{eactItem.brand}</td>
                                <td>
                                    <Button variant="success" onClick={() => gotoDetails(eactItem, index)}>Details</Button>
                                </td>
                            </tr>
                        )
                    })
                }
			</tbody>
		</Table>
	);
}
