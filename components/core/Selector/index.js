import styles from "./selector.module.css";

const Selector = ({
  heading = "Select one or multiple option",
  //one or multiple type depends on selectdOptions and onOptionSelect implementation
  options = [
    {
      id: 1,
      label: "Option 1",
      value: "one",
    },
    {
      id: 1,
      label: "Option 1",
      value: "one",
    },
  ],
  onOptionSelect = () => {},
  selectedOptions = [],
}) => {
  const getSelectedStyles = (option) => {
    let selectedClassNames = "";

    selectedOptions.forEach((optionValue) => {
      if (optionValue.toLowerCase() === option.value.toLowerCase()) {
        selectedClassNames = `${styles.option_wrapper__selected}`;
      }
    });
    return selectedClassNames;
  };

  return (
    <div className={styles.component_container}>
      <h4>{heading}</h4>
      <section className={styles.options_container}>
        {options.map((option) => (
          <div
            key={option.id}
            className={`${styles.option_wrapper} ${getSelectedStyles(option)}`}
            onClick={() => onOptionSelect(option)}
          >
            {option.label}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Selector;
