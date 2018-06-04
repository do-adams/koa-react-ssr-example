import styled from "styled-components";

export const Header = styled("div")`
  display: flex;
  flex: 1;
  padding: 0;
  margin: 0;
  font-family: ${props => props.theme.fonts.main};
  font-size: 30px;
  font-weight: 100;
`;

export const H1 = Header.withComponent("h1").extend`

`;
