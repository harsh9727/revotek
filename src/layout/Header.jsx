import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [isSticky, setIsSticky] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  // Scroll to About section from anywhere
  const goToAbout = () => {
    navigate("/", { state: { scrollTo: "about" } });
    setActiveSection("about");
    handleClose();
  };

  // Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section (Home / About)
  useEffect(() => {
    const handleScrollSection = () => {
      const aboutSection = document.getElementById("about");
      const scrollPosition = window.scrollY + 200;

      if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScrollSection);
    return () => window.removeEventListener("scroll", handleScrollSection);
  }, []);

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

                <Nav.Link
                  className={activeSection === "home" ? "nav-link active" : "nav-link"}
                  onClick={() => {
                    navigate("/");
                    setActiveSection("home");
                    handleClose();
                  }}
                >
                  Home
                </Nav.Link>

                <Nav.Link
                  className={activeSection === "about" ? "nav-link active" : "nav-link"}
                  onClick={goToAbout}
                >
                  About Us
                </Nav.Link>

                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => {
                    setActiveSection("");
                    handleClose();
                  }}
                >
                  Our Services
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => {
                    setActiveSection("");
                    handleClose();
                  }}
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
