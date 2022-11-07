import { getSearchResults } from "../controllers/utils";
const mockAddressList = [
  {
    addressString: "Diget 2, 4600 Køge",
    ameneties: ["heater", "parking"],
    coordinates: { y: 55.45350377, x: 12.17180656 },
    dawaId: "0a3f50ab-6085-32b8-e044-0003ba298018",
    description: "Small apartment for your weekends",
    floorplan: { baths: 2, rooms: 2 },
    houseNumber: "2",
    id: "0a3f50ab-6085-32b8-e044-0003ba298018",
    name: "House 1",
    pincode: "4600",
    price: "320",
    streetName: "Diget",
    type: "studio",
  },
  {
    addressString: "Gammel Lyngvej 5, 4600 Køge",
    ameneties: ["wifi", "heater"],
    coordinates: { y: 55.48254573, x: 12.18466877 },
    dawaId: "0a3f50ab-65fe-32b8-e044-0003ba298018",
    description: "2bhk",
    floorplan: { rooms: 2, baths: 1 },
    houseNumber: "5",
    id: "0a3f50ab-65fe-32b8-e044-0003ba298018",
    name: "Proxy ",
    pincode: "4600",
    price: "300",
    streetName: "Gammel Lyngvej",
    type: "flat",
  },
];

test("Search addresses for a given search term", () => {
  expect(getSearchResults(mockAddressList, "Diget 2")[0]).toMatchObject(
    mockAddressList[0]
  );
});

test("Search addresses for a an empty string", () => {
  expect(getSearchResults(mockAddressList, "")).toMatchObject(mockAddressList);
});

test("Search addresses for a mismatch", () => {
  expect(getSearchResults(mockAddressList, "asdfdsg")).toMatchObject([]);
});
