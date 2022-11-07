import { addressSearch } from "../controllers/dawaAPIs";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const mockPostalCode = "5300";

// demo tests to mock API fails

test("Search addresses for an empty address string with post code", async () => {
  const addressData = await addressSearch("", mockPostalCode);
  expect(addressData).toEqual([]);
});

test("Search addresses for an address string without post code", async () => {
  const addressData = await addressSearch("Fjordvej 2, 5300 Kerteminde", "");
  expect(addressData).toEqual([]);
});

test("Search addresses for an empty address string and without post code", async () => {
  const addressData = await addressSearch("", "");
  expect(addressData).toEqual([]);
});
