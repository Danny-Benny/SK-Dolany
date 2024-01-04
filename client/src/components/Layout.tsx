import React from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mx-12">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
