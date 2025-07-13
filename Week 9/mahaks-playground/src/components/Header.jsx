import logo from '../assets/images/logo.png';

export default function Header() {
  return (
    <header>
      <div className="header-grid">
        <div className="header-col logo-col">
          <a href="/" className="logo-link">
            <img className="logo" src={logo} alt="Mahak Logo" />
          </a>
        </div>
        <div className="header-col role-col">
          <span className="role">J Lab 7 • Web Playground</span>
        </div>
        <div className="header-col nav-col">
          <ul className="desktop-menu">
            <li className="tooltip-bottom">
              <a href="#">Home</a>
              <span className="tooltiptext-bottom">Back to home</span>
            </li>
            <li className="tooltip-bottom">
              <a href="#games">Games</a>
              <span className="tooltiptext-bottom">Explore mini-games</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}