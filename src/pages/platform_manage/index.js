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
      </BoardContainer>
    </main>
  )
}

export default PlatformUser