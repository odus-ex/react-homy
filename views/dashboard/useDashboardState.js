import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { deleteDocument, getAllDocuments } from "../../controllers/firebase";
import { getSearchResults } from "../../controllers/utils";

export const useDashboardState = () => {
  const [allAddresses, setAllAddresses] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [deleteAddress, setDeleteAddress] = useState("");
  const [processDelete, setProcessDelete] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  let allAddressesCached = useRef([]);
  const router = useRouter();

  //load all the listings
  useEffect(() => {
    setLoadingAddresses(true);
    (async () => {
      let allAddressesArray = await getAllDocuments("addresses");
      setAllAddresses(allAddressesArray);
      allAddressesCached.current = allAddressesArray;
      setLoadingAddresses(false);
    })();
  }, [deleteAddress]);

  useEffect(() => {
    if (searchedTerm.length) {
      let searchedAddress = getSearchResults(
        allAddressesCached.current,
        searchedTerm
      );
      setAllAddresses(searchedAddress);
    } else {
      setAllAddresses(allAddressesCached.current);
    }
  }, [searchedTerm]);

  const handleListingSearch = (e) => {
    setSearchedTerm(e.target.value);
  };

  const handleCreateNewListing = async () => {
    router.push("/newListing");
  };

  const handleAddressDelete = async (addressId) => {
    // await deleteDocument("addresses", addressId);
    setProcessDelete(true);
    deleteDocument("addresses", addressId).then((res) =>
      setProcessDelete(false)
    );
    setDeleteAddress(addressId);
  };

  return {
    allAddresses,
    searchedTerm,
    loadingAddresses,
    processDelete,
    handleCreateNewListing,
    handleListingSearch,
    handleAddressDelete,
  };
};
