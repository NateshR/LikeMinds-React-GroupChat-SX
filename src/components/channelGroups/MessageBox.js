import {
  Box,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext, userObj } from "../..";
import {
  addReaction,
  getString,
  getUserLink,
  getUsername,
  linkConverter,
  tagExtracter,
} from "../../sdkFunctions";
import { Link, useNavigate } from "react-router-dom";
import { myClient } from "../..";
import ReportConversationDialogBox from "../reportConversation/ReportConversationDialogBox";
import emojiIcon from "../../assets/emojioption.png";
import pdfIcon from "../../assets/svg/pdf-document.svg";
import EmojiPicker from "emoji-picker-react";
import { GroupContext } from "../Groups/Groups";
import { groupPersonalInfoPath } from "./../../routes";
import { CurrentSelectedConversationContext } from "../groupChatArea/GroupChatArea";
import parse from "html-react-parser";

function MessageBox({
  username,
  messageString,
  time,
  userId,
  attachments,
  convoId,
  conversationReactions,
  conversationObject,
  replyConversationObject,
}) {
  return (
    <div>
      <Box className="flex">
        <StringBox
          username={username}
          messageString={messageString}
          time={time}
          userId={userId}
          attachments={attachments}
          replyConversationObject={replyConversationObject}
        />
        <MoreOptions convoId={convoId} convoObject={conversationObject} />
      </Box>
      <div>
        {conversationReactions.map((reactionObject, reactionObjectIndex) => {
          return (
            <ReactionIndicator
              reaction={reactionObject.reaction}
              key={reactionObjectIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

function ReactionIndicator({ reaction }) {
  return <span className="text-normal mx-1">{reaction}</span>;
}

function StringBox({
  username,
  messageString,
  time,
  userId,
  attachments,
  replyConversationObject,
}) {
  const ref = useRef(null);
  const groupContext = useContext(GroupContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [displayMediaModal, setDisplayMediaModel] = useState(false);
  // let shouldOPenModel = Boolean(displayMediaModal);
  const [mediaData, setMediaData] = useState(null);
  // console.log(userId);
  // console.log(userContext.currentUser.id);
  return (
    <div
      className="flex flex-col py-[16px] px-[20px] min-w-[282px] max-w-[350px] border-[#eeeeee] rounded-[10px] break-all"
      style={{
        background:
          userId === userContext.currentUser.id ? "#ECF3FF" : "#FFFFFF",
      }}
    >
      <DialogBoxMediaDisplay
        shouldOpen={displayMediaModal}
        onClose={() => setDisplayMediaModel(false)}
        mediaData={mediaData}
      />
      <div className="flex w-full justify-between mb-1 clear-both">
        <div className="text-[12px] leading-[14px] text-[#323232] font-[700]">
          <Link
            to={groupPersonalInfoPath}
            state={{
              communityId: groupContext.activeGroup.community.id,
              memberId: userId,
            }}
          >
            {userId === userContext.currentUser.id ? "You" : username}
          </Link>
        </div>
        <div className="text-[10px] leading-[12px] text-[#323232] font-[300]">
          {time}
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="w-full mb-1">
          {(() => {
            if (attachments !== null && attachments.length < 2) {
              return attachments
                .filter((item, itemIndex) => {
                  return item.type === "image";
                })
                .map((item, itemIndex) => {
                  return (
                    <img
                      src={item.url}
                      alt=""
                      className="m-1 w-full max-h-[230px]"
                      key={item.url}
                      onClick={() => {
                        console.log("clicked");
                        setMediaData(item.url);
                        setDisplayMediaModel(true);
                      }}
                    />
                  );
                });
            }
            return null;
          })()}
          {attachments != null && attachments.length > 1
            ? attachments
                .filter((item, itemIndex) => {
                  return item.type === "image" && itemIndex < 2;
                })
                .map((item, itemIndex) => {
                  return (
                    <img
                      src={item.url}
                      alt=""
                      className="m-1 max-w-[135px] max-h-[135px] float-left"
                      key={item.url}
                      onClick={() => {
                        console.log("clicked");
                        setMediaData(item.url);
                        setDisplayMediaModel(true);
                      }}
                    />
                  );
                })
            : null}

          {attachments != null
            ? attachments
                .filter((item, itemIndex) => {
                  return item.type === "audio";
                })
                .map((item, itemIndex) => {
                  return (
                    <audio
                      controls
                      src={item.url}
                      className="my-2 w-[230]"
                      key={item.url}
                    >
                      {" "}
                      <a href={item.url}>Download audio</a>
                    </audio>
                  );
                })
            : null}
          {attachments !== null
            ? attachments
                .filter((item, itemIndex) => {
                  return item.type === "pdf";
                })
                .map((item, itemIndex) => {
                  return (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-2 w-[200px] flex"
                      key={item.url}
                    >
                      <img src={pdfIcon} alt="pdf" className="w-[24px]" />
                      <span className="text-[#323232] text-[14px] ml-2 mt-1">
                        {item.name}
                      </span>
                      <br />
                    </a>
                  );
                })
            : null}

          {attachments != null
            ? attachments
                .filter((item, itemIndex) => {
                  return item.type === "video";
                })
                .map((item, itemIndex) => {
                  return (
                    <video
                      controls
                      className="my-2 w-[200] h-max-[200px] "
                      key={item.url}
                    >
                      <source src={item.url} type="video/mp4" />
                      <source src={item.url} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  );
                })
            : null}
        </div>

        {replyConversationObject != null ? (
          <div className="flex flex-col border-[1px] border-l-[5px] border-[#70A9FF] py-1 px-2 rounded-[5px] mb-1">
            <div className="text-[#70A9FF] font-bold text-[12px]">
              {replyConversationObject?.member?.name}
            </div>
            <div className="text-[#323232] font-[300] text-[12px]">
              {replyConversationObject?.answer}
            </div>
          </div>
        ) : null}

        <div className="text-[14px] w-full font-[300] text-[#323232]">
          <span className="msgCard" ref={ref}>
            {parse(
              linkConverter(
                tagExtracter(messageString, groupContext, userId, navigate)
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ time }) {
  return (
    <span
      style={{
        fontSize: "10px",
        fontWeight: 300,
        color: "#323232",
      }}
    >
      {time}
    </span>
  );
}

function MoreOptions({ convoId, userId, convoObject }) {
  const [anchor, setAnchor] = useState(null);
  const [shouldShow, setShouldShowBlock] = useState(false);
  let open = Boolean(anchor);
  const [anchorEl, setAnchorEl] = useState(null);
  const ref2 = useRef(null);
  const handleOpen = () => {
    setAnchorEl(ref.current);
  };
  const handleCloseEmoji = () => {
    setAnchorEl(null);
  };
  const ref = useRef(null);
  const groupContext = useContext(GroupContext);
  useState(() => {
    const handleCloseFunction = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAnchor(null);
      }
    };
    document.addEventListener("click", handleCloseFunction);
    return () => {
      document.removeEventListener("click", handleCloseFunction);
    };
  });
  async function onClickhandlerReport(id, reason, convoid) {
    try {
      const deleteCall = await myClient.pushReport({
        tag_id: id,
        reason: reason,
        conversation_id: convoid,
      });
      setShouldShowBlock(!shouldShow);
      console.log(deleteCall);
    } catch (error) {
      console.log(error);
    }
  }
  const selectedConversationContext = useContext(
    CurrentSelectedConversationContext
  );
  const options = [
    {
      title: "Reply",
      clickFunction: (e) => {
        selectedConversationContext.setIsSelected(true);
        console.log(selectedConversationContext);
        console.log(convoObject);
        selectedConversationContext.setConversationObject(convoObject);
      },
    },
    {
      title: "Message privately",
      clickFunction: null,
    },
    {
      title: "Report",
      clickFunction: () => {
        setShouldShowBlock(!shouldShow);
      },
    },
  ];

  return (
    <Box className="flex items-center">
      <IconButton ref={ref2} onClick={handleOpen}>
        <img src={emojiIcon} alt="emo" width={"20px"} height="20px" />
      </IconButton>
      <IconButton
        ref={ref}
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
        className="my-auto"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchor}>
        {options.map((option, optionIndex) => {
          return (
            <MenuItem key={option.title} onClick={option.clickFunction}>
              <div className="text-[#323232] font-[400] text-[14px]">
                {option.title}
              </div>
            </MenuItem>
          );
        })}
      </Menu>
      <Dialog
        open={shouldShow}
        onClose={() => {
          setShouldShowBlock(false);
        }}
      >
        <ReportConversationDialogBox
          convoId={convoId}
          shouldShow={shouldShow}
          onClick={onClickhandlerReport}
          closeBox={() => {
            setShouldShowBlock(false);
          }}
        />
      </Dialog>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseEmoji}
      >
        <EmojiPicker
          onEmojiClick={(e) => {
            addReaction(e.emoji, convoId, groupContext.activeGroup.id)
              .then((r) => console.log(r))
              .catch((e) => console.log(e));
            handleCloseEmoji();
          }}
        />
      </Menu>
    </Box>
  );
}

function DialogBoxMediaDisplay({ onClose, shouldOpen, mediaData }) {
  return (
    <Dialog open={shouldOpen} onClose={onClose}>
      The data for dialog is in mediaData prop
    </Dialog>
  );
}

export default MessageBox;
