import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Provider as StoreProvider } from "react-redux";
import { store } from "../store";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <StoreProvider store={store}>
      <SessionProvider session={session} options={{ clientMaxAge: 0 }}>
        <Component {...pageProps} />
      </SessionProvider>
    </StoreProvider>
  );
}

export default MyApp;
