import styles from "./newListing.module.css";
import { useNewAddressContext } from "../../contexts/NewAddress/NewAddressContext";

import dynamic from "next/dynamic";
import WithSuspense from "../../components/HOCs/WithSuspense";

import Button from "../../components/core/Button";
const AsyncAddressForm = dynamic(() => import("../../subViews/AddressForm"), {
  ssr: false,
});
const AsyncGeneralDetailsForm = dynamic(
  () => import("../../subViews/GeneralDetailsForm"),
  {
    ssr: false,
  }
);
const AsyncPriceForm = dynamic(() => import("../../subViews/PriceForm"), {
  ssr: false,
});

const NewListingView = () => {
  const {
    activeView,
    handleNextStep,
    handlePreviousStep,
    handleDashboardNavigation,
  } = useNewAddressContext();

  const stepperViewForm = {
    0: (
      <WithSuspense>
        <AsyncGeneralDetailsForm />
      </WithSuspense>
    ),
    1: (
      <WithSuspense>
        <AsyncAddressForm />
      </WithSuspense>
    ),
    2: (
      <WithSuspense>
        <AsyncPriceForm />
      </WithSuspense>
    ),
  };

  return (
    <div className={styles.view_contianer}>
      <section className={styles.welcome_heading_container}>
        <h2>Create a new listing for your guests</h2>
        <div className={styles.float_button_container}>
          <Button
            label="Cancel"
            variant="secondary"
            onClick={handleDashboardNavigation}
          />
        </div>
      </section>
      <section className={styles.form_container}>
        {stepperViewForm[activeView]}
      </section>
      <section className={styles.navigate_stepper_container}>
        {activeView > 0 && (
          <Button
            onClick={handlePreviousStep}
            label="previous"
            variant="secondary"
          />
        )}
        {activeView < Object.keys(stepperViewForm).length - 1 && (
          <Button label="next" onClick={handleNextStep} />
        )}
      </section>
    </div>
  );
};

export default NewListingView;
