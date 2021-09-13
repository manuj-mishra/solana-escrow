import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

function Offer() {
    const [request, setRequest] = useState({
        amount: "",
        type: "",
        account: "",
    })
    const [offer, setOffer] = useState({
        amount: "",
        type: "",
        account: "",
    })

    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <h4>Requesting</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of tokens</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setRequest({...request, amount: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type of token</Form.Label>
                        <Form.Control
                            onChange={(e) => setRequest({...request, type: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pubkey of account to credit</Form.Label>
                        <Form.Control
                            onChange={(e) => setRequest({...request, account: e.target.value})}/>
                    </Form.Group>
                </Form.Group>

                <Form.Group as={Col}>
                    <h4>Offering</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of tokens</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setOffer({...offer, amount: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type of token</Form.Label>
                        <Form.Control
                            onChange={(e) => setOffer({...offer, type: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pubkey of account to debit</Form.Label>
                        <Form.Control
                            onChange={(e) => setOffer({...offer, account: e.target.value})}/>
                    </Form.Group>
                </Form.Group>>
            </Row>

        </>
    )
}

export default Offer;
