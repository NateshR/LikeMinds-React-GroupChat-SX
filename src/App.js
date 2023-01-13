import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import Groups from "./components/Groups/Groups";
import GroupInfo from "./components/Groups/GroupInfo";
import GroupChatArea from "./components/Groups/GroupChatArea";
import AcceptInvite from "./components/Groups/AcceptInvite";
import PersonInfo from "./components/commons/PersonInfo";
import {
  addedByMePath,
  directMessageChatPath,
  directMessageInfoPath,
  directMessagePath,
  eventsPath,
  forumPath,
  groupAcceptInvitePath,
  groupInfoPath,
  groupMainPath,
  groupPath,
  groupPersonalInfoPath,
  mainPath,
} from "./routes";
import DirectMessagesMain from "./components/direct-messages/DirectMessagesMain";
import "./App.css";
import { useEffect, useState } from "react";
import { UserContext_LM } from ".";
import { initiateSDK } from "./sdkFunctions";
import ChatArea from "./components/direct-messages/ChatArea";

const router = createBrowserRouter([
  {
    path: mainPath,
    element: <Main />,
    children: [
      {
        path: forumPath,
        element: null,
      },
      {
        path: groupPath,
        element: <Groups />,
        children: [
          {
            path: groupMainPath,
            element: <GroupChatArea />,
          },
          {
            path: groupInfoPath,
            element: <GroupInfo />,
          },
          {
            path: groupAcceptInvitePath,
            element: <AcceptInvite />,
          },
          {
            path: groupPersonalInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: eventsPath,
        element: null,
      },
      {
        path: directMessagePath,
        element: <DirectMessagesMain />,
        children: [
          {
            path: directMessageChatPath,
            element: <ChatArea />,
          },
          {
            path: directMessageInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: addedByMePath,
        element: null,
      },
    ],
  },
]);

let routesObject = [
  {
    path: mainPath,
    element: <Main />,
    children: [
      {
        path: forumPath,
        element: null,
      },
      {
        path: groupPath,
        element: <Groups />,
        children: [
          {
            path: groupMainPath,
            element: <GroupChatArea />,
          },
          {
            path: groupInfoPath,
            element: <GroupInfo />,
          },
          {
            path: groupAcceptInvitePath,
            element: <AcceptInvite />,
          },
          {
            path: groupPersonalInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: eventsPath,
        element: null,
      },
      {
        path: directMessagePath,
        element: <DirectMessagesMain />,
        children: [
          {
            path: directMessageChatPath,
            element: <ChatArea />,
          },
          {
            path: directMessageInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: addedByMePath,
        element: null,
      },
    ],
  },
];
routesObject.map((item, itemIndex) => {});

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [community, setCommunity] = useState({});
  useEffect(() => {
    initiateSDK(false, "0992885d-a170-494b-80c5-ecaef0cb2a24", "Ankit")
      .then((res) => {
        setCommunity(res?.data?.community);
        setCurrentUser(res?.data?.user);
        sessionStorage.setItem("communityId", res?.data?.community?.id);
      })
      // .then((res) => {
      //   setCommunity(res.data.data.community);
      //   setCurrentUser(res.data.data.user);
      //   sessionStorage.setItem("communityId", res.data.data.community.id);
      // })
      .catch((error) => {
        console.log("Error =>", error);
      });
  }, []);

  return (
    <div className="App h-[100vh] flex flex-1">
      <UserContext_LM.Provider
        value={{
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
          community: community,
          setCommunity: setCommunity,
        }}
      >
        {Object.keys(currentUser).length > 0 ? (
          <>
            <RouterProvider router={router} />
          </>
        ) : null}
      </UserContext_LM.Provider>
      {/* <Block/> */}
    </div>
  );
}

export default App;
