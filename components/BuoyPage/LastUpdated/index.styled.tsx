import styled from "styled-components";
import { colors } from "data/styles-data";

export const LastUpdatedText = styled.p``;

export const LastUpdatedBold = styled.b<{ isStale?: boolean }>`
  color: ${(props) => (props.isStale ? colors.errorRed : "inherit")};
`;

export const LastUpdatedContainer = styled.div`
  margin-bottom: 20px;
`;
