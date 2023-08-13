import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuctionItemMutation, usePlaceAuctionBidMutation } from '../slices/auctionApiRequestSlice';
import { toast } from 'react-toastify'
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageContainer from '../Components/PageContainer';
import AuctionItemDetail from '../Components/AuctionItemDetail';
import { useSelector } from 'react-redux';

const AuctionItemPage = () => {

    const { id } = useParams();
    const [auctionItem, { isLoading }] = useAuctionItemMutation()
    const [placeAuctionBid, { isLoading: placeBidLoading }] = usePlaceAuctionBidMutation()
    const [item, setItem] = useState({})
    const [currentPrice, setCurrentPrice] = useState(0)
    const { userInfo } = useSelector((state) => state.auth) 

    const getItem = async () => {
        try {
            const result = await auctionItem(id).unwrap()
            setItem({
                ...result._doc
            })
            setCurrentPrice(
                result._doc?.lastBidder?.biddedPrice ? 
                result._doc?.lastBidder?.biddedPrice + result._doc.incrementPrice : 
                result._doc.openingPrice + result._doc.incrementPrice
            )
        } catch (error) {
            toast.error(error.data.message || error.data.error || error.data)
        }
    }

    const placeBid = async () => {
        try {
            const result = await placeAuctionBid({itemId: item._id, askPrice: currentPrice}).unwrap()
            setItem({
                ...result
            })
            setCurrentPrice(
                result ?.lastBidder?.biddedPrice ? 
                result ?.lastBidder?.biddedPrice + result.incrementPrice : 
                result.openingPrice + result.incrementPrice
            )
            toast.success('Bid placed!')
        } catch (error) {
            if(error && error.data.newData) {
                const newData = {...error.data.newData}
                setItem({
                    ...newData
                })
                setCurrentPrice(
                    newData?.lastBidder?.biddedPrice ? 
                    newData ?.lastBidder?.biddedPrice + newData.incrementPrice : 
                    newData.openingPrice + newData.incrementPrice
                )
            }
            toast.error(error.data.message || error.data.error || error.data)
        }
    }

    useEffect(() => {
        getItem()
    }, [id])


    return (
        <PageContainer pageTitle={`Bid for ${item?.model}`}>
            {
                isLoading ? 'Fetching Data' :
                item?.owner && item?.open && !item?.isDeleted ?
                    <>  
                        <h1 className='m-4'>Current Bidding price: {(currentPrice).toLocaleString("en-US") }</h1>
                        {
                            userInfo && userInfo._id !== item.owner._id && <Button variant='primary' onClick={placeBid}>Place Bid</Button>
                        }
                        <AuctionItemDetail itemDetail={item}/> 
                    </>
                : 'No Data Found'
            }
        </PageContainer>
    )
}

export default AuctionItemPage
