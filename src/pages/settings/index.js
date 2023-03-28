import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import EventUnitPrice from "./EventUnitPrice";
import EventUnitPriceDetail from "./EventUnitPriceDetail";
import BudgetEvent from "./BudgetEvent";
import BudgetEventDetail from "./BudgetEventDetail";
import Navigator from "../../components/common/Navigator";

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
          <Navigator/>
        </TitleContainer>
        {/* 이벤트 단가 관리 */}
        {params.id === 'settings' && <EventUnitPrice />}
        {params.id === 'settingsDetail' && <EventUnitPriceDetail />}
        {params.id === 'budgetEvent' && <BudgetEvent />}
        {params.id === 'budgetEventDetail' && <BudgetEventDetail />}
      </BoardContainer>
    </main>
  )
}

export default Settings