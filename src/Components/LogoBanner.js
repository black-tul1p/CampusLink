import logo from '../images/campuslink_banner.png'
import './LogoBanner.css'

function LogoBanner() {
  return (
    <div className="logo-banner">
      <img src={logo} className="logo-full" alt="logo"/>
    </div>
  );
}

export default LogoBanner;
