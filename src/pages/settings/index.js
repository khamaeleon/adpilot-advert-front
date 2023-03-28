import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import EventUnitPrice from "./EventUnitPrice";
import EventUnitPriceDetail from "./EventUnitPriceDetail";
import BudgetEvent from "./BudgetEvent";
import BudgetEventDetail from "./BudgetEventDetail";

function Settings(){
  const params = useParams()

  useEffect(() => {
    console.log(params)
  }, []);

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>설정</h1>
        </TitleContainer>
        {/* 이벤트 단가 관리 */}
        {params.id === 'settings' && params.detail !=='detail' && <EventUnitPrice />}
        {params.id === 'settings' && params.detail ==='detail' && <EventUnitPriceDetail />}
        {params.id === 'budgetEvent' && params.detail !=='detail' && <BudgetEvent />}
        {params.id === 'budgetEvent' && params.detail ==='detail' && <BudgetEventDetail />}
      </BoardContainer>
    </main>
  )
}

export default Settings