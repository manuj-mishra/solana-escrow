import React, {useState} from "react";
import {Button, ButtonGroup, Card, Container, Form, ToggleButton} from "react-bootstrap";
import Offer from "./Offer";

function Trade() {
    const [actionValue, setActionValue] = useState('1');
    const actions = [
        { name: 'Make a new trade', value: '0' },
        { name: 'Take an existing trade', value: '1' },
    ];

    return (
        <Container>
            <h1 className="mt-3 mb-3">Escrow</h1>
            <Card body>
                <h4 className="mb-3">Type of trade</h4>
                <ButtonGroup>
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
                <br/>
                <br/>
                <Offer/>
            </Card>
        </Container>
    )
}

export default Trade;
