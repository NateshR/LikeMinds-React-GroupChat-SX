import { Box, Button, Collapse, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Typicode from "likeminds-apis-sdk";
import {
  createNewClient,
  getChatRoomDetails,
  getTaggingList,
  getUnjoinedRooms,
  joinChatRoom,
  markRead,
} from "../../../sdkFunctions";
import { myClient, UserContext } from "../../..";
import { Link, NavLink } from "react-router-dom";
import { groupMainPath } from "../../../routes";
// import { GroupContext } from "../Groups";
import cancelIcon from "../../../assets/svg/cancel.svg";
import acceptIcon from "../../../assets/svg/accept.svg";
import { GroupContext } from "../../../Main";

function CurrentGroups() {
  const [chatRoomsList, setChatRoomsList] = useState([]);
  const [unJoined, setUnjoined] = useState([]);
  const groupContext = useContext(GroupContext);
  const [shouldOpenPublicCard, setShouldPublicCard] = useState(false);
  // content to be deleted
  const groupsInfo = [
    {
      title: "Founders Social",
      newUnread: 3,
    },
    {
      title: "Socialize and Stratagize",
      newUnread: 0,
    },
  ];

  const groupsInviteInfo = [
    {
      title: "Founders Social",
      groupType: "private",
    },
    {
      title: "Socialize and Stratagize",
      groupType: "private",
    },
  ];

  // for gettingChatRoom()
  async function getChatRoomData(chatroomId) {
    try {
      const chatRoomData = await getChatRoomDetails(myClient, chatroomId);
      console.log(chatRoomData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // loading the list of chatrooms (already joined)
    const fn = async () => {
      try {
        const feedCall = await myClient.getHomeFeedData({
          communityId: 50421,
          page: 1,
        });

        let chatroomlist = feedCall.my_chatrooms;
        let newChatRoomList = [...chatRoomsList];

        for (let chatroom of chatroomlist) {
          newChatRoomList.push(chatroom);
        }
        console.log(newChatRoomList);
        setChatRoomsList(newChatRoomList);
      } catch (error) {
        console.log(error);
      }
    };
    const getUnjoinedList = async (comm_id) => {
      try {
        const feedCall = await getUnjoinedRooms(comm_id);
        console.log(feedCall);
        setUnjoined(feedCall.data.chatrooms);
      } catch (error) {
        console.log(error);
      }
    };
    fn();
    getUnjoinedList(50421);
  }, []);

  return (
    <Box>
      {<PublicGroup groupList={chatRoomsList} />}

      {groupsInviteInfo.map((group, groupIndex) => {
        return (
          <NavLink key={group.title + groupIndex} to={groupMainPath}>
            <GroupInviteTile
              title={group.title}
              groupType={group.groupType}
              getChatRoomData={getChatRoomData}
            />
          </NavLink>
        );
      })}
      <div className="flex justify-between text-[20px] mt-[10px] py-4 px-5 items-center">
        <span>All Public Groups</span>
        <IconButton onClick={() => setShouldPublicCard(!shouldOpenPublicCard)}>
          {shouldOpenPublicCard ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </IconButton>
      </div>
      <Collapse in={shouldOpenPublicCard}>
        {unJoined.map((group, groupIndex) => {
          return (
            // <Link
            //   to={groupMainPath}
            //   onClick={() => {
            //     getChatRoomData(group.chatroom.id);
            //   }}
            // >
            <UnjoinedGroup
              groupTitle={group.title}
              group={group}
              key={group.title + groupIndex}
            />
            // </Link>
          );
        })}
      </Collapse>
    </Box>
  );
}

function GroupTile({ title, newUnread, getChatRoomData }) {
  return (
    <div
      className="flex justify-between p-[18px] border-t border-b border-[#EEEEEE] bg-inherit"
      onClick={() => {
        getChatRoomData("none");
      }}
    >
      <Typography
        component={"span"}
        className="text-base font-normal"
        sx={{
          color: newUnread > 0 ? "#3884F7" : "#323232",
        }}
      >
        {title}
        {newUnread <= 0 ? (
          <span className="bg-[#FFEFC6] rounded-[4px] px-[6px] py-[5px] text-[#F6BD2A] line-height-[12px] text-[10px] font-medium m-1">
            Private
          </span>
        ) : null}
      </Typography>
      <span
        className="text-xs font-light"
        style={{
          color: newUnread > 0 ? "#3884F7" : "#323232",
        }}
      >
        {newUnread > 0 ? <>{newUnread} new messages</> : null}
      </span>
    </div>
  );
}

function PublicGroup({ groupTitle, groupList }) {
  const [shouldOpen, setShouldOpen] = useState(true);
  function handleCollapse() {
    setShouldOpen(!shouldOpen);
  }

  const groupContext = useContext(GroupContext);

  // for gettingChatRoom()
  async function getChatRoomData(chatroomId) {
    try {
      const chatRoomData = await getChatRoomDetails(myClient, chatroomId);
      if (!chatRoomData.error) {
        const tagCall = await getTaggingList(
          chatRoomData.data.community.id,
          chatRoomData.data.chatroom.id
        );
        console.log(tagCall);
        chatRoomData.data.membersDetail = tagCall.data.members;
        groupContext.setActiveGroup(chatRoomData.data);
      } else {
        console.log(chatRoomData.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box>
      <Collapse
        in={shouldOpen}
        className="border-b border-solid border-[#EEEEEE]"
      >
        {groupList.map((group, groupIndex) => {
          return (
            <Link
              to={groupMainPath}
              onClick={() => {
                getChatRoomData(group.chatroom.id);
              }}
              key={group.chatroom.id + groupIndex}
            >
              <div>
                <PublicGroupTile
                  key={group.chatroom.id + groupIndex}
                  groupTitle={group.chatroom.header}
                  group={group}
                />
              </div>
            </Link>
          );
        })}
      </Collapse>
    </Box>
  );
}

function PublicGroupTile({ groupTitle, group = { group } }) {
  const groupcontext = useContext(GroupContext);
  console.log(group);
  return (
    <div
      onClick={() => {
        markRead(group.chatroom.id);
      }}
      className="flex justify-between py-4 px-5 border-[#EEEEEE] border-t-[1px] items-center"
      style={{
        backgroundColor:
          groupTitle === groupcontext.activeGroup.chatroom?.header
            ? "#ECF3FF"
            : "#FFFFFF",
      }}
    >
      <Typography
        sx={{
          color:
            groupTitle === groupcontext.activeGroup.chatroom?.header
              ? "#3884f7"
              : "#000000",
        }}
        component={"span"}
        className="text-4 text-[#323232] leading-[17px]"
      >
        {groupTitle}
        {group.chatroom?.is_secret === true ? (
          <span className="bg-[#FFEFC6] rounded-[4px] px-[6px] py-[5px] text-[#F6BD2A] line-height-[12px] text-[10px] font-medium m-1">
            Private
          </span>
        ) : null}
      </Typography>

      {group.unseen_conversation_count > 0 &&
      group.chatroom.header !== groupcontext.activeGroup.chatroom?.header ? (
        <span className="text-[#3884f7] text-xs">
          {group.unseen_conversation_count} new messages
        </span>
      ) : null}
    </div>
  );
}

function UnjoinedGroup({ groupTitle, group }) {
  const groupContext = useContext(GroupContext);
  const userContext = useContext(UserContext);
  // console.log(group.id);
  async function getChatRoomData(chatroomId) {
    try {
      const chatRoomData = await getChatRoomDetails(myClient, chatroomId);
      if (!chatRoomData.error) {
        const tagCall = await getTaggingList(
          chatRoomData.data.community.id,
          chatRoomData.data.chatroom.id
        );
        console.log(tagCall);
        chatRoomData.data.membersDetail = tagCall.data.members;
        groupContext.setActiveGroup(chatRoomData.data);
      } else {
        console.log(chatRoomData.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function joinGroup() {
    try {
      let call = await joinChatRoom(
        group.id,
        userContext.currentUser.id,
        groupContext.refreshContextUi
      );
      console.log(call);
      if (call.data.success) {
        groupContext.setActiveGroup(group);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      onClick={() => {
        getChatRoomData(group.id);
      }}
      className="flex justify-between leading-5 py-4 px-5 border-[#EEEEEE] border-t-[1px]"
      style={{
        backgroundColor:
          groupTitle === groupContext.activeGroup.chatroom?.header
            ? "#FFFFFF"
            : "#FFFFFF",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{
          marginTop: "6px",
          color:
            groupTitle === groupContext.activeGroup.chatroom?.header
              ? "#3884f7"
              : "#000000",
        }}
        component={"span"}
        className="text-base font-normal"
      >
        {groupTitle}
      </Typography>
      {!group.follow_status ? (
        <Button
          variant="outlined"
          className="rounded-[5px]"
          onClick={joinGroup}
        >
          Join
        </Button>
      ) : null}
    </div>
  );
}

export default CurrentGroups;

function GroupInviteTile({ title, groupType, getChatRoomData }) {
  return (
    <div
      className="bg-white flex justify-between p-[18px] border-b border-[#EEEEEE]"
      onClick={() => {
        getChatRoomData("none");
      }}
    >
      <Box>
        <Typography
          variant="body2"
          className="text-[#ADADAD] text-xs text-left font-normal"
        >
          You have been invited to
        </Typography>

        <Typography
          component={"p"}
          className="text-[#323232] text-base font-normal"
        >
          {title}
          {groupType === "private" ? (
            <span className="bg-[#FFEFC6] rounded-[4px] px-[6px] py-[5px] text-[#F6BD2A] line-height-[12px] text-[10px] font-medium m-1">
              Private
            </span>
          ) : null}
        </Typography>
      </Box>

      <Box>
        <IconButton disableRipple={true}>
          <img src={cancelIcon} alt="cancel" />
        </IconButton>

        <IconButton disableRipple={true}>
          <img src={acceptIcon} alt="accept" />
        </IconButton>
      </Box>
    </div>
  );
}
