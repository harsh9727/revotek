import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();


  const goToAbout = () => {
    navigate("/", { state: { scrollTo: "about" } });
    handleClose();
  };
  const [isSticky, setIsSticky] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
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

                {/* <NavDropdown title="Services" id="services-dropdown">
                  <NavDropdown.Item as={NavLink} to="/services/maintenance">
                    Elevator Maintenance
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/services/repair">
                    Elevator Repair
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/services/installation">
                    Elevator Installation
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/services/mordernization">
                    Elevator Modernization
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/services/annualmaintenance">
                    Elevator Annual Maintenance Contract
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/services/spareparts">
                    Elevator Spare Parts Supply
                  </NavDropdown.Item>

                </NavDropdown> */}

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
              {/* <div className="sign-in">
                <NavDropdown
                  title={
                    <div className="sign-info">
                      <FaRegUserCircle />
                      <span> Log In</span>
                    </div>
                  }
                  id="services-dropdown"
                >
                  <NavDropdown.Item href="/logout">
                    <MdLogout />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
