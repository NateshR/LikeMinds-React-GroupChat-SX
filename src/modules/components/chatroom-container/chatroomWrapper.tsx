import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatContainer from ".";
import ChatroomContext from "../../contexts/chatroomContext";
import { GeneralContext } from "../../contexts/generalContext";
import Tittle from "../chatroom-title";
import SelectChatroom from "../select-chatroom";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../../contexts/userContext";
import { log } from "../../../sdkFunctions";
import GroupInfo from "../chatroom-info";

const ChatroomWrapper: React.FC = () => {
  const [conversationList, setConversationList] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState({});
  const [isSelectedConversation, setIsSelectedConversation] = useState(false);
  const generalContext = useContext(GeneralContext);
  const userContext = useContext(UserContext);
  const { mode, operation = "" } = useParams();
  function getChatroomDisplayName() {
    if (mode == "groups") {
      return;
    }
    let currentUserId = userContext?.currentUser?.id;
    let generalContextUserIds = generalContext?.currentChatroom?.member?.id;
    if (currentUserId === generalContextUserIds)
      return generalContext?.currentChatroom?.chatroom_with_user?.name;
    else return generalContext?.currentChatroom?.member?.name;
  }
  return (
    <ChatroomContext.Provider
      value={{
        conversationList,
        setConversationList,
        selectedConversation,
        setSelectedConversation,
        isSelectedConversation,
        setIsSelectedConversation,
      }}
    >
      {operation != "" && generalContext.showLoadingBar == false ? (
        <Tittle
          title={
            mode === "groups"
              ? generalContext?.currentChatroom?.header
              : getChatroomDisplayName()
          }
          memberCount={
            mode == "groups"
              ? generalContext?.currentProfile?.participant_count
              : null
          }
          chatroomUrl={generalContext.chatroomUrl}
        />
      ) : null}
      {getChatroomComponents(operation)}
    </ChatroomContext.Provider>
  );
};

const getChatroomComponents = (operation: string) => {
  switch (operation) {
    case "/":
      return <SelectChatroom />;
    case "main":
      return <ChatContainer />;
    case "info":
      return <GroupInfo />;
    case "personal-info":
      return null;
    // case 'invitation': return <InvitationScreen/>
    default:
      return <SelectChatroom />;
  }
};

const setDmChatAreaScreen = (
  mode: any,
  generalContext: any,
  userContext: any
) => {
  if (mode == "groups") {
    return <ChatContainer />;
  }
  if (mode == "direct-messages") {
    if (generalContext?.currentChatroom?.id) {
      const { chat_request_state, chat_requested_by } =
        generalContext.currentChatroom;
      if (chat_request_state == 0) {
      }
    }
  }
};

export default ChatroomWrapper;
