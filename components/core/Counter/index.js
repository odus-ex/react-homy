import styles from "./counter.module.css";

const Counter = ({
  label = "Counter",
  currentValue = 0,
  handleDecrement = () => {},
  handleIncrement = () => {},
  errorLabel = "",
}) => {
  return (
    //   An error boundary if startvalue is less than end value
    <div className={styles.component_container}>
      <section className={styles.label_wrapper}>{label}</section>

      <section className={styles.counter_wrapper}>
        <span className={styles.clicker} onClick={handleDecrement}>
          -
        </span>
        <h1>{currentValue}</h1>
        <span className={styles.clicker} onClick={handleIncrement}>
          +
        </span>
      </section>

      <div className={styles.error_container}>{errorLabel && errorLabel}</div>
    </div>
  );
};

export default Counter;
