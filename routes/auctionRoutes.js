import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { placeAuction, auctionList, auctionItem, bidForItem, myAuctionItems, closeMyBidItem } from '../controllers/auctionController.js'

const router = express.Router()

router.get('/item',protect, auctionItem)
router.get('/myitems',protect, myAuctionItems)
router.put('/myitems/close',protect, closeMyBidItem)

router
    .route('/')
    .post(protect, placeAuction)
    .get(protect, auctionList)
    .put(protect, bidForItem)
export default router;