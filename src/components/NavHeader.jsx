import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";

function NavHeader() {
  return (
    <>
      <Navbar>
        <Container bg="#" variant="dark">
          <Navbar.Brand href="#home">
            Sistem Rekomendasi Penyewaan Kendaraan Bermotor
          </Navbar.Brand>
          <Nav className="end">
            <Nav.Link href="#">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavHeader;
