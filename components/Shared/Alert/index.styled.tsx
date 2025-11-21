import styled from "styled-components";
import { Alert as MuiAlert } from "@mui/material";
import { colors } from "data/styles-data";

export const StyledAlert = styled(MuiAlert)`
  && {
    background-color: ${colors.errorRed};
    color: ${colors.almostWhite};
  }
`;
