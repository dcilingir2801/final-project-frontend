import { Link } from "react-router-dom";
import "/src/pages/NotFound.css"; 

function NotFound() {
    return (
        <div className="not-found-container">
        <div className="text-container">
            <h1>Oops!</h1>
            <h2>We can't seem to find the page you're looking for.</h2>
            <p>Error code: 404</p>
            <p>Here are some helpful links instead:</p>
            <ul className="not-found-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/help">Help</Link></li>
                <li><Link to="/traveling">Traveling on Airbnb</Link></li>
                <li><Link to="/hosting">Hosting on Airbnb</Link></li>
                <li><Link to="/trust-safety">Trust & Safety</Link></li>
                <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
        </div>
        <div className="image-container">
            <img src="/src/assets/error_page_icon.gif" alt="Error Icon" />
            </div>
        </div>
    )
}

export default NotFound;
