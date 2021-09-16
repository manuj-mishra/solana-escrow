import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {initEscrow} from "../util/initEscrow";

function Offer() {

    const initialStates = {
        request: {
            amount: 0,
            account: "",
        },
        offer: {
            amount: 0,
            account: "",
        },
        escrow: {
            pub: null,
            isInit: null,
            initMainPub: null,
            initXTokenTempPub: null,
            initYTokenMainPub: null,
            expected: null
        }
    }

    const [request, setRequest] = useState(initialStates.request)
    const [offer, setOffer] = useState(initialStates.offer)
    const [escrow, setEscrow] = useState(initialStates.escrow)
    const [modal, setModal] = useState(false)

    const handleReset = () => {
        setRequest(initialStates.request)
        setOffer(initialStates.offer)
        setEscrow(initialStates.escrow)
    }

    const EscrowModal = (props) => {
        return (
            <Modal
                {...props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Success
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Derived information:</h4>
                    <p>
                        blah blah blah
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(escrow, null, 4))}
                    >
                        Copy to clipboard
                    </Button>
                    <Button variant="danger" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {
                escrowAccount,
                isInitialized,
                initializerMainAccount,
                initializerXTokenTempAccount,
                initializerYTokenMainAccount,
                expectedAmount
            } = await initEscrow(
                localStorage.getItem("priv"),
                offer.account,
                offer.amount,
                request.account,
                request.amount,
                localStorage.getItem("prog")
            );
            escrow.pub = escrowAccount;
            escrow.isInit = isInitialized;
            escrow.initMainPub = initializerMainAccount;
            escrow.initXTokenTempPub = initializerXTokenTempAccount;
            escrow.initYTokenMainPub = initializerYTokenMainAccount;
            escrow.expected = expectedAmount;
        } catch (err) {
            alert(err.message);
        }
        setModal(true)
        console.log(escrow)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <h4>Requesting</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of tokens</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setRequest({...request, amount: parseInt(e.target.value)})}/>
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
                            onChange={(e) => setOffer({...offer, amount: parseInt(e.target.value)})}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pubkey of account to debit</Form.Label>
                        <Form.Control
                            onChange={(e) => setOffer({...offer, account: e.target.value})}/>
                    </Form.Group>
                </Form.Group>
            </Row>
            <center>
                <Button variant="danger" type="submit">
                    Initialise escrow trade
                </Button>
            </center>
            <EscrowModal
                show={modal}
                onHide={() => {
                    setModal(false)
                    handleReset()
                }}
            />
        </Form>
    )
}

export default Offer;
