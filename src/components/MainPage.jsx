import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import vespaImage from "../assets/vespa.jpg";

function MainPage() {
  return (
    <Container fluid="md">
      <Row>
        <div className="d-flex flex-column mb-3 align-items-center justify-content-center min-vh-100">
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={vespaImage} />
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "50rem" }}>
                <Card.Body>
                  <br />
                  <Card.Title>Sewa Motor Bali</Card.Title>
                  <Card.Text>
                    <p>Rp. 250.000/hari</p>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-d align-items-center justify-content-center "
                  >
                    Detail
                  </Button>
                  <br />
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={vespaImage} />
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "50rem" }}>
                <Card.Body>
                  <br />
                  <Card.Title>Sewa Motor Bali</Card.Title>
                  <Card.Text>
                    <p>Rp. 250.000/hari</p>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-d align-items-center justify-content-center "
                  >
                    Detail
                  </Button>
                  <br />
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={vespaImage} />
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "50rem" }}>
                <Card.Body>
                  <br />
                  <Card.Title>Sewa Motor Bali</Card.Title>
                  <Card.Text>
                    <p>Rp. 250.000/hari</p>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-d align-items-center justify-content-center "
                  >
                    Detail
                  </Button>
                  <br />
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}

export default MainPage;
