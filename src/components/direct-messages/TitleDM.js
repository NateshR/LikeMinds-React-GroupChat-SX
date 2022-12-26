import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import Gap from "../../styledAccessories/Gap";

import SearchBar from "../../styledAccessories/SearchBar";
import MoreOptions from "../../styledAccessories/MoreOptions";
const TitleBox = styled(Box)({
  display: "flex",
  borderBottom: "1px solid #ADADAD",
  width: "100%",
  marginRight: "96px",
  marginLeft: "24px",
  padding: "0 0 16px",
  marginTop: "24px",
});

function TittleDm({ title }) {
  return (
    <Box className="flex">
      <TitleBox>
        <TitleArea title={title} />
        <Gap />
        <OptionArea />
      </TitleBox>
      <Box className="flex" />
    </Box>
  );
}

function TitleArea({ title }) {
  return (
    <Box className="text-left">
      <span component={"p"} className="font-semibold text-xl leading-6">
        {title ? title : null}
      </span>
      <div />
      <span className="text-xs font-medium text-[#ADADAD]">member</span>
    </Box>
  );
}

function OptionArea() {
  return (
    <Box>
      <SearchBar />
      <MoreOptions />
    </Box>
  );
}

export default TittleDm;
