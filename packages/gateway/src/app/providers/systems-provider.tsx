/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";
import { useIntl } from "react-intl";
import { useUser } from "./user-provider";
export type contextProbType = {
  systems: {
    id: number;
    icon: string;
    title: string;
    checked: boolean;
    pathname: string;
    comingSoon: boolean;
    category: string;
  }[];
  setSystems: any;
};

const contextProb: contextProbType = {
  systems: [],
  setSystems: () => {},
};

export const SystemsContext = createContext<contextProbType>(contextProb);
export const useSystems = () => useContext(SystemsContext);

interface IProps {
  children: React.ReactNode;
}

const SystemsProvider: FC<IProps> = ({ children }) => {
  let intl = useIntl();
  let { user } = useUser();

  const [regaChecked, setRegaChecked] = useState(true);
  const [ncvcChecked, setNcvcChecked] = useState(true);
  const [gacChecked, setGacChecked] = useState(true);
  const [explainChecked, setExplainChecked] = useState(true);
  const [rsnfChecked, setRsnfChecked] = useState(true);
  const [itiChecked, setItiChecked] = useState(true);
  const [ppwChecked, setPpwChecked] = useState(true);
  const [idscChecked, setIdscChecked] = useState(true);
  const [userChecked, setUserChecked] = useState(true);

  const [systems, setSystems] = useState<any>(null);

  useEffect(() => {
    if (user?.username === "demo@rega.com") setRegaChecked(false);
    else if (user?.username === "demo@ncvc.com") setNcvcChecked(false);
    else if (user?.username === "demo@gac.com") setGacChecked(false);
    else if (user?.username === "demo@4explain.com") setExplainChecked(false);
    else if (user?.username === "demo@rsnf.com") setRsnfChecked(false);
    else if (user?.username === "demo@iti.com") setItiChecked(false);
    else if (user?.username === "demo@ppw.com") setPpwChecked(false);
    else if (user?.username === "demo@idsc.com") setIdscChecked(false);
    else if (user?.username === "user@4explain.com") setUserChecked(false);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("systems", JSON.stringify(systems));
  }, [systems]);

  return (
    <SystemsContext.Provider
      value={{
        systems,
        setSystems,
      }}
    >
      {children}
    </SystemsContext.Provider>
  );
};

export default SystemsProvider;
