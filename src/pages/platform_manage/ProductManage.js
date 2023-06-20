import React, {useEffect, useState} from "react";
import {Board, BoardHeader, BoardSearchResult} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {PlatformCondition} from "../../components/Platform/Condition";
import {modalController} from "../../store";
import {useAtom, useSetAtom} from "jotai";
import {ModalBody, ModalHeader} from "../../components/modal/Modal";
import {retrieveProduct} from "../../services/Platform/PlatformAxios";
import {searchConditionAtom} from "./entity/Common";
import {productListColumn, productListDataAtom, searchProductType} from "./entity/Product";
import {Image} from "./styles/common";
import styled from "styled-components";

function ImageViewComponent (props) {
  return(
    <div>
      <ModalHeader title={"상품 이미지"}/>
      <ModalBody>
        <div style={{height: 500, overflowY: 'scroll'}}>
          <Image src={props.url.imageUrl} alt={'이미지'}/>
        </div>
      </ModalBody>
    </div>
  )
}
export function ImageView (props) {

  const setModal = useSetAtom(modalController)
  const handleShowModal = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => {
        return (
          <ImageViewComponent url={props.url}/>
        )
      }
    })
  }
  return (
    <ImageViewButton onClick={handleShowModal}/>
  )
}

const ImageViewButton = styled.div`
  margin: 0 auto;
  width: 24px;
  height: 24px;
  background-image: url('/assets/images/common/btn_img_show@2x.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-image: url('/assets/images/common/btn_img_show_on.png'); 
    cursor: pointer;
  }
`

function ProductManage() {
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [productData, setProductData] = useAtom(productListDataAtom)

  useEffect(() => {
    retrieveProduct(searchCondition).then(response =>{
      if(response){
        setProductData(response)
      }
    })
  },[])
  /**
   * 상품 수집 검색
   */
  const handleSearchResult = () => {
    retrieveProduct(searchCondition).then(response =>{
      if(response){
        setProductData(response)
      }
    })
  }

  return (
    <>
      <Board>
        <BoardHeader>상품 수집 현황</BoardHeader>
        <PlatformCondition
          searchType={searchProductType}
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
          handleTableData={handleSearchResult}
        />
        <BoardSearchResult>
          <Table
            columns={productListColumn}
            totalCount={[productData.totalCount !== undefined ? productData.totalCount : 0,'상품 수집 현황']}
            data={productData.rows !== undefined ? productData.rows : []}
            idProperty={'id'}
          />
        </BoardSearchResult>
      </Board>
    </>
  )
}

export default ProductManage;

