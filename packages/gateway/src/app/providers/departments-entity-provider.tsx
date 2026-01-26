import React, { createContext, useContext, useState } from "react";
interface IProps {
  children: React.ReactNode;
}

interface Adminstration {
  id: number;
  title: string;
  name: string;
  icon: React.ReactNode;
  isShow: boolean;
}

interface DepartmentsContextType {
  getAdminstrationList: Adminstration[];
  setAdminstrationList: React.Dispatch<React.SetStateAction<Adminstration[]>>;
}

const defaultContextValue: DepartmentsContextType = {
  getAdminstrationList: [],
  setAdminstrationList: () => {},
};

export const DepartmentsEntityContext =
  createContext<DepartmentsContextType>(defaultContextValue);
  export const useDepartments = () => useContext(DepartmentsEntityContext);

const DepartmentsEntityProvider: React.FC<IProps> = ({
  children,
}) => {
  const [getAdminstrationList, setAdminstrationList] = useState<
    Adminstration[]
  >([]);

  return (
    <DepartmentsEntityContext.Provider
      value={{ getAdminstrationList, setAdminstrationList }}
    >
      {children}
    </DepartmentsEntityContext.Provider>
  );
};
export default DepartmentsEntityProvider;

