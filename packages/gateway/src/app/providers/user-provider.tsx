import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";

export type contextProbType = {
  // user: { username: string; password: string };
  user: any;
  setUser: any;
  login: any;
  logoutUser: any;
};

const contextProb: contextProbType = {
  user: null,
  setUser: () => {},
  login: () => {},
  logoutUser: () => {},
};

export const UserContext = createContext<contextProbType>(contextProb);
export const useUser = () => useContext(UserContext);

interface IProps {
  children: React.ReactNode;
}
const UserProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
