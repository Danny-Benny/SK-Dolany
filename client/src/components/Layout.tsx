import React from "react";
import { Navbar } from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-12">{children}</div>
    </>
  );
};

export default Layout;
