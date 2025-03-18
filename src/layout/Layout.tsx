import { Outlet } from "react-router-dom";
import { Navigation } from "../components";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navigation />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
