export const getSearchResults = (allAddressesArray, searchedTerm) => {
  let searchedResults = [];
  try {
    let washedSearchBlob = searchedTerm.trim().toLowerCase();
    allAddressesArray.forEach((addressObject) => {
      const { name, addressString, ameneties, price, type } = addressObject;
      let searchDomain = [name, addressString, ...ameneties, price, type]
        .join(" ")
        .toLocaleLowerCase();
      if (searchDomain.search(washedSearchBlob) >= 0) {
        searchedResults.push(addressObject);
      }
    });
  } catch (err) {
    //send this to monitoring...
    console.log("Oops...error in search!");
  } finally {
    return searchedResults;
  }
};

export const doesFormHasErrors = (formErrors, listingDetails) => {
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
