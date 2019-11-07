import styled from 'styled-components';
import { Link } from 'react-router-dom';
import lighthouse from 'images/lighthouse.svg';
import waves from 'images/waves.svg';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const SideNavContainer = styled.div`
  display: none;
  height: 100%;
  width: 20%;
  background-color: ${colors.darkGrey};
  border-right: 2px solid ${colors.lightGreen};
  color: ${colors.almostWhite};

  @media only screen and (min-width: ${breakpts.md}) {
    position: fixed;
    display: inline-block;
    box-sizing: border-box;
    padding: 20px 10px;
  }
`;

const commonLinkContStyles = `
${generateStylesForSize('t4')}
  display: flex;
  font-weight: 500;
  align-items: center;
  color: ${colors.almostWhite};
  text-decoration: none;
  width: auto;
`;

const commonLinkTxtStyles = `
  margin-left: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: all 0.5s;
  :hover {
    border-bottom: 2px solid ${colors.lightGreen};
  }
`;

export const HomeLink = styled(Link)`
  ${commonLinkContStyles}
  margin-bottom: 100px;
`;

export const HomeLinkText = styled.span`
  ${commonLinkTxtStyles}
  text-transform: uppercase;
`;

export const PageLinkContainer = styled.a`
  ${commonLinkContStyles}
  margin-bottom: 20px;
`;

export const PageLinkTxt = styled.span`
  ${commonLinkTxtStyles}
`;

export const Icon = styled.span`
  display: inline-block;
  background-size: cover;
  background-position: center;
  margin-bottom: 7px;
  ${(props) => (
    `
    width: ${props.width || '25px'};
    height: ${props.height || '25px'};
    background-image: url(${props.icon || waves});
    `
  )}
`;
