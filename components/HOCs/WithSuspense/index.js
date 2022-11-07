import { Suspense } from "react";

const WithSuspense = ({ children }) => {
  return <Suspense fallback={<h3>Loading...</h3>}>{children}</Suspense>;
};

export default WithSuspense;
