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
