import { createContext, useContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";

const Start_time2Context = createContext();

export function Start_time2Provider({ children }) {
  const [start_time2, setStart_time2] = useState(new DateObject());
  return (
    <Start_time2Context.Provider value={{ start_time2, setStart_time2 }}>
      {children}
    </Start_time2Context.Provider>
  );
}

export const useStart_time2 = () => useContext(Start_time2Context);