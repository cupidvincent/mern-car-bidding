import React, { useEffect, useState } from 'react'
import PageContainer from '../Components/PageContainer'
import { Form, Button } from 'react-bootstrap'
import { usePlaceItemAuctionMutation } from '../slices/auctionApiRequestSlice';
import { toast } from 'react-toastify';

const initState = {
    model: '',
    brand: '',
    year: '',
    type: '',
    openingPrice: 0,
    incrementPrice: 0,
    expiryDate: ''
}

export default function PlaceAuctionItem() {

    const [auctionItem, setAuctionItem] = useState({
        ...initState
    })
    const [placeItemAuction, { isLoading }] = usePlaceItemAuctionMutation()
    const [minDate, setMinDate] = useState('')

    const handleChange = (e) => {
        setAuctionItem({
            ...auctionItem,
            [e.target.name]: e.target.value
        })
    }

    const Submitform = async (e) => {
        e.preventDefault();
        try {
            const result = await placeItemAuction(auctionItem).unwrap()
            setAuctionItem(initState)
            toast.success('Successfully placed the Item for bidding')
        } catch (error) {
            toast.error(error.data.message || error.data.error || error.data)
        }
    }

    useEffect(() => {
        var today = new Date();
            today = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
            
        setMinDate(today)
    }, [])
 
  return (
    <PageContainer pageTitle={'Place your Item for Bidding'}>
        <Form onSubmit={Submitform}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" value={auctionItem.model} onChange={handleChange} name='model' required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" value={auctionItem.brand} onChange={handleChange} name='brand' required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Year</Form.Label>
                <Form.Control type="date" value={auctionItem.year} onChange={handleChange} name='year' required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Type</Form.Label>
                <Form.Control type="text" value={auctionItem.type}onChange={handleChange} name='type' required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                <Form.Label>Opening Price</Form.Label>
                <Form.Control type="number" value={auctionItem.openingPrice}onChange={handleChange} min={1} name='openingPrice' required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                <Form.Label>Increment Price</Form.Label>
                <Form.Control type="number" value={auctionItem.incrementPrice} onChange={handleChange} min={1} name='incrementPrice' required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="date" value={auctionItem.expiryDate} min={minDate} onChange={handleChange} name='expiryDate' required/>
            </Form.Group>
            <Button type='submit' disabled={isLoading}>Create Auction</Button>
        </Form>
    </PageContainer>
  )
}
