import styles from "./searchInput.module.css";

const SearchInput = ({
  searchedTerm = "",
  handleOnSearch = () => {},
  placeholder = "Search here..",
}) => {
  return (
    <div className={styles.view_container}>
      <input
        type={"text"}
        value={searchedTerm}
        placeholder={placeholder}
        onChange={handleOnSearch}
      />
    </div>
  );
};

export default SearchInput;
