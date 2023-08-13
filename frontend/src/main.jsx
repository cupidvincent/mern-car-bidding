import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import LoginScreen from "./Screens/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminPrivateRoute from "./Components/AdminPrivateRoute.jsx";
import AuctionScreen from "./Screens/AuctionScreen.jsx";
import AuctionItemPage from "./Screens/AuctionItemPage.jsx";
import PlaceAuctionItem from "./Screens/PlaceAuctionItem.jsx";
import MyAuctionList from "./Screens/MyAuctionList.jsx";
import ProfileScreen from "./Screens/ProfileScreen.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={< App/>}>
			<Route index={true} path="/"  element={<LoginScreen/>}/>
			<Route path="/signup"  element={<RegisterScreen/>}/>
			<Route path="" element={<PrivateRoute />}>
				<Route path="/profile" element={<ProfileScreen />}/>
				<Route path="/auction" element={<AuctionScreen />}/>
				<Route path="/auction/newItem" element={<PlaceAuctionItem />}/>
				<Route path="/auction/item/:id" element={<AuctionItemPage />}/>
				<Route path="/auction/my-items" element={<MyAuctionList />}/>
			</Route>
			<Route path="" element={<AdminPrivateRoute />}>
				<Route path="/profile" element={<ProfileScreen />}/>
				<Route path="/auction" element={<AuctionScreen />}/>
				<Route path="/auction/newItem" element={<PlaceAuctionItem />}/>
				<Route path="/auction/item/:id" element={<AuctionItemPage />}/>
				<Route path="/auction/my-items" element={<MyAuctionList />}/>
				<Route path="/auction/admin/listing" element={<MyAuctionList />}/>
			</Route>
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router}  />
		</React.StrictMode>
	</Provider>
);
