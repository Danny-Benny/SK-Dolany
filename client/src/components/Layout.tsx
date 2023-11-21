import React from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-12">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
