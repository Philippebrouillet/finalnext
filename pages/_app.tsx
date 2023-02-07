import "@/styles/globals.css";
import "@/styles/globals.css";
import Layout from "@/Components/Layout";
import type { AppProps } from "next/app";

interface Props extends AppProps {
  children?: React.ReactNode;
}

const App: React.FC<Props> = ({ Component, pageProps, children }) => {
  return (
    <Layout>
      <Component {...pageProps}>{children}</Component>
    </Layout>
  );
};

export default App;
