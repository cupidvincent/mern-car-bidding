import React from "react";
import { Container, Table } from "react-bootstrap";


export default function AuctionItemDetail({itemDetail}) {
	return (
		<Table>
			<tbody>
				<tr>
					<td>Owner</td>
					<td>{itemDetail.owner.fullName}</td>
				</tr>
				<tr>
					<td>Model</td>
					<td>{itemDetail.model}</td>
				</tr>
				<tr>
					<td>Brand</td>
					<td>{itemDetail.brand}</td>
				</tr>
				<tr>
					<td>Type</td>
					<td>{itemDetail.type}</td>
				</tr>
				<tr>
					<td>Year</td>
					<td>{itemDetail.year}</td>
				</tr>
				<tr>
					<td>Opening Price</td>
					<td>{itemDetail.openingPrice}</td>
				</tr>
				<tr>
					<td>Increment Price</td>
					<td>{itemDetail.incrementPrice}</td>
				</tr>

			</tbody>
		</Table>
	);
}
