import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,
  ColSpan3,
  DefaultButton,
  Input,
  RowSpan,
  SearchButton
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {CategoryContainer} from "./styles";
import styled from "styled-components";
import {atom, useAtom} from "jotai/index";
import {atomWithReset, useResetAtom} from "jotai/utils";
import {createNewCategory, retrieveCategoryByParentCode, retrieveTopLevelCategory} from "../../services/PlatformAxios";

const topLevelCategoryListAtom = atom([])
const categoryListAtom = atom([])
const selectCategoryAtom = atom('')
const createCategoryAtom = atomWithReset({
  category: {
    name: '',
    level: 1,
  },
  subCategory: {
    name: '',
    level: 2,
    parentCode: null
  }
})

export function CategoryManage() {
  const [topLevelCategoryList, setTopLevelCategoryList] = useAtom(topLevelCategoryListAtom)
  const [categoryList, setCategoryList] = useAtom(categoryListAtom)
  const [selectCategory, setSelectCategory] = useAtom(selectCategoryAtom)
  const [createCategory, setCreateCategory] = useAtom(createCategoryAtom)
  const resetCategory = useResetAtom(createCategoryAtom)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [category, setCategory] = useState(false)
  const [refresh, setRefresh] = useState(false)
  /**
   * 카테고리 등록 취소시 입력값 삭제
   */
  useEffect(() => {
    resetCategory()
  }, [category]);
  /**
   * 카테고리 조회
   */
  useEffect(() => {
    const fetchData = retrieveTopLevelCategory().then(response => {
      console.log(response)
      setTopLevelCategoryList(response)
    })
  }, [refresh]);
  /**
   * 카테고리 선택
   * @param code
   */
  const handleSelectCategory = async (code) => {
    setSelectCategory(code)
    const fetData = await retrieveCategoryByParentCode(code).then(response => {
      console.log(response)
      setCategoryList(response)
    })
  }
  /**
   * 상위 카테고리 등록 값 추가
   * @param inputEvent
   */
  const handleChangeCategory = (inputEvent) => {
    setCreateCategory({
      ...createCategory,
      category: {
        ...createCategory.category,
        name: inputEvent.target.value
      }
    })
  }
  /**
   * 서브 카테고리 등록 값 추가
   * @param inputEvent
   */
  const handleChangeSubCategory = (inputEvent) => {
    console.log(createCategory)
    setCreateCategory({
      ...createCategory,
      subCategory: {
        ...createCategory.subCategory,
        name: inputEvent.target.value,
        parentCode: selectCategory
      }
    })
  }
  /**
   * 검색 키워드 값 저장
   * @param e
   */
  const handleChangeSearchCategory = (e) => {
    console.log(e.target.value)
    setSearchKeyword(e.target.value)
  }
  /**
   * 카테고리 등록 상위카테고리
   * @returns {Promise<void>}
   */
  const handleCreateCategory = async () => {
    const fetchData = await createNewCategory(createCategory.category).then(response => {
      console.log(response)
      setRefresh(!refresh)
    }).then(() => resetCategory())
  }
  /**
   * 카테고리 등록 (서브카테고리)
   * @returns {Promise<void>}
   */
  const handleCreateSubCategory = async () => {
    const fetchData = await createNewCategory(createCategory.subCategory).then(response => {
      console.log(response)
      setRefresh(!refresh)
    }).then(() => resetCategory())
    const fetData = await retrieveCategoryByParentCode(selectCategory).then(response => {
      console.log(response)
      setCategoryList(response)
    })
  }

  /**
   * 검색
   * @returns {Promise<void>}
   */
  const handleSearchCategory = async () => {

  }

  return(
    <>
      <Board>
        <BoardHeader>광고주 카테고리 관리</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan3/>
            <ColSpan1>
              <Input value={searchKeyword} onChange={handleChangeSearchCategory} placeholder={'검색'}/>
              <SearchButton onClick={handleSearchCategory}>검색</SearchButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <CategoryContainer>
          <MainCategory>
            <CategoryHeader>
              <div>카테고리</div>
              <EnrollButton onClick={() => setCategory(!category)}>{category ? "취소" : "추가"}</EnrollButton>
            </CategoryHeader>
            <CategoryEnroll style={category ? {height: 60} : {height:0}}>
              <ColSpan3>
                <Input placeholder={'상위 카테고리 명을 입력하세요.'} value={createCategory.category.name || ""} onChange={handleChangeCategory} />
              </ColSpan3>
              <ColSpan1><DefaultButton onClick={handleCreateCategory}>등록</DefaultButton></ColSpan1>
            </CategoryEnroll>
            <CategoryBody>
              {topLevelCategoryList.length !== 0 && topLevelCategoryList.map((item, key) => {
                return (
                  <CategoryItem
                    key={key}
                    onClick={() => handleSelectCategory(item.code)}
                    style={item.code === selectCategory? {color:"#ffbb00"} : null}>{item.name}</CategoryItem>
                )
              })}
            </CategoryBody>
          </MainCategory>
          <SubCategory>
            <CategoryHeader>
              <div>하위 카테고리</div>
              <EnrollButton onClick={()=>setCategory(!category)}>{category ? "취소" : "추가"}</EnrollButton>
            </CategoryHeader>
            <CategoryEnroll style={{justifyContent:'flex-end',height: category ? 60 : 0 }}>
              <div style={{display:'flex',width: 400}}>
                <ColSpan3>
                  <Input placeholder={selectCategory !== '' ? '카테고리 명을 입력해주세요' : '상위 카테고리를 선택해주세요'} value={createCategory.subCategory.name || ""} onChange={handleChangeSubCategory} readOnly={selectCategory !== '' ? false : true}/>
                </ColSpan3>
                <ColSpan1><DefaultButton onClick={handleCreateSubCategory} disabled={selectCategory !== '' ? false : true}>등록</DefaultButton></ColSpan1>
              </div>
            </CategoryEnroll>
            <SubCategoryBody>
              {categoryList.length !== 0 && categoryList.map((item, key) => {
                return(
                  <SubCategoryItem key={key}>{item.name}</SubCategoryItem>
                )
              })}
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
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  padding: 0 10px 0 0;
  height: 0;
  transition-duration: 0.5s;
`

const CategoryHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
`

const CategoryBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  & div:last-child {
    border-bottom: 0;
  }
`

const CategoryItem = styled.div`
  padding: 10px 20px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`

const SubCategoryBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  & div:nth-child(4n) {
    border-right: 0;
  }
`

const SubCategoryItem = styled.div`
  padding: 10px 20px;
  width: 25%;
  border-bottom: 1px solid #ddd;
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