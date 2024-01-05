import { createContext, useContext, useState } from "react";

const CreateContext = createContext();

const ToggleCallsContext = ({ children }) => {
  const [activity, setActivity] = useState(0);

  return (
    <CreateContext.Provider value={{ activity, setActivity }}>
      {children}
    </CreateContext.Provider>
  );
};

export default ToggleCallsContext;

export const UseToggleCallsContext = () => {
  return useContext(CreateContext);
};
