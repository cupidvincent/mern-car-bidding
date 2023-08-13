import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCloseItemBidMutation } from "../slices/auctionApiRequestSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function MyAuctionListTable({ auctionList, closeBidding }) {

    const { userInfo } = useSelector((state) => state.auth)

	return (
		<Table striped="columns">
			<thead>
				<tr>
                    {
                        userInfo && userInfo.isAdmin && <th>Owner</th>
                    }
					<th>Status</th>
                    <th>Winner</th>
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
                                {
                                    userInfo && userInfo.isAdmin && <td>{eactItem?.owner?.fullName}</td>
                                }
                                <td>
                                    <p className="text-danger">{eactItem.isDeleted ? 'Deleted' : ''}</p>{''}
                                    <p className="text-warning">{eactItem.open ? '' : 'Closed'}</p>
                                </td>
                                <td>{eactItem?.lastBidder?.user.fullName ? eactItem?.lastBidder?.user.fullName : 'Ongoing'}</td>
                                <td>{
                                    eactItem?.lastBidder?.biddedPrice ? 
                                    eactItem?.lastBidder?.biddedPrice + eactItem.incrementPrice : 
                                    eactItem.openingPrice + eactItem.incrementPrice }</td>
                                <td>{eactItem.model}</td>
                                <td>{eactItem.brand}</td>
                                <td>
                                    <Button variant={!eactItem.open || eactItem.isDeleted ? 'secondary' : 'warning'} onClick={() => !eactItem.open || eactItem.isDeleted ? null : closeBidding(eactItem._id, 'close')} disabled={!eactItem.open || eactItem.isDeleted}>
                                        {
                                             !eactItem.open || eactItem.isDeleted ? 
                                             'Closed' : 'Close Bid'
                                        }
                                        
                                    </Button>
                                    {
                                        userInfo.isAdmin &&
                                        <Button variant={ eactItem.isDeleted ? 'secondary' : 'danger'} onClick={() => eactItem.isDeleted ? null : closeBidding(eactItem._id, 'delete')} disabled={eactItem.isDeleted}>
                                            {
                                                eactItem.isDeleted ? 
                                                'Deleted' : 'Delete Item'
                                            }
                                            
                                        </Button>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
			</tbody>
		</Table>
	);
}
