/* eslint-disable react/prop-types */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Rental({ rental }) {
  const navigate = useNavigate();

  return (
    <Row style={{ marginBottom: "4px" }}>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            style={{
              height: "182.6px",
              objectFit: "cover",
            }}
            variant="top"
            src={rental.images[0]}
          />
        </Card>
      </Col>
      <Col>
        <Card style={{ width: "50rem" }}>
          <Card.Body>
            <br />
            <Card.Title>{rental.name}</Card.Title>
            <Card.Text>
              <p>Rp. {rental.price} / hari</p>
            </Card.Text>
            <Button
              variant="primary"
              size="sm"
              className="flex-d align-items-center justify-content-center"
              onClick={() => navigate(`/detail/${rental.id}`)}
            >
              Detail
            </Button>
            <br />
            <br />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
