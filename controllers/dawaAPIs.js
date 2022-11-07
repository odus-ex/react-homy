const baseURL = `https://api.dataforsyningen.dk`;
let body = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const addressWasher = async (addressString) => {
  //category A is exact match, category B is acceptable
  //   pändning
  console.log();
  let url = `${baseURL}/datavask/adresser?betegnelse=${addressString}`;

  let res = await fetch(url, body);
  let jsonResponse = await res.json();
  if (jsonResponse.kategori === "C") {
    //notification to customer team
    return "Invalid";
  }
  //accept the washed address
  return jsonResponse.resultater[0].adresse;
};

export const addressFinder = async (postCode, streetName, houseNumber) => {
  let url = `${baseURL}/adresser?postnr=${postCode}&husnr=${houseNumber}&vejnavn=${streetName}&struktur=mini`;

  let res = await fetch(url, body);
  let jsonResponse = await res.json();
  if (jsonResponse.length === 0) {
    return [];
  } else {
    let possibleAddressMatchers = [];
    jsonResponse.forEach((addressObject) => {
      possibleAddressMatchers.push({
        id: addressObject.id,
        label: addressObject.betegnelse,
        value: addressObject,
      });
    });
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
    console.log("Oops in DAWA address search...");
  } finally {
    return possibleAddressMatchers;
  }
};
