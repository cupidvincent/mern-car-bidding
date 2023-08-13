import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Container, Row, Col } from 'react-bootstrap'
import AuctionListTable from '../Components/AuctionListTable'
import { useAuctionListMutation } from '../slices/auctionApiRequestSlice'
import PageContainer from '../Components/PageContainer'

export default function AuctionScreen() {

	const [auctionList, { isLoading } ] = useAuctionListMutation()
	const [auctionTableList, setAuctionList] = useState([])

	useEffect(() => {
		getList()
	}, [])

	const getList = async () => {
		try {
			const result = await auctionList().unwrap()
			if(result) {
				setAuctionList([
					...result.availableAuctions
				])
			}
		} catch (error) {
			toast.error(error.data.message || error.data.error || error.data)
		}
	}

  return (
		<PageContainer pageTitle={'Auction item list'}>
			< AuctionListTable auctionList={auctionTableList}/>
		</PageContainer>
  )
}
