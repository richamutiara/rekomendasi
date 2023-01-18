import { Form, Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import vespaImage from "../assets/vespa.jpg";

function OptionPage() {
  const [price, setPrice] = useState(0);
  const [amenity, setAmenity] = useState("SL");
  const [location, setLocation] = useState("");

  return (
    <Container className="min-vh-100">
      <Row>
        <div className="p-5 gap-4 d-flex justify-content-center">
          <Form.Group className="mb-2">
            <Form.Label>Prioritas 1</Form.Label>
            <Form.Select
              aria-label="Lokasi"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Kuta">Harga</option>
              <option value="Kuta Selatan">Fasilitas</option>
              <option value="Kuta Utara">Lokasi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Prioritas 2</Form.Label>
            <Form.Select
              aria-label="Lokasi"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Kuta">Harga</option>
              <option value="Kuta Selatan">Fasilitas</option>
              <option value="Kuta Utara">Lokasi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Prioritas 3</Form.Label>
            <Form.Select
              aria-label="Lokasi"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Kuta">Harga</option>
              <option value="Kuta Selatan">Fasilitas</option>
              <option value="Kuta Utara">Lokasi</option>
            </Form.Select>
          </Form.Group>
        </div>
        <Col>
          <div className="d-flex align-items-center ">
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
          <div className="d-flex align-items-center">
            <div>
              <Form>
                <Form.Group>
                  <Form.Label>Harga Maksimal</Form.Label>
                  <div className="d-flex flex-row mb-3">
                    <Form.Control
                      size="sm"
                      type="tel"
                      min={0}
                      max={1000000}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Label>Fasilitas</Form.Label>
                <Form.Check
                  type="radio"
                  id="sangat-lengkap"
                  name="amenities"
                  label="Sangat Lengkap"
                  value="SL"
                  defaultChecked
                  onClick={(e) => setAmenity(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="lengkap"
                  name="amenities"
                  label="Lengkap"
                  value="L"
                  onClick={(e) => setAmenity(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="tidak-lengkap"
                  name="amenities"
                  label="Tidak Lengkap"
                  value="TL"
                  onClick={(e) => setAmenity(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="tidak-ada"
                  name="amenities"
                  label="Tidak Ada"
                  value="TA"
                  onClick={(e) => setAmenity(e.target.value)}
                />
                <Form.Group className="mb-2">
                  <Form.Label>Lokasi</Form.Label>
                  <Form.Select
                    aria-label="Lokasi"
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="Kuta">Kuta</option>
                    <option value="Kuta Selatan">Kuta Selatan</option>
                    <option value="Kuta Utara">Kuta Utara</option>
                    <option value="Mengwi">Mengwi</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" size="sm">
                  Cari
                </Button>
                <Button
                  as="input"
                  type="reset"
                  value="Reset"
                  size="sm"
                  variant="danger"
                />
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OptionPage;
