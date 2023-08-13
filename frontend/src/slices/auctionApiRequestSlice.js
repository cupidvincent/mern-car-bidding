import { apiSlice } from "./apiSlice";

const API_BASE_URL = '/api/auction';

export const apiAuctionRequestSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        auctionList: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/`,
                method: 'GET',
                body: data
            })
        }),
        auctionItem: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/item?id=${data}`,
                method: 'GET'
            })
        }),
        placeAuctionBid: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/`,
                method: 'PUT',
                body: data
            })
        }),
        placeItemAuction: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/`,
                method: 'POST',
                body: data
            })
        }),
        myItems: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/myitems`,
                method: 'GET',
                body: data
            })
        }),
        closeItemBid: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/myitems/close`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const {
    useAuctionListMutation,
    useAuctionItemMutation,
    usePlaceAuctionBidMutation,
    usePlaceItemAuctionMutation,
    useMyItemsMutation,
    useCloseItemBidMutation
} = apiAuctionRequestSlice