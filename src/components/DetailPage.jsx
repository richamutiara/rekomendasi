import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import vespaImage from "../assets/vespa.jpg";
import { CarouselItem } from "react-bootstrap";

function DetailPage() {
  return (
    <Container fluid="md">
      <div className="d-flex flex-column mb-3 align-items-center justify-content-center min-vh-100">
        <Card style={{ width: "60rem", height: "25rem" }}>
          <Card.Title className="text-center" style={{ margin: "20px" }}>
            Sewa Motor Bali
          </Card.Title>
          <Row>
            <Col>
              <Carousel fade>
                <CarouselItem>
                  <div style={{ margin: "10px" }}>
                    <Card.Img variant="top" src={vespaImage} />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div style={{ margin: "10px" }}>
                    <Card.Img variant="top" src={vespaImage} />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div style={{ margin: "10px" }}>
                    <Card.Img variant="top" src={vespaImage} />
                  </div>
                </CarouselItem>
              </Carousel>
            </Col>
            <Col>
              <Card.Body>
                <br />
                <Card.Text>
                  <p>Harga : Rp. 250.000/hari</p>
                  <p>Alamat : Jl. ABC No. 11</p>
                  <p>No Tlp : 0987654321</p>
                  <p>Fasilitas</p>
                </Card.Text>
                <br />
                <br />
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
}

export default DetailPage;
