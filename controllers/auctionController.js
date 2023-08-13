import AuctionModel from "../models/auctionModel.js";
import asyncHandler from 'express-async-handler';
import generateJwt from "../utils/generateJwt.js";

const placeAuction = asyncHandler( async(req, res) => {
    const { model, brand, year, type, openingPrice, incrementPrice, expiryDate } = req.body;
    const { _id } = req.user;

    const result = await AuctionModel.create({
        owner: _id,
        model, brand, year, type, openingPrice, incrementPrice, expiryDate
    })

    if(result) {
        generateJwt(res, _id)
        res.status(201).json({
            ...result._doc
        })
    } else {
        res.status(403).json({
           message: 'error on creating auction item, please try again later'
        })
    }
})

const auctionList = asyncHandler( async(req, res) => {
    const { _id } = req.user;

    const result = await 
        AuctionModel
            .find({ isDeleted: {$eq: false }, open: {$eq: true} })
            .populate('owner')

    if(result) {
        generateJwt(res, _id)
        const filteredExpired = result.reduce((accumolated, currentValue) => {
            let dateNow = new Date()
            dateNow.setHours(0, 0, 0, 0)

            const isNotExpired = new Date(currentValue.expiryDate) > dateNow;
            const canBeShowned = isNotExpired || (!isNotExpired && !currentValue.lastBidder);

            if(canBeShowned) {
                accumolated.push(currentValue)
            }
            return accumolated
        }, [])
        res.status(201).json({
            availableAuctions: [...filteredExpired]
        })
    } else {
        res.status(403).json({
           message: 'error on creating auction item, please try again later'
        })
    }
})

const auctionItem = asyncHandler( async(req, res) => {
    const { id } = req.query;
    const { _id } = req.user;

    const item = await AuctionModel.findById(id).populate('owner')
    if(item) {
        generateJwt(res, _id)
        res.status(200).json({
            ...item
        })
    } else {
        res.status(404).json({
            message: 'Auction item not found'
        })
        throw new Error('Auction item not found')
    }

})

const bidForItem = asyncHandler ( async(req, res) => {
    const { itemId, askPrice } = req.body;
    const { _id } = req.user;
    let auctionItem = await AuctionModel.findById(itemId)
    generateJwt(res, _id)
    try {
        if(auctionItem) {
            const hasPrevBidder = auctionItem?.lastBidder?.user;
            let bidPrice;
    
            // const nextPrice = auctionItem?.lastBidder?.biddedPrice + auctionItem.incrementPrice

            if(hasPrevBidder && askPrice === auctionItem?.lastBidder?.biddedPrice  ) {
                res.status(406).json({
                    message: 'Sorry, somebody has bid quicker with this price, please check the new price',
                    newData: auctionItem
                })
                throw new Error('Sorry, somebody has bid quicker with this price, please check the new price')
            }
    
            bidPrice = 
                hasPrevBidder ?  
                askPrice : 
                auctionItem.openingPrice + auctionItem.incrementPrice;
            
            let dateNow = new Date()
            dateNow.setHours(0, 0, 0, 0)

            const isNotExpired = new Date(auctionItem.expiryDate) > dateNow;
            
            auctionItem.open === !isNotExpired ? false : auctionItem.open
    
            auctionItem.lastBidder = {
                user: _id,
                biddedPrice: bidPrice
            }
           const placeBidResult = await auctionItem.save()
           if(placeBidResult) {
                res.status(200).json(placeBidResult)
           }

        }
        
    } catch ({error,message}) {
        res.status(409).json({message})
        throw new Error( message)
    }
})

const myAuctionItems = asyncHandler( async( req, res) =>{
    const { _id, isAdmin } = req.user;

    const filter = !isAdmin ? {
        owner: _id
    } : {}

    const MyItems = await AuctionModel.find(filter).populate('lastBidder.user owner')
    if(MyItems) {
        generateJwt(res, _id)
        res.status(200).json(MyItems)
    } else {
        res.status(404).json({
            message: 'No Auction items found'
        })
        throw new Error('No Auction items found')
    }
})

const closeMyBidItem = asyncHandler (async (req, res) => {
    const { itemId, action } = req.body;
    const { _id, isAdmin } = req.user;

    const filter = !isAdmin ? {
        owner: _id
    } : {}

    let toCloseItem = await AuctionModel.findById(itemId);
    if(toCloseItem) {

        if(action === 'close') {
            toCloseItem.open = false;
        } else if(action === 'delete') {
            toCloseItem.isDeleted = true;
        }
        const updated = await toCloseItem.save()
        if(updated) {
            const MyItems = await AuctionModel.find(filter).populate('lastBidder.user owner') 
            generateJwt(res, _id)
            res.status(200).json(MyItems)
        }
    } else {
        res.status(404).json({
            message: 'Auction item not found'
        })
        throw new Error('Auction item not found')
    }
})

export {
    placeAuction,
    auctionList,
    auctionItem,
    bidForItem,
    myAuctionItems,
    closeMyBidItem
}