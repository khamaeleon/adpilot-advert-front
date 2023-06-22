import {useParams} from "react-router-dom";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Notice from "./Notice";
import Inquiry from "./Inquiry";
import Navigator from "../../components/common/Navigator";
import React from "react";

export default function Customer() {
  const params = useParams();
  return (
      <main>
        <BoardContainer>
          <TitleContainer>
            <h1>고객 센터</h1>
            <Navigator/>
          </TitleContainer>
          {params.id === 'notice' && <Notice/>}
          {params.id === 'inquiry' && <Inquiry/>}
        </BoardContainer>
      </main>
  )
}