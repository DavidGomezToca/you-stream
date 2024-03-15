import styled from "styled-components";

export const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme: { settingsBg } }) => settingsBg};
  position: absolute;
  top: 100%;
  right: 85%;
  width: 17.3vw;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 43px -3px ${({ theme: { settingsShadow } }) => settingsShadow};
  z-index: 20000000000;
`;
