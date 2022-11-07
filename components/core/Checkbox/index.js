import styles from "./checkbox.module.css";

const Checkbox = ({
  label = "Check this box",
  onCheck = () => {},
  isSelected = false,
}) => {
  return (
    <div className={styles.component_container} onClick={onCheck}>
      <section
        className={`${styles.checkbox_wrapper} ${
          isSelected && styles.checkbox_wrapper__selected
        }`}
      >
        {isSelected && "✓"}
      </section>
      <p className={styles.checkbox_label}>{label}</p>
    </div>
  );
};

export default Checkbox;
