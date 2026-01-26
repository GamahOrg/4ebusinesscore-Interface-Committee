import { createContext, useState, useContext } from "react";

type ContextProbType = {
  showToolBox: boolean;
  setShowToolBox: (show: boolean) => void;
  showMyFavorite: boolean;
  setShowMyFavorite: (show: boolean) => void;
  showAuthorityAdministration: boolean;
  setShowAuthorityAdministration: (show: boolean) => void;
};
const contextProb: ContextProbType = {
  showToolBox: false,
  setShowToolBox: () => {},
  showMyFavorite: false,
  setShowMyFavorite: () => {},
  showAuthorityAdministration: false,
  setShowAuthorityAdministration: () => {},
};

export const ToolbarContext = createContext<ContextProbType>(contextProb);
export const useToolbar = () => useContext(ToolbarContext);

const ToolbarProvider = ({ children }) => {
  const [showToolBox, setShowToolBox] = useState(false);
  const [showMyFavorite, setShowMyFavorite] = useState(false);
  const [showAuthorityAdministration, setShowAuthorityAdministration] =
    useState(false);

  return (
    <ToolbarContext.Provider
      value={{
        showToolBox,
        setShowToolBox,
        showMyFavorite,
        setShowMyFavorite,
        showAuthorityAdministration,
        setShowAuthorityAdministration,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

export default ToolbarProvider;
