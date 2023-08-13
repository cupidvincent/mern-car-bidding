import mongoose from "mongoose";

const lastBidderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    biddedPrice: {
        type: Number
    }
})

const AuctionSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    openingPrice: {
        type: Number,
        required: true
    },
    incrementPrice: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    open: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    lastBidder: lastBidderSchema
}, {
    timestamps: true
})

const AuctionModel = mongoose.model('Auction', AuctionSchema)

export default AuctionModel