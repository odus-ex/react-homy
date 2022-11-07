export const getSearchResults = (allAddressesArray, searchedTerm) => {
  let searchedResults = [];
  let washedSearchBlob = searchedTerm.toLowerCase();
  allAddressesArray.forEach((addressObject) => {
    const { name, addressString, ameneties, price, type } = addressObject;
    let searchDomain = [name, addressString, ...ameneties, price, type]
      .join(" ")
      .toLocaleLowerCase();
    console.log("search domain..", searchDomain);
    if (searchDomain.search(washedSearchBlob) >= 0) {
      searchedResults.push(addressObject);
    }
  });
  return searchedResults;
};
