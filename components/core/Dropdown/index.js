import styles from "./dropdown.module.css";

const DropDown = ({
  heading = "Select some options",
  options = [
    {
      id: 1,
      label: "Option 1",
      value: "one",
    },
    {
      id: 2,
      label: "Option 2",
      value: "two",
    },
    {
      id: 3,
      label: "Option 3",
      value: "three",
    },
  ],
  handleSelectOption = () => {},
  noOptionMessage = "No options available",
}) => {
  return (
    <div className={styles.component_container}>
      <h4>{heading}</h4>
      <div className={styles.options_container}>
        {options.length ? (
          options.map((option) => (
            <div
              key={option.id}
              className={styles.option_wrapper}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </div>
          ))
        ) : (
          <h5>{noOptionMessage}</h5>
        )}
      </div>
    </div>
  );
};

export default DropDown;
