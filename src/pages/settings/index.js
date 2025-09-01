import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import React from "react";
import {useParams} from "react-router-dom";
import EventUnitPrice from "./EventUnitPrice";
import EventUnitPriceDetail from "./EventUnitPriceDetail";
import BudgetEvent from "./BudgetEvent";
import BudgetEventDetail from "./BudgetEventDetail";
import BudgetTime from "./BudgetTime";
import BudgetTimeDetail from "./BudgetTimeDetail";
import BudgetTimeList from "./BudgetTimeList";

export default function Settings() {
  const params = useParams()
  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>설정</h1>
          <Navigator/>
        </TitleContainer>
        {/* 이벤트 단가 관리 */}
        {params.id === 'budgetTimeList' && <BudgetTimeList/>}
        {params.id === 'budgetTimeDetail' && <BudgetTimeDetail/>}
        {params.id === 'settings' && <BudgetTime/>}
        {params.id === 'settingsDetail' && <EventUnitPriceDetail/>}
        {params.id === 'budgetEvent' && <BudgetEvent/>}
        {params.id === 'budgetEventDetail' && <BudgetEventDetail/>}
        {params.id === 'budgetTime' && <BudgetTime/>}
      </BoardContainer>
    </main>
  )
}