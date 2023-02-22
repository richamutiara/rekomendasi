import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import vespaImage from "../assets/vespa.jpg";

/// ga di pake
function HomePage() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex align-items-center min-vh-100">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={vespaImage}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={vespaImage}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={vespaImage}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <div className="d-flex align-items-center min-vh-100">
            <div>
              <div>
                <Form.Label>Harga</Form.Label>
                <br />
                <div className="d-flex flex-row mb-3">
                  <Form.Control size="sm" type="text" placeholder="0" />
                  <Form.Control size="sm" type="text" placeholder="" />
                </div>
              </div>
              <Form>
                <Form.Label>Fasilitas</Form.Label>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Helm"
                      name="helm"
                      type={type}
                      id={`inline-${type}-helm`}
                    />
                    <Form.Check
                      inline
                      label="Jas Hujan"
                      name="jas"
                      type={type}
                      id={`inline-${type}-jas`}
                    />
                    <Form.Check
                      name="rack"
                      type={type}
                      id={`default-${type}-rack`}
                      label="Motorcycle Surfboard Rack"
                    />
                    <Form.Check
                      name="layanan"
                      type={type}
                      id={`default-${type}-layanan`}
                      label="Layanan Antar Jemput"
                    />
                  </div>
                ))}
              </Form>
              <div>
                <Dropdown>
                  <Form.Label>Lokasi</Form.Label>
                  <br />
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    Pilih Lokasi
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-2">Kuta</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Kuta Selatan
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Kuta Utara</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Mengwi</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <br />
              <div>
                <Button variant="primary" size="sm">
                  Save
                </Button>{" "}
                <Button
                  as="input"
                  type="reset"
                  value="Reset"
                  size="sm"
                  variant="danger"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
