import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  StyledHeader,
  LeftSection,
  SearchSection,
  HeaderMoreSection,
  LogoSection,
  SearchBar,
} from "./Header.styles";
import { Text } from "../../utils/Text.styles";
import { Icon } from "../../utils/Icon.styles";
import { SlMenu } from "react-icons/sl";
import { FaMicrophone, FaYoutube } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import AuthButton from "../authButton/AuthButton";
import { CgMoreVerticalAlt } from "react-icons/cg";
import Settings from "../Settings/Settings";
import { useAppContext } from "../../context/App.context";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { text, setSearchBarText, toggleMenuSize } = useAppContext();
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { pathname } = useLocation();

  useEffect(() => {
    setSearchText(transcript);
    setSearchBarText(transcript);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const isHomePath = pathname.length === 1;

  if (isHomePath) {
    document.title = "PexelsStream";
  }

  return (
    <StyledHeader>
      <LeftSection>
        <Icon
          className={`${!isHomePath && "disabled"}menu`}
          onClick={() => toggleMenuSize()}
        >
          <SlMenu size={17} />
        </Icon>
        <LogoSection to="/">
          <FaYoutube color="#FF0000" size={30} />
          <Text className="logo">PexelsStream v1.1.0</Text>
        </LogoSection>
      </LeftSection>
      <SearchSection>
        <SearchBar>
          <input
            value={searchText}
            placeholder={text.search}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Icon
            data-tooltip-id="search"
            data-tooltip-content={text.search}
            onClick={() => setSearchBarText(searchText)}
          >
            <LuSearch size={19} />
          </Icon>
        </SearchBar>
        <Icon
          data-tooltip-id="voiceSearch"
          data-tooltip-content={text.voiceSearch}
          onClick={
            SpeechRecognition.startListening as MouseEventHandler<HTMLDivElement>
          }
          $showBackground
          className={listening ? "listening" : ""}
        >
          <FaMicrophone size={19} />
        </Icon>
      </SearchSection>
      <HeaderMoreSection>
        <Icon
          data-tooltip-id="settings"
          data-tooltip-content="Settings"
          onClick={() => setShowSettings((currentState) => !currentState)}
        >
          <CgMoreVerticalAlt size={21} />
        </Icon>
        <AuthButton />
        {showSettings && <Settings />}
      </HeaderMoreSection>
    </StyledHeader>
  );
};

export default Header;
