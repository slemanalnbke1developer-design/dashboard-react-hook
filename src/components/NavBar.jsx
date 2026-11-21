import react from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      <Navbar className="bg-light d-flex justify-content-between">
        <Navbar.Brand className="ms-3 text-success">Sleman Alnbke</Navbar.Brand>
        <Nav className="">
          <Nav.Link as={Link} to="/" className="me-2 text-primary">
            ادارة المشاريع
          </Nav.Link>
          <Nav.Link as={Link} to="/DigitalLibrary" className="me-2 text-primary">
            المكتبة الرقمية
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};
export default NavBar;
