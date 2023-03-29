import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult, ColSpan1, ColSpan2, ColSpan3,
  ColSpan4, DefaultButton, Input,
  RowSpan, SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import React from "react";
import {CategoryContainer} from "./styles";
import styled from "styled-components";

export function CategoryManage() {
  return(
    <>
      <Board>
        <BoardHeader>광고주 카테고리 관리</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan3/>
            <ColSpan1>
              <Input/>
              <SearchButton>검색</SearchButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <CategoryContainer>
          <MainCategory>
            <CategoryHeader>
              <div>카테고리</div>
              <EnrollButton>추가</EnrollButton>
            </CategoryHeader>
            <CategoryEnroll>
              <ColSpan3><Input/></ColSpan3>
              <ColSpan1><DefaultButton>등록</DefaultButton></ColSpan1>
            </CategoryEnroll>
            <CategoryBody>
              <CategoryItem>예술 및 엔터테인먼트</CategoryItem>
            </CategoryBody>
          </MainCategory>
          <SubCategory>
            <CategoryHeader>
              <div>하위 카테고리</div>
              <EnrollButton>등록</EnrollButton>
            </CategoryHeader>
            <CategoryEnroll>
              <input/>
              <ColSpan1><DefaultButton>등록</DefaultButton></ColSpan1>
            </CategoryEnroll>
            <SubCategoryBody>
              <SubCategoryItem>자동차 부품</SubCategoryItem>
            </SubCategoryBody>
          </SubCategory>
        </CategoryContainer>
      </Board>
    </>
  )
}

const MainCategory = styled.div`
  width: 400px;
  border-right: 1px solid #ddd;
`

const SubCategory = styled.div`
  width: 100%;
`

const CategoryEnroll = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`

const CategoryHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
`

const CategoryBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const CategoryItem = styled.div`
  padding: 20px;
  width: 100%;
  border-top: 1px solid #ddd;
`

const SubCategoryBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const SubCategoryItem = styled.div`
  padding: 20px;
  width: 25%;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
`

const EnrollButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  padding: 0 20px;
  height: 40px;
  margin-top: -20px;
  background-color: #535353;
  color: #fff;
  font-weight: bold;
`