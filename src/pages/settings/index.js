import Navigator from "../../components/common/Navigator";
import {
  Board, BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan1,
  DefaultButton,
  Input,
  RowSpan, TitleContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {adverEventPriceColumns, eventUnitPriceDataAtom} from "./entity";
import {ToastContainer} from "react-toastify";
import {selAdverPriceEventList} from "../../services/SettingsAxios";
import {useParams} from "react-router-dom";
import EventUnitPrice from "./EventUnitPrice";
import EventUnitPriceDetail from "./EventUnitPriceDetail";
import BudgetEvent from "./BudgetEvent";
import BudgetEventDetail from "./BudgetEventDetail";

export default function Settings() {
  const params = useParams()
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