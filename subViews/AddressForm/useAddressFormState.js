import { useEffect, useState } from "react";
import { useNewAddressContext } from "../../contexts/NewAddress/NewAddressContext";

import { addressSearch, addressWasher } from "../../controllers/dawaAPIs";

export const useAddressFormState = () => {
  const [suggestionList, setSuggestionList] = useState([]);
  const {
    debouncedPincode,
    debouncedAddressString,
    isAddressWashing,
    handleAddressSelect,
  } = useNewAddressContext();

  useEffect(() => {
    (async () => {
      if (debouncedPincode && debouncedAddressString && !isAddressWashing) {
        //get suggested addresses
        let fetchedAddresses = await addressSearch(
          debouncedAddressString,
          debouncedPincode
        );
        setSuggestionList(fetchedAddresses);
      }
    })();
  }, [debouncedAddressString, debouncedPincode]);

  useEffect(() => {
    if (isAddressWashing) {
      setSuggestionList([]);
      (async () => {
        //get washed addresses
        let fetchedAddress = await addressWasher(debouncedAddressString);
        if (fetchedAddress !== "Invalid") {
          handleAddressSelect(fetchedAddress);
        }
      })();
    }
  }, [isAddressWashing]);

  return {
    suggestionList,
  };
};
