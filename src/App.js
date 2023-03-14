import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import Groups from "./components/group-components/Groups";
import GroupInfo from "./components/group-components/GroupInfo";
import GroupChatArea from "./components/group-components/GroupChatArea";
import AcceptInvite from "./components/extras-and-common/AcceptInvite";
import PersonInfo from "./components/extras-and-common/PersonInfo";
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
import DirectMessagesMain from "./components/direct-messages-components/DirectMessagesMain";
import "./App.css";
import { useEffect, useState } from "react";
import { UserContext } from ".";
import { initiateSDK } from "./sdkFunctions";
import ChatArea from "./components/direct-messages-components/ChatArea";
import Error from "./components/extras-and-common/Error";

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
            path: groupMainPath + "/:status",
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
            path: directMessageChatPath + "/:status",
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
    errorElement: <Error />,
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
    initiateSDK(false, "60d19927-8b66-4f78-af91-c6005950847c", "")
      .then((res) => {
        setCommunity(res?.data?.community);
        setCurrentUser(res?.data?.user);
        sessionStorage.setItem("communityId", res?.data?.community?.id);
      })
      .catch((error) => {
        // // console.log("Error =>", error);
      });
  }, []);

  return (
    <div className="App h-[100vh] flex flex-1">
      <UserContext.Provider
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
      </UserContext.Provider>
      {/* <Block/> */}
    </div>
  );
}

export default App;
