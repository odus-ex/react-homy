import styles from "./priceForm.module.css";
import { useNewAddressContext } from "../../contexts/NewAddress/NewAddressContext";

import FormInput from "../../components/core/FormInput";
import Button from "../../components/core/Button";

const PriceForm = () => {
  const {
    listingDetails,
    formErrors,
    handleInputChange,
    handleListingSubmit,
    publishError,
  } = useNewAddressContext();

  const { price } = listingDetails;

  return (
    <div className={styles.component_container}>
      <h2> Select a price for your listing</h2>
      <div className={styles.price_input_container}>
        <FormInput
          placeHolder="Enter a price for your listing"
          label="Price"
          type="number"
          name="price"
          onChange={handleInputChange}
          value={price}
          errorLabel={formErrors.price}
        />
      </div>

      <section className={styles.price_suggestion_container}>
        Rentals similar to this in your area has a price range of:
        <h4>$300 to $400</h4>
      </section>

      <section className={styles.publishing_error_container}>
        <h4>{publishError && publishError}</h4>
      </section>

      <Button label={"Publish your listing"} onClick={handleListingSubmit} />
    </div>
  );
};

export default PriceForm;
