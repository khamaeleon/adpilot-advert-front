import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React from "react";
import {useParams} from "react-router-dom";
import DashBoardIndex from "./DashBoardIndex";

export default function DashBoard(){
  const params = useParams()
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>대시보드</h1>
          <Navigator depth={2}/>
        </TitleContainer>
        {params.id === 'dashboard' && <DashBoardIndex/>}
      </BoardContainer>
    </main>
  )
}