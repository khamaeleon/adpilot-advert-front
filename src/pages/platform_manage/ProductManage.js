import Navigator from "../../components/common/Navigator";
import React, { useEffect} from "react";
import {
  columnData,
  mediaSearchResult, productListColumn, productListDataAtom, searchInfo
} from "./entity";
import {
  Board,
  BoardContainer, BoardHeader, BoardSearchDetail,
  BoardSearchResult, BoardSearchResultTitle,SaveExcelButton,
  TitleContainer
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {useAtom} from "jotai/index";

function ProductManage() {
  const [productList, setProductList] = useAtom(productListDataAtom);

  useEffect(() => {

  }, []);

  // const onClickSearchMedia =(e) => {
  //   //지면리스트 호출
  //   selInventoryList(e).then(response =>{
  //     if(response){
  //       setInventorySearchList(response)
  //     }
  //   })
  // }

  return (
    <>
        <Board>
          <BoardHeader>상품 수집 현황</BoardHeader>
          <BoardSearchDetail>
            {/*<SearchBoard deviceType calculationType searchKeyword onSearch={onClickSearchMedia}/>*/}
          </BoardSearchDetail>
          <BoardSearchResultTitle>

          </BoardSearchResultTitle>
          <BoardSearchResult>
            <Table columns={productListColumn}
                   totalCount={[productList.length,'매체']}
                   data={productList}/>
          </BoardSearchResult>
        </Board>
    </>
  )
}

export default ProductManage;
