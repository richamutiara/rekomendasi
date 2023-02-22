import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Navigate, useLocation } from "react-router-dom";
import Rental from "./Rental";

function SearchPage() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid="md">
      <Row>
        <div className="d-flex flex-column mb-3 align-items-center justify-content-center min-vh-100">
          {state.map((rentalData) => (
            <Rental rental={rentalData} />
          ))}
        </div>
      </Row>
    </Container>
  );
}

export default SearchPage;
