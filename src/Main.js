import { createTheme, Grid, ThemeProvider } from "@mui/material";
import React, { useContext, useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext_LM } from ".";
import Header from "./components/header/Header";
import Sidenav from "./components/sidenav/Sidenav";
const newTheme = createTheme({
  typography: {
    fontFamily: ["Lato"],
    body2: {
      fontSize: "12px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
export const GroupContext = React.createContext({
  activeGroup: {},
  setActiveGroup: () => {},
  refreshContextUi: () => {},
});
function Main() {
  const [currentRoute, setCurrentRoute] = useState("forums")
  const [activeGroup, setActiveGroup] = useState({});
  const userContext_LM = useContext(UserContext_LM);
  const [refreshState, setRefreshState] = useState(true);
  function refreshGroups() {
    setRefreshState(!refreshState);
  }
  useEffect(() => {
    if (sessionStorage.getItem("userContext_LM") !== null) {
      if (Object.keys(userContext_LM.currentUser).length) {
        sessionStorage.setItem("userContext_LM", JSON.stringify(userContext_LM));
      } else {
        let c = JSON.parse(sessionStorage.getItem("userContext_LM"));
        userContext_LM.setCurrentUser(c.currentUser);
      }
    } else {
      sessionStorage.setItem("userContext_LM", JSON.stringify(userContext_LM));
    }
  });
  return (
    <RouteContext.Provider value={{
      currentRoute: currentRoute,
      setCurrentRoute: setCurrentRoute
    }}>
    <GroupContext.Provider
      value={{
        activeGroup: activeGroup,
        setActiveGroup: setActiveGroup,
        refreshContextUi: refreshGroups,
      }}
    >
      <ThemeProvider theme={newTheme}>
        <div className="flex w-[100vw] fixed h-[65px] z-10">
          <Header />
        </div>

        <div className="flex flex-1 h-full customHeight mt-[65px]">
          <div className="flex-[.085] border-r-[1px] border-[#eeeeee]">
            <Sidenav />
          </div>
          <div className="flex-[.915]">
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </GroupContext.Provider>
    </RouteContext.Provider>
  );
}

export const RouteContext = createContext({
  currentRoute: "",
  setCurrentRoute: ()=>{}
})

export default Main;
