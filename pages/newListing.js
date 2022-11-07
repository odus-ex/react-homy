import NewAddressProvider from "../contexts/NewAddress/NewAddressContext";
import NewListingView from "../views/newListing";

const NewListing = () => (
  <NewAddressProvider>
    <NewListingView />
  </NewAddressProvider>
);

export default NewListing;
