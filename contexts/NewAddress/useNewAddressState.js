import { useState } from "react";
import { rentalTypes, ameneties } from "./assets";
import { addToCollection } from "../../controllers/firebase";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";

export const useNewAddressState = () => {
  //states
  const [listingDetails, setListingDetails] = useState({
    name: "",
    description: "",
    type: "bunglow",
    houseNumber: "",
    streetName: "",
    pincode: "",
    addressString: "",
    coordinates: {
      x: "",
      y: "",
    },
    dawaId: "",
    price: "",
    ameneties: [],
    floorplan: {
      rooms: 1,
      baths: 1,
    },
  });
  const [activeView, setActiveView] = useState(0);
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    type: "",
    houseNumber: "",
    streetName: "",
    pincode: "",
    addressString: "",
    coordinates: {
      x: "",
      y: "",
    },
    dawaId: "",
    price: "",
    ameneties: [],
    floorplan: {
      rooms: "",
      baths: "",
    },
  });
  const [debouncedAddressString] = useDebounce(
    listingDetails.addressString,
    1000
  );
  const [isAddressWashing, setIsAddressWashing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [debouncedPincode] = useDebounce(listingDetails.pincode, 1000);
  const router = useRouter();

  //form handlers
  const handleInputChange = (e) => {
    //set error if empty
    if (e.target.value.length === 0) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: `${e.target.name} cannot be empty`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
    //set the value
    setListingDetails({
      ...listingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRentalTypeSelect = (option) => {
    setListingDetails({ ...listingDetails, type: option.value });
  };

  const handleAmenetiesMultiSelect = (option) => {
    let selectedOption = option.value;
    //remove if already selected
    if (listingDetails.ameneties.includes(selectedOption)) {
      setListingDetails({
        ...listingDetails,
        ameneties: listingDetails.ameneties.filter(
          (option) => option !== selectedOption
        ),
      });
      //add if not selected
    } else {
      setListingDetails({
        ...listingDetails,
        ameneties: [...listingDetails.ameneties, option.value],
      });
    }
  };

  const handleRoomsIncrement = () => {
    let floorPlanObject = listingDetails.floorplan;

    //maximim error
    if (floorPlanObject.rooms === 10) {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          rooms: "Max limit reached",
        },
      });
      return;
    } else {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          rooms: "",
        },
      });
    }
    setListingDetails({
      ...listingDetails,
      floorplan: { ...floorPlanObject, rooms: floorPlanObject.rooms + 1 },
    });
  };
  const handleRoomsDecrement = () => {
    let floorPlanObject = listingDetails.floorplan;
    if (floorPlanObject.rooms - 1 === 0) {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          rooms: "Minimum 1 required",
        },
      });
      return;
    } else {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          rooms: "",
        },
      });
    }
    setListingDetails({
      ...listingDetails,
      floorplan: { ...floorPlanObject, rooms: floorPlanObject.rooms - 1 },
    });
  };

  const handleBathsIncrement = () => {
    let floorPlanObject = listingDetails.floorplan;
    if (floorPlanObject.baths === 5) {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          baths: "Max limit reached",
        },
      });
      return;
    } else {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          baths: "",
        },
      });
    }
    setListingDetails({
      ...listingDetails,
      floorplan: { ...floorPlanObject, baths: floorPlanObject.baths + 1 },
    });
  };

  const handleBathsDecrement = () => {
    let floorPlanObject = listingDetails.floorplan;
    if (floorPlanObject.baths - 1 === 0) {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          baths: "Minimum 1 required",
        },
      });
      return;
    } else {
      setFormErrors({
        ...formErrors,
        floorplan: {
          ...formErrors.floorplan,
          baths: "",
        },
      });
    }
    setListingDetails({
      ...listingDetails,
      floorplan: { ...floorPlanObject, baths: floorPlanObject.baths - 1 },
    });
  };

  const handleAddressSelect = (option) => {
    setListingDetails({
      ...listingDetails,
      dawaId: option.id,
      ...option.value,
    });
  };

  const handleAddressWashingSelector = () => {
    setIsAddressWashing(!isAddressWashing);
  };

  //view handlers
  const handleNextStep = () => {
    setActiveView(activeView + 1);
  };

  const handlePreviousStep = () => {
    setActiveView(activeView - 1);
  };

  const handleSubmit = () => {
    console.log(listingDetails);
  };

  const handleListingSubmit = async () => {
    if (doesFormHasErrors()) {
      setPublishError(
        "Looks like you have some errors or unfinished data in your form. Please re-visit the listing and try publishing again"
      );
      setTimeout(() => {
        setPublishError("");
      }, 5000);
      return;
    }
    await addToCollection("addresses", listingDetails);
    router.push("/");
  };

  const handleDashboardNavigation = () => {
    router.push("/");
  };

  const doesFormHasErrors = () => {
    let errorsStringArray = Object.values(formErrors).filter((errorString) => {
      if (typeof errorString === "string") {
        return errorString.length > 0;
      }
    });

    if (errorsStringArray.length > 0) return true;

    let uploadedValuesArray = Object.values(listingDetails).filter(
      (valueString) => {
        if (typeof valueString === "string") {
          return valueString.length === 0;
        }
      }
    );

    if (uploadedValuesArray.length > 0) return true;

    return false;
  };

  return {
    activeView,
    listingDetails,
    rentalTypes,
    ameneties,
    formErrors,
    debouncedAddressString,
    debouncedPincode,
    isAddressWashing,
    publishError,
    handleSubmit,
    handleAddressWashingSelector,
    handleRoomsIncrement,
    handleRoomsDecrement,
    handleBathsIncrement,
    handleBathsDecrement,
    handleNextStep,
    handlePreviousStep,
    handleInputChange,
    handleRentalTypeSelect,
    handleAmenetiesMultiSelect,
    handleAddressSelect,
    handleListingSubmit,
    doesFormHasErrors,
    handleDashboardNavigation,
  };
};
