import React from "react";
import { Start_time1Provider } from "Context/Start_time1Context";
import { End_time1Provider } from "Context/End_time1Context";
import { Start_time2Provider } from "Context/Start_time2Context";
import { End_time2Provider } from "Context/End_time2Context";

function MainProvider({children}) {
    return(
        <Start_time1Provider>
        <End_time1Provider>
        <Start_time2Provider>
          <End_time2Provider>
            {children}
          </End_time2Provider>
          </Start_time2Provider>
          </End_time1Provider>
        </Start_time1Provider>
    )
};

export default MainProvider;