import { createContext, useContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";

const End_time2Context = createContext();

export function End_time2Provider({ children }) {
  const [end_time2, setEnd_time2] = useState(new DateObject());
  return (
    <End_time2Context.Provider value={{ end_time2, setEnd_time2 }}>
      {children}
    </End_time2Context.Provider>
  );
}

export const useEnd_time2 = () => useContext(End_time2Context);