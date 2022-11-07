import styles from "./errorNotFound.module.css";
import Button from "../../../core/Button";

import { useRouter } from "next/router";

const ErrorNotFound = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.component_container}>
      <h2>Looks like your are lost. Lets go back home.</h2>
      <Button label="Go back to home" onClick={handleNavigateToHome} />
    </div>
  );
};

export default ErrorNotFound;
