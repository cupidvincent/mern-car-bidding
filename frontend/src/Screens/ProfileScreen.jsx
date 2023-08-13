import React, { useEffect, useState } from "react";
import PageContainer from "../Components/PageContainer";
import { Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateMutation } from "../slices/clientApiRequestSlice";
import { setUserInfo } from "../slices/authSlice";

export default function ProfileScreen() {
	
	const [ update, { isLoading }] = useUpdateMutation()
	const [credential, setCredentials] = useState({
		fullName: '',
		email: '',
		phoneNumber: ''
	})
	const { userInfo } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log(userInfo)
		setCredentials({
			...userInfo
		})
	},[])

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await update(credential).unwrap()
			if(result) {
				toast.success('Successfully updated your Profile')
				dispatch(setUserInfo({
					...result.newData
				}))
			}
		} catch (error) {
			toast.error(error.data.message || error.data.error || error.data)
		}
	};

	const handleChange = (e) => {
		setCredentials({
			...credential,
			[e.target.name]: e.target.value
		})
	}

	return (
		<PageContainer pageTitle={'Profile Info'}>
			<Form onSubmit={!isLoading ? handleSubmit : null}>
						<Form.Group className="mb-3" controlId="formPlaintextFullname">
							<Form.Label className="text-secondary">Full name</Form.Label>
							<Col>
								<Form.Control
									size="lg"
									type="text"
									name="fullName"
									value={credential.fullName}
									onChange={handleChange}
									required
								/>
							</Col>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label className="text-secondary">Email</Form.Label>
							<Col>
								<Form.Control
									size="lg"
									type="email"
									name="email"
									value={credential.email}
									onChange={handleChange}
									required
								/>
							</Col>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formPlaintextPhoneNumber">
							<Form.Label className="text-secondary">Phone Number</Form.Label>
							<Col>
								<Form.Control
									size="lg"
									type="text"
									name="phoneNumber"
									value={credential.phoneNumber}
									onChange={handleChange}
									required
								/>
							</Col>
						</Form.Group>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Updating" : "Update"}
						</Button>
					</Form>
		</PageContainer>
	);
}
