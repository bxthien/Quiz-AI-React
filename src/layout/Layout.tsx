import { Outlet } from "react-router-dom";
import { Navigation } from "../components";

const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen md:h-screen flex flex-col overflow-auto md:overflow-hidden">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
