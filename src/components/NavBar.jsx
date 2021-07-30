import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink className="navbar-brand font-weight-bold" to="/">Xpeed Studio</NavLink>
                  <Navbar.Toggle aria-controls="navbar-toggle" />
                  <Navbar.Collapse id="navbar-toggle">
                        <Nav className="ml-auto">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Table</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/getform">GetForm</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/updateform/"+ Math.floor(Math.random() * 20) + 1}>UpdateForm</NavLink>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </div>
              </nav>
        </div>
    )
}


export default NavBar;