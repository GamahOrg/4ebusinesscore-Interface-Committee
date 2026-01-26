import React, {
  createContext,
  FC,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Card {
  id: number;
  name: string;
  dept: string;
  title: string;
  icon: JSX.Element;
  subIcon: JSX.Element;
  subTitle: string;
  count: string;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  color: string;
  background: string;
  isShow: boolean;
}

export interface Table {
  id: number;
  name: string;
  dept: string;
  title: string;
  icon: JSX.Element;
  subIcon: JSX.Element;
  subTitle?: string;
  count: string;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  color: string;
  background: string;
  isShow: boolean;
}

interface ToolBoxContextType {
  removeFromCardList: (title: string, isShow: boolean) => void;
  removeFromTableList: (title: string, isShow: boolean) => void;
  getTableList: Table[];
  getCardsList: Card[];
  setTableList: Dispatch<SetStateAction<Table[]>>;
  setCardsList: Dispatch<SetStateAction<Card[]>>;
  getMyToolsList: any[];
  setMyToolsList: Dispatch<SetStateAction<any[]>>;
  workspaceName: string;
  setWorkspaceName: Dispatch<SetStateAction<string>>;
}

const defaultContextValue: ToolBoxContextType = {
  removeFromCardList: () => {},
  removeFromTableList: () => {},
  getTableList: [],
  getCardsList: [],
  getMyToolsList: [],
  workspaceName: "",
  setCardsList: () => {},
  setTableList: () => {},
  setMyToolsList: () => {},
  setWorkspaceName: () => {},
};

// Create Context
export const ToolBoxContext = createContext<ToolBoxContextType>(defaultContextValue);

// Hook to Access Context
export const useToolBox = () => useContext(ToolBoxContext);

// ToolBoxProvider Component
interface ToolBoxProviderProps {
  children: React.ReactNode;
}

const ToolBoxProvider: FC<ToolBoxProviderProps> = ({ children }) => {
  const [getTableList, setTableList] = useState<Table[]>([]);
  const [getCardsList, setCardsList] = useState<Card[]>([]);
  const [getMyToolsList, setMyToolsList] = useState<any[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>("");

  const removeFromCardList = (title: string, isShow: boolean) => {
    setCardsList((prev) =>
      prev.map((card) => (card.title === title ? { ...card, isShow } : card))
    );
  };

  const removeFromTableList = (title: string, isShow: boolean) => {
    setTableList((prev) =>
      prev.map((table) => (table.title === title ? { ...table, isShow } : table))
    );
  };

  return (
    <ToolBoxContext.Provider
      value={{
        removeFromCardList,
        removeFromTableList,
        getTableList,
        setTableList,
        getCardsList,
        setCardsList,
        getMyToolsList,
        setMyToolsList,
        workspaceName,
        setWorkspaceName,
      }}
    >
      {children}
    </ToolBoxContext.Provider>
  );
};

export default ToolBoxProvider;
