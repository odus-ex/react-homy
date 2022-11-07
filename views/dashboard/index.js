import { useDashboardState } from "./useDashboardState";
import styles from "./dashboard.module.css";

import Button from "../../components/core/Button";
import SearchInput from "../../components/core/SearchInput";
import AddressCard from "../../components/core/AddressCard";

const DashboardView = () => {
  const {
    allAddresses,
    searchedTerm,
    loadingAddresses,
    processDelete,
    handleCreateNewListing,
    handleListingSearch,
    handleAddressDelete,
  } = useDashboardState();

  const renderLoadingOrEmptyState = () => {
    if (searchedTerm.length) {
      return <h1> No listings match for '{searchedTerm}'</h1>;
    } else if (loadingAddresses) {
      return <h1>Loading...</h1>;
    }
    return <h1> Start creating a listing</h1>;
  };

  return (
    <div className={styles.view_container}>
      <section className={styles.user_action_container}>
        <div className={styles.search_wrapper}>
          <SearchInput
            searchedTerm={searchedTerm}
            handleOnSearch={handleListingSearch}
            placeholder="Search for name, type or address here.."
          />
        </div>
        <Button
          label="create"
          onClick={handleCreateNewListing}
          variant="secondary"
          loading={processDelete}
        />
      </section>
      <section className={styles.listing_summary_container}>
        {loadingAddresses ? (
          <h4>Loading your addresses..</h4>
        ) : (
          <h4>Welcome, you have {allAddresses.length} Listing(s)</h4>
        )}
      </section>
      <section className={styles.listing_container}>
        {!loadingAddresses && allAddresses.length
          ? allAddresses.map((addressObject) => (
              <AddressCard
                key={addressObject.id}
                addressObject={addressObject}
                handleDelete={handleAddressDelete}
              />
            ))
          : renderLoadingOrEmptyState()}
      </section>
    </div>
  );
};

export default DashboardView;
