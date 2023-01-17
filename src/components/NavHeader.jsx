import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavHeader() {
  return (
    <Navbar>
      <Container bg="#" variant="dark">
        <Navbar.Brand href="#home">
          Sistem Rekomendasi Penyewaan Kendaraan Bermotor
        </Navbar.Brand>
        <Nav className="end">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About Us</Nav.Link>
          <Nav.Link href="#">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
