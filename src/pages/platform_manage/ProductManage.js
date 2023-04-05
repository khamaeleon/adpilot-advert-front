import React, {useEffect, useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  ColSpan2,
  RowSpan,
  Span4
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {useAtom} from "jotai/index";
import {PlatformCondition} from "../../components/Platform/Condition";
import {modalController} from "../../store";
import {useSetAtom} from "jotai";
import {ModalBody, ModalHeader} from "../../components/modal/Modal";
import {SearchAdvertiser} from "../../components/common/SearchAdvertiser";
import {retrieveProduct} from "../../services/Platform/PlatformAxios";
import {FooterButton} from "@inovua/reactdatagrid-community/packages/Calendar/src/Footer";
import styled from "styled-components";
import {searchConditionAtom} from "./entity/common";
import {productListColumn, productListDataAtom, searchProductType} from "./entity/product";

function ImageViewComponent (props) {
  return(
    <div>
      <ModalHeader title={"매체 검색"}/>
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
    <FooterButton onClick={handleShowModal}>보기</FooterButton>
  )
}

function ProductManage() {
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [productData, setProductData] = useAtom(productListDataAtom)
  const [count, setCount] = useState(0)

  useEffect(() => {
    retrieveProduct(searchCondition).then(response =>{
      setProductData(response)
    })
  }, [])

  const handleSearchResult = () => {
    retrieveProduct(searchCondition).then(response =>{
      setProductData(response)
    })
  }

  const handleSearchAdverResult = (username) => {
   setSearchCondition({
     ...searchCondition,
     username:username
   })
    retrieveProduct({...searchCondition,username:username}).then(response =>{
      setProductData(response)
    })
  }

  return (
    <>
        <Board>
          <BoardHeader>상품 수집 현황</BoardHeader>
          <BoardSearchDetail>
            <PlatformCondition searchType={searchProductType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleTableData={handleSearchResult}/>
            <RowSpan>
              <ColSpan2>
                <Span4>광고주 설정</Span4>
                <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdverResult}/>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResult>
            {productData !==null &&
              <Table columns={productListColumn}
                     totalCount={[productData.totalCount,'상품수']}
                     data={productData.rows}
                     idProperty={'id'}
              />
            }
          </BoardSearchResult>
        </Board>
    </>
  )
}

export default ProductManage;

const Image = styled.img`
  width: 100%;
`