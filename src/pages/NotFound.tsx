import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound-page">
    <h2>404 — Oops!</h2>
    <p>The page you requested does not exist.</p>
    <Link className="btn-primary" to="/">Back to Home</Link>
  </div>
);

export default NotFound;
