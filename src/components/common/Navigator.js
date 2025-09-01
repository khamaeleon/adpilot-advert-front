import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {navigationName} from "./entity";
import {useEffect, useState} from "react";
import {light} from "../../assets/theme";
import {topicColor} from "../../assets/GlobalStyles";

function Navigator () {
  const location = useLocation()
  const [depth1, setDepth1] = useState()
  const [depth2, setDepth2] = useState()
  const [depth3, setDepth3] = useState()

  useEffect(() => {
    const nav = navigationName[location.pathname] !== undefined && navigationName[location.pathname].split('/')
    setDepth1(nav[0])
    setDepth2(nav[1])
    setDepth3(nav[2])
  }, [location.pathname]);

  return (
    <NavigatorContainer>
      <Depth>{depth1}</Depth>
      <Arrow/>
      {depth3 &&
        <>
          <Depth>{depth2}</Depth>
          <Arrow/>
        </>
      }
      <Depth>
        {depth3 ? depth3 : depth2}
      </Depth>
    </NavigatorContainer>
  )
}
export default Navigator;

const NavigatorContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 20px;
  & > div:last-child {
    color: ${topicColor};
    font-weight: bold;
  }
`

const Depth = styled.div`
  margin-right: 10px;
  font-size: 12px;
`

const Arrow = styled.div`
  margin-right: 10px;
  width: 6px;
  height: 9px;
  background-image: url("/assets/images/common/icon_left.png");
  background-repeat: no-repeat;
`