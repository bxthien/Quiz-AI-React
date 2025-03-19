import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen md:h-screen flex flex-col overflow-auto md:overflow-hidden">
        <Navigation />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
