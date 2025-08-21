import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";

const Layout = () => {
  return (
    <>
      <Header />
      
      <DashboardLayout>
        <Outlet /> 
      </DashboardLayout>
      <Footer />
    </>
  );
};

export default Layout;
