import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult, ColSpan1, ColSpan2, ColSpan3,
  ColSpan4, DefaultButton, Input,
  RowSpan, SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {CategoryContainer} from "./styles";
import styled from "styled-components";
import {atom, useAtom} from "jotai/index";
import {atomWithReset, useResetAtom} from "jotai/utils";
const categoryList = [
  {
    code: 'IAB1',
    label: '예술 및 엔터테인먼트'
  },
  {
    code: 'IAB2',
    label: '자동차'
  },
  {
    code: 'IAB3',
    label: '사업'
  },
  {
    code: 'IAB4',
    label: '채용'
  },
  {
    code: 'IAB5',
    label: '교육'
  },
  {
    code: 'IAB6',
    label: '가족 및 육아'
  },
]

const subCategoryList = [
  {
    code: 'IAB1',
    category:['도서 및 문학','연예인 팬/가십','미술','유머','영화','음악','텔레비전']
  },
  {
    code: 'IAB2',
    category: ['자동차 부품','자동차 수리','자동차 매매','자동차 문화','인증 중고','컨버터블','쿠페','크로스 오버','디젤','전기자동차']
  },
  {
    code: 'IAB3',
    category: ['광고','농업','생명공학/생물의학','비지니스 소프트웨어','건설','영억','정부','친환경 솔루션']
  },
  {
    code: 'IAB4',
    category: ['경력 걔획','칼리지','재정 지원','취업 박람회','구직','이력서 적성/조언','간호','장학금']
  },
  {
    code: 'IAB5',
    category: ['미술사','대학 행정','대학 생활','원격 학습','제 2언어로서의 영어', '언어 학습' ,'대학원','홈스쿨링']
  },
  {
    code: 'IAB6',
    category: ['재택','영유아','데이케어/프리스쿨','제품군 인터넷','육아','키즈','청소년 양육']
  },
]

const selectCategoryAtom = atom('')

const createCategoryAtom = atomWithReset({
  category: '',
  subCategory: ''
})

async function createApi(data) {
  try{

    return 200
  }catch (e) {
    console.log(e)
  }
}

export function CategoryManage() {
  const [selectCategory, setSelectCategory] = useAtom(selectCategoryAtom)
  const [createCategory, setCreateCategory] = useAtom(createCategoryAtom)
  const resetCategory = useResetAtom(createCategoryAtom)
  const [category, setCategory] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    resetCategory()
  }, [category]);

  const handleSelectCategory = (code) => {
    setSelectCategory(code)
  }

  const handleChangeCategory = (inputEvent) => {
    setCreateCategory({
      ...createCategory,
      category: inputEvent.target.value
    })
  }

  const handleChangeSubCategory = (inputEvent) => {
    setCreateCategory({
      ...createCategory,
      subCategory: inputEvent.target.value
    })
  }

  const handleSearchCategory = (e) => {
    console.log(e.target.value)
    setSearchKeyword(e.target.value)
  }

  const handleCreateCategory = async () => {
    const fetchData = await createApi(createCategory.category)
    console.log(fetchData)
  }
  const handleCreateSubCategory = async () => {
    const fetchData = await createApi(createCategory.subCategory)
    console.log(fetchData)
  }

  return(
    <>
      <Board>
        <BoardHeader>광고주 카테고리 관리</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan3/>
            <ColSpan1>
              <Input value={searchKeyword} onChange={handleSearchCategory}/>
              <SearchButton>검색</SearchButton>
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
                <Input value={createCategory.category || ""} onChange={handleChangeCategory}/>
              </ColSpan3>
              <ColSpan1><DefaultButton onClick={handleCreateCategory}>등록</DefaultButton></ColSpan1>
            </CategoryEnroll>
            <CategoryBody>
              {categoryList && categoryList.map((item, key) => {
                return (
                  <CategoryItem
                    key={key}
                    onClick={() => handleSelectCategory(item.code)}
                    style={item.code === selectCategory? {color:"#ffbb00"} : null}>{item.label}</CategoryItem>
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
                  <Input value={createCategory.subCategory || ""} onChange={handleChangeSubCategory}/>
                </ColSpan3>
                <ColSpan1><DefaultButton onClick={handleCreateSubCategory}>등록</DefaultButton></ColSpan1>
              </div>
            </CategoryEnroll>
              {selectCategory !== '' && subCategoryList.filter(item => item.code === selectCategory).map((item, key) => {
                return(
                  <SubCategoryBody key={key}>
                    {item.category.map((sub, key) => {
                      return (
                        <SubCategoryItem key={key}>{sub}</SubCategoryItem>
                      )
                    })}
                  </SubCategoryBody>
                )
              })}
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
  & div:last-child {
    border-bottom: 0;
  }
`

const CategoryItem = styled.div`
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`

const SubCategoryBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  & div:nth-child(4n) {
    border-right: 0;
  }
`

const SubCategoryItem = styled.div`
  padding: 20px;
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