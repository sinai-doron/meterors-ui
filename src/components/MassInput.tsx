import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

interface MassInputProps {
    mass: string;
    onMassChange: (mass: string) => void;
}

const MassInput: React.FC<MassInputProps> = ({ mass, onMassChange }) => {
    return (
        <>
            <Row style={{ marginTop: '20px' }}>
                <Col>
                    <h5>Mass</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Control
                            type="number"
                            value={mass}
                            onChange={(e) => onMassChange(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default MassInput;
