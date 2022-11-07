import styles from "./formInput.module.css";

const FormInput = ({
  value = "",
  label = "Input label",
  onChange = () => {},
  placeHolder = "placeholder text",
  name = "_input",
  type = "text",
  errorLabel = "",
}) => {
  return (
    <div className={styles.component_container}>
      <section className={styles.meta_data_container}>
        <label for={name}>{label}</label>
        <span>{errorLabel && errorLabel}</span>
      </section>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        name={name}
      />
    </div>
  );
};

export default FormInput;
