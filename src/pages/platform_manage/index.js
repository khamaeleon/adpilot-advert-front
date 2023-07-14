import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React from "react";
import {useParams} from "react-router-dom";
import UserManage from "./UserManage";
import {CategoryManage} from "./CategoryManage";
import ProductManage from "./ProductManage";
import ConversionManage from "./ConversionManage";
import PaymentManage from "./PaymentManage";
import PlatformUserDetail from "./UserDetail";
import AdvertisingPayments from "./AdvertisingPayments";
import {HistoryCampaignManage} from "./HistoryCampaign";
import {HistoryTargetingManage} from "./HistoryTargeting";
import {HistoryTimeManage} from "./HistoryTime";
import {HistoryCampaignDetail} from "./HistoryCampaignDetail";
import {HistoryPriceDetail} from "./HistoryPriceDetail";
import {HistoryTargetingDetail} from "./HistoryTargetingDetail";
import {HistoryTimeDetail} from "./HistoryTimeDetail";
import {HistoryPriceManage} from "./HistoryPrice";

function PlatformUser(){
  const params = useParams()
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        {params.id === 'platform' && <UserManage/>}
        {params.id === 'platformDetail' && <PlatformUserDetail/>}
        {params.id === 'categoryManage' && <CategoryManage/>}
        {params.id === 'productManage' && <ProductManage/>}
        {params.id === 'conversionManage' && <ConversionManage/>}
        {params.id === 'paymentManage' && <PaymentManage/>}
        {params.id === 'advertisingPayments' && <AdvertisingPayments/>}
        {params.id === 'historyCampaignManage' && <HistoryCampaignManage/>}
        {params.id === 'historyPriceManage' && <HistoryPriceManage/>}
        {params.id === 'historyEventManage' && <HistoryTargetingManage/>}
        {params.id === 'historyTimeManage' && <HistoryTimeManage/>}
        {params.id === 'historyCampaignDetail' && <HistoryCampaignDetail/>}
        {params.id === 'historyPriceDetail' && <HistoryPriceDetail/>}
        {params.id === 'historyEventDetail' && <HistoryTargetingDetail/>}
        {params.id === 'historyTimeDetail' && <HistoryTimeDetail/>}

      </BoardContainer>
    </main>
  )
}

export default PlatformUser