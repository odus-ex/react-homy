import ErrorInternal from "../components/HOCs/ErrorBoundaries/ErrorInternal";
import "../globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorInternal>
      <Component {...pageProps} />
    </ErrorInternal>
  );
}

export default MyApp;
