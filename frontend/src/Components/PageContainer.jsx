import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function PageContainer({ pageTitle, children }) {
  return (
	<Container className='vh-100'>
		<Row className=' d-flex justify-content-center align-items-center flex-column overflow-auto'>
			<Col>
				<h1 className='my-4'>{pageTitle}</h1>
			</Col>
		</Row>
		<Row >
			<Col>
				{children}
			</Col>
		</Row>
	</Container>
  )
}
