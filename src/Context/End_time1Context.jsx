import { createContext, useContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";

const End_time1Context = createContext();

export function End_time1Provider({ children }) {
  const [end_time1, setEnd_time1] = useState(new DateObject());
  return (
    <End_time1Context.Provider value={{ end_time1, setEnd_time1}}>
      {children}
    </End_time1Context.Provider>
  );
}

export const useEnd_time1 = () => useContext(End_time1Context);