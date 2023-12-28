import { createContext, useContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";


const Start_time1Context = createContext();

export function Start_time1Provider({ children }) {
  const [start_time1, setStart_time1] = useState(new DateObject());
  return (
    <Start_time1Context.Provider value={{ start_time1, setStart_time1 }}>
      {children}
    </Start_time1Context.Provider>
  );
}

export const useStart_time1 = () => useContext(Start_time1Context);