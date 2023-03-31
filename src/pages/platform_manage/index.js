import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React from "react";
import {atom} from "jotai/index";
import {useParams} from "react-router-dom";
import AdminManage from "./AdminManage";
import {CategoryManage} from "./CategoryManage";
import ProductManage from "./ProductManage";
import ChangeManage from "./ChangeManage";
import PaymentManage from "./PaymentManage";

function PlatformUser(){
  const params = useParams()
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        {params.id === 'platform' && <AdminManage/>}
        {params.id === 'categoryManage' && <CategoryManage/>}
        {params.id === 'productManage' && <ProductManage/>}
        {params.id === 'changeManage' && <ChangeManage/>}
        {params.id === 'paymentManage' && <PaymentManage/>}
      </BoardContainer>
    </main>
  )
}

export default PlatformUser