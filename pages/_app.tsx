import "@/styles/globals.css";

import Layout from "@/Components/Layout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Loader from "@/Components/Loader";

interface Props extends AppProps {
  children?: React.ReactNode;
}
Loader;
const App: React.FC<Props> = ({ Component, pageProps, children }) => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 800);
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <Layout>
      <Component {...pageProps}>{children}</Component>
    </Layout>
  );
};

export default App;
