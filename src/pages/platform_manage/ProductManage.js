import React, {useCallback, useState} from "react";
import {productListColumn, searchConditionAtom} from "./entity";
import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  BoardSearchResultTitle,
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
  const [searchCondition, setSearchCondition] = useAtom(searchConditionAtom)
  const [count, setCount] = useState(0)

  const handleSearchResult = () => {

  }

  const retrieveProductList = async () => {
    const fetchData = await retrieveProduct().then(response => {
      const data = response
      setCount(data.length)
      return data
    })
    return fetchData
  }

  const dataSource = useCallback(retrieveProductList,[],);

  return (
    <>
        <Board>
          <BoardHeader>상품 수집 현황</BoardHeader>
          <BoardSearchDetail>
            <PlatformCondition searchCodition={searchCondition} setSearchCondition={setSearchCondition}/>
            <RowSpan>
              <ColSpan2>
                <Span4>광고주 설정</Span4>
                <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchResult}/>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResult>
            <Table columns={productListColumn}
                   totalCount={[count,'매체']}
                   data={dataSource}
                   idProperty={'id'}
            />
          </BoardSearchResult>
        </Board>
    </>
  )
}

export default ProductManage;

const Image = styled.img`
  width: 100%;
`