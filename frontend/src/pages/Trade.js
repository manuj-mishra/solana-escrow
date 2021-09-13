import React, {useState} from "react";
import {Button, ButtonGroup, Card, Container, Form, ToggleButton} from "react-bootstrap";

function Trade() {
    const [actionValue, setActionValue] = useState('1');
    const actions = [
        { name: 'Offer a trade', value: '0' },
        { name: 'Accept a trade', value: '1' },
    ];


    return (
        <Container>
            <h1 className="mt-3 mb-3">Escrow</h1>
            <Card body>
                <Card.Title>Trading</Card.Title>
                <p className="mt-3">I would like to: </p>
                <ButtonGroup className="mb-2">
                    {actions.map((action, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="primary"
                            name="radio"
                            value={action.value}
                            checked={actionValue === action.value}
                            onChange={(e) => setActionValue(e.currentTarget.value)}
                        >
                            {action.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Card>
        </Container>
    )
}

export default Trade;
