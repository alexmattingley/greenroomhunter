import styled from "styled-components";

export const Icon = styled.span`
  display: inline-block;
  background-size: cover;
  background-position: center;
  margin-bottom: 7px;
  ${(props) => (
    `
    width: ${props.width || '25px'};
    height: ${props.height || '25px'};
    background-image: url(${props.icon || '/images/waves.svg'});
    `
  )}
`;
