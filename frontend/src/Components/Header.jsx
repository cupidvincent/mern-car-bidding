import React, { useEffect } from "react";
import {
	Button,
	Container,
	Row,
	Col,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/clientApiRequestSlice";
import { setUserInfo } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header({ isAdmin, userLogged }) {
	const [logout, { isLoading }] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const { userInfo } = useSelector((state) => state.auth)
	const logoutFn = async () => {
		try {
			const result = await logout().unwrap();
			if (result) {
				dispatch(setUserInfo(null));
				navigate("/");
			}
		} catch (error) {
			toast.error(error.data.message || error.data.error || error.data);
		}
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/auction">Car Auction Bidding</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/auction">Check Auction</Nav.Link>
						<NavDropdown title={userLogged.fullName} id="basic-nav-dropdown">
							<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
							{
								isAdmin ? 
								<NavDropdown.Item href="/auction/admin/listing">See All Listing</NavDropdown.Item> : 
								<NavDropdown.Item href="/auction/my-items">My Auctioned Items</NavDropdown.Item>
							}
							<NavDropdown.Item href="/auction/newItem">Place Item</NavDropdown.Item>
							
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={logoutFn}>Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
