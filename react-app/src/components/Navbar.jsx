import { NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="simple-navbar w-nav"
      style={{
        backgroundColor: isHome ? 'transparent' : '#1a1a1a',
        position: isHome ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: isHome ? '0' : '15px 0'
      }}
    >

      <div className="container w-container">
        <div className="w-layout-grid grid-nav">
          <NavLink
            to="/"
            aria-label="link"
            className="brand w-nav-brand"
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: 'Noto Sans, sans-serif',
                color: '#ffffff'
              }}
            >
              Abbasoğlu təmizlik
            </div>
          </NavLink>
          <nav
            role="navigation"
            className="nav-menu w-nav-menu"
          >
            <NavLink to="/" end className="nav-link-light w-nav-link">
              Ana Səhifə
            </NavLink>
            <NavLink to="/services" className="nav-link-light w-nav-link">
              Xidmətlər
            </NavLink>
            <NavLink to="/blogs" className="nav-link-light w-nav-link">
              Bloglar
            </NavLink>
            <NavLink to="/about" className="nav-link-light w-nav-link">
              Haqqımızda
            </NavLink>

          </nav>

          <div className="right-nav">
            <a
              href="https://wa.link/bg23ku"
              className="button-primary-1-icon mobile-hide w-inline-block"
            >
              <div>Əlaqə</div>
              <div className="button-primary-icon-wrap">
                <img
                  loading="eager"
                  src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6756c558622788afc19a5f32_arrow-icon.svg"
                  alt="Arrow Icon"
                  className="button-icon"
                />
                <img
                  loading="eager"
                  src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6756c558622788afc19a5f32_arrow-icon.svg"
                  alt="Arrow Icon"
                  className="button-hover-icon"
                />
              </div>
            </a>
            <div className="menu-button w-nav-button">
              <div className="w-icon-nav-menu" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

