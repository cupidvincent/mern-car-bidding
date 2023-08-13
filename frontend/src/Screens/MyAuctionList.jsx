import React, { useEffect, useState } from "react";
import PageContainer from "../Components/PageContainer";
import MyAuctionListTable from "../Components/MyAuctionListTable";
import { useMyItemsMutation, useCloseItemBidMutation } from "../slices/auctionApiRequestSlice";

import { toast }from 'react-toastify'

export default function MyAuctionList() {

	const [myItems, { isLoading }] = useMyItemsMutation()
	const [myList, setMyList] = useState([])    
	const [closeItemBid, {isLoading: closeLoading}] = useCloseItemBidMutation()

    const closeBidding = async(item, action) => {
        // navigate(`/auction/item/${item._id}`)
        try {
            const result = await closeItemBid({itemId: item, action}).unwrap()
			if(result) {
				setMyList([...result])
				toast.success('Successfully closed the item')
			}
        } catch (error) {
            toast.error(error.data.message || error.data.error || error.data)
        }
    }


	const getMyItems = async () => {
		try {
			const result = await myItems().unwrap()
			if(result) {
				setMyList([...result])
			}
		} catch (error) {
			toast.error(error.data.message || error.data.error || error.data)
		}
	}

	useEffect(()=>{
		getMyItems()
	}, [])

	return (
		<PageContainer pageTitle={'My Auctioned Item'}>
			<MyAuctionListTable auctionList={myList} closeBidding={closeBidding}/>
		</PageContainer>
	);
}
