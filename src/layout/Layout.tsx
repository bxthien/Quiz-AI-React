import { Outlet } from "react-router-dom";
import { Navigation } from "../components";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
