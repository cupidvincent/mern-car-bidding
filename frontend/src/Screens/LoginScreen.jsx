import React, { useState } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../slices/clientApiRequestSlice'
import { setUserInfo } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function LoginScreen() {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [login, { isLoading } ] = useLoginMutation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const result = await login({email}).unwrap()
            if(result) {
                dispatch(setUserInfo({
                    ...result
                }))
                navigate('/auction')
            }
        } catch (error) {
            toast.error(error.data.message || error.data.error || error.data)
        }
    }

  return (
    <Container className='vh-100 d-flex justify-content-center align-items-center'>
        <Row>
            <Col>
                <Form onSubmit={!isLoading ? handleSubmit : null}>
                    <Form.Group className="mb-3" controlId="formPlaintextUsername">
                        <Form.Label className='text-secondary'>
                            Email
                        </Form.Label>
                        <Col>
                            <Form.Control size='lg' value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder='email' required/>
                        </Col>
                    </Form.Group>
                    <Button type='submit' disabled={isLoading}>{ isLoading ? 'Logging In' : 'Login'}</Button>
                    <Button variant='link' href='/signup'>Register</Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
