import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-red-300 flex justify-center p-6">
      <Link className="me-4" to="/">
        Home
      </Link>
      <Link className="me-4" to="/saved-quiz">
        Saved Quiz
      </Link>
      <Link className="me-4" to="/chat">
        Generate Quiz
      </Link>
      <Link className="me-4" to="/login">
        Login
      </Link>
      <Link className="me-4" to="/user-profile">
        User Profile
      </Link>
    </div>
  );
};

export default Navbar;
