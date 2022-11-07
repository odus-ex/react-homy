import { createContext, useContext, useState } from "react";
import { useNewAddressState } from "./useNewAddressState";

const NewAddressContext = createContext();

export function useNewAddressContext() {
  return useContext(NewAddressContext);
}

const NewAddressProvider = ({ children }) => {
  const addressState = useNewAddressState();

  return (
    <NewAddressContext.Provider value={addressState}>
      {children}
    </NewAddressContext.Provider>
  );
};

export default NewAddressProvider;
