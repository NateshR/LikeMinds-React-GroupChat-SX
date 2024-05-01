import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { REGEX_USER_SPLITTING, REGEX_USER_TAGGING } from "../../../enums/regex";
import { useContext, useState } from "react";
import parse from "html-react-parser";
import { GeneralContext } from "../../contexts/generalContext";
import { SEARCHED_CONVERSATION_ID } from "../../../enums/localStorageConstants";
import { linkConverter, tagExtracter } from "../../../sdkFunctions";
import { UserContext } from "../../contexts/userContext";
import { myClient } from "../../..";
import { useNavigate } from "react-router-dom";
import { directMessageChatPath } from "../../../routes";
import { Snackbar } from "@mui/material";

function renderAnswers(text: string) {
  const arr = [];
  const parts = text.split(REGEX_USER_SPLITTING);
  // console.log("the parts are");
  // console.log(parts);
  if (parts) {
    for (const matchResult of parts) {
      if (matchResult.match(REGEX_USER_TAGGING)) {
        const match: any = REGEX_USER_TAGGING.exec(matchResult);
        if (match !== null) {
          const { name, route } = match.groups;
          arr.push({
            key: name,
            route: route,
          });
        }
      } else {
        arr.push({
          key: matchResult,
          route: null,
        });
      }
    }
  }
}
export const MemberSearchProfileTile = ({ profile, setOpenSearch }: any) => {
  const generalContext = useContext(GeneralContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  function closeSnackbar() {
    setOpenSnackbar(false);
  }
  function showSnackbar() {
    setOpenSnackbar(true);
  }
  function showMessage(message: string) {
    setSnackbarMessage(message);
  }
  async function handleSearchNavigation() {
    // generalContext.setShowLoadingBar(true);
    // console.log("the profile time id is ", profile.id);
    // sessionStorage.setItem(SEARCHED_CONVERSATION_ID, profile?.id?.toString());
    try {
      const dmStatusCall = await myClient.checkDMStatus({
        requestFrom: "member_profile",
        uuid: profile.uuid || "",
      });
      console.log(dmStatusCall);
      if (!dmStatusCall.data.show_dm) {
        showMessage("Access to DM Denied");
        showSnackbar();
        return;
      }
      const chatroomId = dmStatusCall.data.chatroom_id;
      if (chatroomId) {
        // Route to another chatroom and return
        navigate(`${directMessageChatPath}/${chatroomId}`);
        return;
      } else {
        const dmLimitCall = await myClient.checkDMLimitWithUuid({
          uuid: profile.uuid || "",
        });
        console.log(dmLimitCall);
        if (!dmLimitCall.success) {
          // show the error for dmLimitCall in snackbar and return
          showMessage(`DM Limit exceeded`);
          showSnackbar();
          return;
        }
        if (dmLimitCall.data.chatroomId) {
          // Route to another chatroom and return
          navigate(`${directMessageChatPath}/${dmLimitCall.data.chatroomId}`);
          return;
        }
        if (!dmLimitCall.data.isRequestDmLimitExceeded) {
          const createDMChatroomCall = await myClient.createDMChatroom({
            memberId: profile.id || "",
          });
          console.log(createDMChatroomCall);
          // Route to another chatroom and return
          navigate(
            `${directMessageChatPath}/${createDMChatroomCall.data.chatroom.id}`
          );
          return;
        } else {
          //
          showMessage("Some error occoured");
          showSnackbar();
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenSearch(false);
    }
  }
  return (
    <div
      className="flex items-center my-4 p-2 mr-10  hover:bg-white cursor-pointer"
      onClick={handleSearchNavigation}
    >
      <MemberSearchProfileImageView imgSource={profile?.image_url} />
      <MemberSearchProfileData userName={profile?.name} />
      <Snackbar
        message={snackbarMessage}
        open={openSnackbar}
        onClose={closeSnackbar}
        autoHideDuration={5000}
      />
    </div>
  );
};

const MemberSearchProfileImageView = ({ imgSource }: any) => {
  return (
    <div>
      <div className="rounded">
        {imgSource?.length !== 0 ? (
          <img
            src={imgSource}
            alt="profile data"
            className="rounded-full h-[48px] w-[48px]"
          />
        ) : (
          <AccountCircleIcon
            sx={{
              fontSize: "48px",
            }}
          />
        )}
      </div>
    </div>
  );
};
const MemberSearchProfileData = ({ userName }: any) => {
  return (
    <div className="grow pl-4">
      <div className="font-semibold">{userName}</div>
    </div>
  );
};

const ProfileTile = ({ profile, setOpenSearch }: any) => {
  const generalContext = useContext(GeneralContext);
  function handleSearchNavigation() {
    generalContext.setShowLoadingBar(true);
    // console.log("the profile time id is ", profile.id);
    sessionStorage.setItem(SEARCHED_CONVERSATION_ID, profile?.id?.toString());
    setOpenSearch(false);
  }
  return (
    <div
      className="flex items-center my-4 p-2 mr-10  hover:bg-white cursor-pointer"
      onClick={handleSearchNavigation}
    >
      <ProfileImageView imgSource={profile.member?.image_url} />
      <ProfileData userName={profile.member?.name} answer={profile.answer} />
    </div>
  );
};

const ProfileImageView = ({ imgSource }: any) => {
  return (
    <div>
      <div className="rounded">
        {imgSource?.length !== 0 ? (
          <img
            src={imgSource}
            alt="profile data"
            className="rounded-full h-[48px] w-[48px]"
          />
        ) : (
          <AccountCircleIcon
            sx={{
              fontSize: "48px",
            }}
          />
        )}
      </div>
    </div>
  );
};

const ProfileData = ({ userName, answer }: any) => {
  const userContext = useContext(UserContext);
  return (
    <div className="grow pl-4">
      <div className="font-semibold">{userName}</div>
      <p className="text-ellipsis ">
        {parse(linkConverter(tagExtracter(answer, userContext)))}
      </p>
    </div>
  );
};

export default ProfileTile;
