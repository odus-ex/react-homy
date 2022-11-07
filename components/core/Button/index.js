import styles from "./button.module.css";
const Button = ({
  label = "Button",
  onClick = () => {},
  variant = "primary",
  isDisabled = false,
  loading = false,
}) => {
  const variantToCssClass = {
    primary: "variant_primary",
    secondary: "variant_secondary",
    disabled: "variant_disabled",
  };

  return (
    <div className={styles.component_container}>
      <button
        className={`${
          isDisabled
            ? `${styles.component__disabled}`
            : styles[variantToCssClass[variant]]
        }`}
        onClick={isDisabled ? () => {} : onClick}
      >
        {loading ? "..." : label.toUpperCase()}
      </button>
    </div>
  );
};

export default Button;
