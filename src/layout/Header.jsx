import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const goToAbout = () => {
    navigate("/", { state: { scrollTo: "about" } });
    handleClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  return (
    <div className={`comman-header ${isSticky ? "is-sticky" : ""}`}>
      <Container>
        <Navbar expand="md" className="p-0">
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            placement="end"
            show={showOffcanvas}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={handleClose}
                >
                  Home
                </NavLink>

                <Nav.Link
                  className="nav-link"
                  onClick={goToAbout}
                >
                  About Us
                </Nav.Link>

                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={handleClose}
                >
                  Our Services
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={handleClose}
                >
                  Contact Us
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
