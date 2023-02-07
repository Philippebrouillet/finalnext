import React from "react";
import ContextProvider from "@/Context/dataContext";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const Layout = (props: any) => {
  const { children } = props;

  return (
    <div>
      <ContextProvider>
        <Header />
        {children}
        <Footer />
      </ContextProvider>
    </div>
  );
};

export default Layout;
