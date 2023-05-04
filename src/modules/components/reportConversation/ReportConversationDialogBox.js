import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getReportingOptions } from "../../../sdkFunctions";

// myClient.onUploadFile
function ReportConversationDialogBox({
  convoId,
  shouldShow,
  onClick,
  closeBox,
  reportedMemberId,
}) {
  const [reasonArr, setReasonArr] = useState([]);
  useEffect(() => {
    getReportingOptions()
      .then((r) => setReasonArr(r.data.report_tags))
      .catch((e) => {
        // console.log(e);
      });
  }, []);
  return (
    <div className="bg-white p-4 w-[400px]">
      <div className="flex justify-between p-4">
        <div className="text-base font-bold mt-2">Report Message</div>
        <IconButton onClick={closeBox}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm font-bold mb-2">
          Please specify the problem to continue
        </p>
        <p className="text-sm font-normal text-[#666666]">
          You would be able to report this message after selecting a problem.
        </p>
        <div className="mt-3 w-full text-center">
          <div className="my-3 w-full text-left">
            {reasonArr.map((item, index) => {
              return (
                <ReportedReasonBlock
                  id={item.id}
                  name={item.name}
                  conversationid={convoId}
                  onClickhandler={onClick}
                  reportedMemberId={reportedMemberId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportedReasonBlock({
  id,
  name,
  onClickhandler,
  conversationid,
  reportedMemberId,
}) {
  return (
    <div
      onClick={() => {
        onClickhandler(id, name, conversationid, reportedMemberId);
      }}
      className="inline-block border rounded-[20px] py-2 px-3 mr-2 mb-2 text-sm text=[#9b9b9b]"
    >
      {name}
    </div>
  );
}

export default ReportConversationDialogBox;
