const baseURL = `https://api.dataforsyningen.dk`;
let body = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const addressWasher = async (addressString) => {
  //category A is exact match, category B is acceptable
  let url = `${baseURL}/datavask/adresser?betegnelse=${addressString}`;

  let washedAddresses = [];

  try {
    let res = await fetch(url, body);
    let jsonResponse = await res.json();
    if (jsonResponse.kategori === "C") {
      //notification to customer team
      return "Invalid";
    }
    //accept the washed address
    washedAddresses = jsonResponse.resultater[0].adresse;
  } catch (err) {
    console.log("Oops error in address washer API...");
  } finally {
    return washedAddresses;
  }
};

export const addressFinder = async (postCode, streetName, houseNumber) => {
  let url = `${baseURL}/adresser?postnr=${postCode}&husnr=${houseNumber}&vejnavn=${streetName}&struktur=mini`;

  try {
    let possibleAddressMatchers = [];
    let res = await fetch(url, body);
    let jsonResponse = await res.json();
    if (jsonResponse.length === 0) {
      return [];
    } else {
      jsonResponse.forEach((addressObject) => {
        possibleAddressMatchers.push({
          id: addressObject.id,
          label: addressObject.betegnelse,
          value: addressObject,
        });
      });
    }
  } catch (err) {
    console.log("Oops error in address finder API...", err);
  } finally {
    return possibleAddressMatchers;
  }
};

export const addressSearch = async (queryString, postNumber) => {
  let url = `${baseURL}/adresser/autocomplete?q=${queryString}&postnr=${postNumber}`;
  let possibleAddressMatchers = [];
  try {
    let res = await fetch(url, body);
    let jsonResponse = await res.json();
    if (jsonResponse.length === 0) {
      return [];
    } else {
      jsonResponse.forEach((addressObject) => {
        const { id, husnr, adresseringsvejnavn, x, y } = addressObject.adresse;
        possibleAddressMatchers.push({
          id,
          label: addressObject.tekst,
          value: {
            id,
            houseNumber: husnr,
            streetName: adresseringsvejnavn,
            addressString: addressObject.tekst,
            coordinates: {
              x,
              y,
            },
          },
        });
      });
      return possibleAddressMatchers;
    }
  } catch (err) {
    //goes to monitoring and logging..
    console.log("Oops in address search API...", err);
  } finally {
    return possibleAddressMatchers;
  }
};
