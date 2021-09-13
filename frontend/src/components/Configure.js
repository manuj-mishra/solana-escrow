import React, {useState} from "react";
import {Button, Card, Container, Form} from "react-bootstrap";

function Configure() {
    const [priv, setPriv] = useState("")
    const [prog, setProg] = useState("")
    return (
        <Container>
            <h1 className="mt-3 mb-3">Escrow</h1>
            <Card body>
                <Card.Title>Configurations</Card.Title>
                <Form onClick={() => {
                    localStorage.setItem('priv', priv)
                    localStorage.setItem('prog', prog)
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Program ID</Form.Label>
                        <Form.Control
                            defaultValue={localStorage.getItem('prog')}
                            onChange={(e) => setProg(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Private Key</Form.Label>
                        <Form.Control
                            defaultValue={localStorage.getItem('priv')}
                            onChange={(e) => setPriv(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Configure;
