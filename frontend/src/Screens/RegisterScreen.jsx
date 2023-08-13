import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRegisterMutation } from "../slices/clientApiRequestSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterScreen() {

	const [register, { isLoading }] = useRegisterMutation()
	const [credential, setCredentials] = useState({
		fullName: '',
		email: '',
		phoneNumber: ''
	})
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await register(credential).unwrap()
			if(result) {
				toast.success('Successfully registered, you may now login using your email address')
				navigate('/')
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
		<Container className="vh-100 d-flex justify-content-center align-items-center">
			<Row>
				<Col>
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
							{isLoading ? "Signin Up" : "Register"}
						</Button>
						<Button variant="link" href="/">
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
