import "./Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top grid">
        <div className="grid-item">
          <h3>Useful Links</h3>

          <ul>
            <li><Link to="/exercise-diets" style={{color: "white"}}>Exercises</Link></li>
            <li><Link to="/exercise-diets" style={{color: "white"}}>Diet</Link></li>
            <li><Link to="/calendar" style={{color: "white"}}>Calendar</Link></li>
            <li><Link to="/data" style={{color: "white"}}>Data</Link></li>
          </ul>
        </div>

        <div className="grid-item">
          <h3>Contact Information</h3>

          <ul>
            <li>
              Rīga, Barona iela 19, LV-1001 <br />
              Vilnus, Ringuvos g. 51a, LT-45230
            </li>
            <li>+371 23344738</li>
            <li>info@fithelp.com</li>
          </ul>
        </div>

        <div className="grid-item">
          <h3>Socials</h3>

          <ul>
            <li><a href="https://twitter.com/home">Twitter</a></li>
            <li><a href="https://facebook.com/">Facebook</a></li>
            <li><a href="https://instagram.com/">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyrigth 2022, FitHelp ©</p>
      </div>
    </div>
  );
}

export default Footer;
