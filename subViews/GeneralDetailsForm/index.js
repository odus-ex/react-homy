import styles from "./generalDetailsForm.module.css";
import { useNewAddressContext } from "../../contexts/NewAddress/NewAddressContext";

import FormInput from "../../components/core/FormInput";
import Selector from "../../components/core/Selector";
import Counter from "../../components/core/Counter";

const GeneralDetailsForm = () => {
  const {
    listingDetails,
    rentalTypes,
    ameneties,
    formErrors,
    handleInputChange,
    handleRentalTypeSelect,
    handleAmenetiesMultiSelect,
    handleRoomsIncrement,
    handleRoomsDecrement,
    handleBathsIncrement,
    handleBathsDecrement,
  } = useNewAddressContext();

  const { name, description, floorplan } = listingDetails;

  return (
    <div className={styles.form_container}>
      <FormInput
        placeHolder="Name for your listing"
        value={name}
        onChange={handleInputChange}
        name="name"
        label="Name"
        errorLabel={formErrors.name}
      />
      <hr />

      <FormInput
        placeHolder="A short description for your listing"
        value={description}
        onChange={handleInputChange}
        name="description"
        label="Description"
        errorLabel={formErrors.description}
      />

      <Selector
        heading="Select rental type"
        options={rentalTypes}
        onOptionSelect={handleRentalTypeSelect}
        selectedOptions={[listingDetails.type]}
      />
      <Selector
        heading="Select available ameneties"
        options={ameneties}
        onOptionSelect={handleAmenetiesMultiSelect}
        selectedOptions={listingDetails.ameneties}
      />
      <hr />
      <section className={styles.floorplan_container}>
        <Counter
          label="Available Rooms"
          currentValue={floorplan.rooms}
          handleIncrement={handleRoomsIncrement}
          handleDecrement={handleRoomsDecrement}
          errorLabel={formErrors.floorplan.rooms}
        />
        <Counter
          label="Available Baths"
          currentValue={floorplan.baths}
          handleIncrement={handleBathsIncrement}
          handleDecrement={handleBathsDecrement}
          errorLabel={formErrors.floorplan.baths}
        />
      </section>
    </div>
  );
};

export default GeneralDetailsForm;
