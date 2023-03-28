import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {useParams} from "react-router-dom";
import EventUnitPrice from "./EventUnitPrice";
import EventUnitPriceDetail from "./EventUnitPriceDetail";

function Settings(){
  const params = useParams()

  // useEffect(() => {
  // }, []);

  return(

    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>설정</h1>
        </TitleContainer>
        {/* 이벤트 단가 관리 */}
        {params.id === 'settings' && <EventUnitPrice />}
        {params.id === 'settings' && params.detail ==='detail' && <EventUnitPriceDetail />}
      </BoardContainer>
    </main>
  )
}

export default Settings