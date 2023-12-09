import { createContext, useState } from "react";

const Data_box = createContext({});

const Data_provider = ({children}) =>
{

  const [ edit, set_edit ] = useState(false);
  const [ prof_id, set_prof_id ] = useState(null);

  return(
    <Data_box.Provider
      value={{
        edit, set_edit,
        prof_id, set_prof_id                
      }}
    >
      {children}
    </Data_box.Provider>
  )  
};

export { Data_box , Data_provider }