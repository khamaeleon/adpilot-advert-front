import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,
  ColSpan3,
  Input,
  RowSpan,
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {useResetAtom} from "jotai/utils";
import {
  createNewCategory,
  retrieveCategoryByParentCode, retrieveTopLevelAllCategory,
  retrieveTopLevelCategory
} from "../../services/Platform/CategoryAxios";
import {categoryListAtom, createCategoryAtom, selectCategoryAtom, topLevelCategoryListAtom} from "./entity/Category";
import {
  CategoryBody, CategoryContainer,
  CategoryEnroll,
  CategoryHeader,
  CategoryItem,
  EnrollButton,
  MainCategory, SearchButton,
  SubCategory,
  SubCategoryBody,
  SubCategoryItem
} from "./styles/common";


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
    setSearchKeyword('')
    retrieveTopLevelAllCategory().then(response => {
      setTopLevelCategoryList(response)
    })
    if(selectCategory != undefined && selectCategory != ''){
      retrieveCategoryByParentCode(selectCategory, searchKeyword).then(response => {
        setCategoryList(response)
      })
    }
  }, [refresh]);
  /**
   * 카테고리 선택
   * @param code
   */
  const handleSelectCategory = async (code) => {
    setSelectCategory(code)
    retrieveCategoryByParentCode(code, searchKeyword).then(response => {
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
    setSearchKeyword(e.target.value)
  }
  /**
   * 카테고리 등록 상위카테고리
   * @returns {Promise<void>}
   */
  const handleCreateCategory = async () => {
    createNewCategory(createCategory.category).then(response => {
      setRefresh(!refresh)
    }).then(() => resetCategory())
  }
  /**
   * 카테고리 등록 (서브카테고리)
   * @returns {Promise<void>}
   */
  const handleCreateSubCategory = async () => {
    createNewCategory(createCategory.subCategory).then(() => {
      setRefresh(!refresh)
    }).then(() => resetCategory())
    retrieveCategoryByParentCode(selectCategory, searchKeyword).then(response => {
      setCategoryList(response)
    })
  }

  /**
   * 검색
   * @returns {Promise<void>}
   */
  const handleSearchCategory = async () => {
    retrieveTopLevelCategory(searchKeyword).then(response => {
      setTopLevelCategoryList(response)

      if(response.length !== 0) handleSelectCategory(response[0]?.code)
    })
  }

  return(
    <>
      <Board>
        <BoardHeader>광고주 카테고리 관리</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan3/>
            <ColSpan1>
              <Input
                  value={searchKeyword}
                  onChange={handleChangeSearchCategory}
                  placeholder={'검색'}
                  onKeyDown={event => (event.code === 'Enter') && handleSearchCategory() }

              />
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
              <ColSpan1><SearchButton onClick={handleCreateCategory}>등록</SearchButton></ColSpan1>
            </CategoryEnroll>
            <CategoryBody>
              {topLevelCategoryList.length !== 0 && topLevelCategoryList.map((item, key) => {
                return (
                  <CategoryItem
                    key={key}
                    onClick={() => handleSelectCategory(item.code)}
                    active={item.code === selectCategory? true: false}
                  >{item.name}</CategoryItem>
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
                <ColSpan1><SearchButton onClick={handleCreateSubCategory} disabled={selectCategory !== '' ? false : true}>등록</SearchButton></ColSpan1>
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

