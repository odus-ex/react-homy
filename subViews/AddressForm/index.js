import styles from "./addressForm.module.css";

import FormInput from "../../components/core/FormInput";
import DropDown from "../../components/core/Dropdown";
import { useNewAddressContext } from "../../contexts/NewAddress/NewAddressContext";
import { useAddressFormState } from "./useAddressFormState";

const AddressForm = () => {
  const { listingDetails, formErrors, handleInputChange, handleAddressSelect } =
    useNewAddressContext();

  const { pincode, addressString } = listingDetails;

  const { suggestionList } = useAddressFormState();

  return (
    <div className={styles.component_container}>
      <section className={styles.form_container}>
        <h2>
          Enter a valid postal code, then start typing your address to see a
          valid suggestion below
        </h2>
        <section className={styles.address_input_container}>
          <div className={styles.postal_input_wrapper}>
            <FormInput
              placeHolder="Enter a valid postal code"
              value={pincode}
              onChange={handleInputChange}
              name="pincode"
              type="number"
              label="Postal Code"
              errorLabel={formErrors.pincode}
            />
          </div>
          <div className={styles.address_string_input_wrapper}>
            <FormInput
              placeHolder="Start typing your address here"
              value={addressString}
              onChange={handleInputChange}
              name="addressString"
              label="Address"
              errorLabel={formErrors.addressString}
            />
          </div>
        </section>

        <section className={styles.address_suggestion_container}>
          <DropDown
            options={suggestionList}
            handleSelectOption={handleAddressSelect}
            heading="Select your address from the below suggestions"
          />
        </section>
        <hr />
        {/* <section className={styles.address_support_container}>
          <h3> Cannot find your address?</h3>
          <p className={styles.user_tip}>
            Do not worry. Type your full address above and continue with
            uploading the form, someone from our support team will reach you out
          </p>
          <Checkbox
            label="Help me validate my address"
            isSelected={isAddressWashing}
            onCheck={handleAddressWashingSelector}
          />
        </section> */}
      </section>
    </div>
  );
};

export default AddressForm;
