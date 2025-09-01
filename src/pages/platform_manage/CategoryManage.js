import {
  Board,
  BoardHeader,
  ColSpan1,
  ColSpan3,
  GraySearchButton,
  Input,
  RowSpan,
  SearchInput,
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {useResetAtom} from "jotai/utils";
import {
  createNewCategory,
  retrieveCategoryByParentCode,
  retrieveTopLevelAllCategory,
  retrieveTopLevelCategory
} from "../../services/Platform/CategoryAxios";
import {categoryListAtom, createCategoryAtom, selectCategoryAtom, topLevelCategoryListAtom} from "./entity/Category";
import {
  CategoryBody,
  CategoryContainer,
  CategoryEnroll,
  CategoryHeader,
  CategoryItem,
  EnrollButton,
  MainCategory,
  SearchButton,
  SubCategory,
  SubCategoryBody,
  SubCategoryItem
} from "./styles/common";
import {toast} from "react-toastify";


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  /**
   * 카테고리 조회
   */
  useEffect(() => {
    // setSearchKeyword('')
    // retrieveTopLevelAllCategory().then(response => {
    //   setTopLevelCategoryList(response)
    //   if(response.length !== 0) handleSelectCategory(category ? selectCategory :  response[0].code )
    // })
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    setSearchKeyword('');
    retrieveTopLevelAllCategory()
      .then(response => {
        // 옵셔널 체이닝 연산자와 Null 병합 연산자를 사용하여 null 처리
        const topLevelCategoryList = response?.length ? response : [];
        setTopLevelCategoryList(topLevelCategoryList);

        if (topLevelCategoryList.length !== 0) {
          // handleSelectCategory 함수 내부에서 selectCategory 또는 response[0].code를 처리하므로, 별도의 null 처리 필요하지 않음
          handleSelectCategory(category ? selectCategory : topLevelCategoryList[0].code);
        }
      })
      .catch(error => {
        // 오류 처리
        console.error('Error retrieving top-level categories:', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if(createCategory.category.name === '') {
      toast.warning('상위 카테고리명을 입력해주세요')
    } else if(topLevelCategoryList.find(d=>d.name === createCategory.category.name) !== undefined) {
      toast.warning('중복된 카테고리명을 입력하셨습니다.')
    } else {
      createNewCategory(createCategory.category).then(response => {
        setRefresh(!refresh)
      }).then(() => resetCategory())
    }

  }
  /**
   * 카테고리 등록 (서브카테고리)
   * @returns {Promise<void>}
   */
  const handleCreateSubCategory = async () => {
    if(createCategory.subCategory.name === '') {
      toast.warning('하위 카테고리 명를 입력해주세요')
    } else if(categoryList.find(d=>d.name === createCategory.subCategory.name) !== undefined){
      toast.warning('중복된 카테고리명을 입력하셨습니다')
    } else {
      createNewCategory(createCategory.subCategory).then(response => {
        setRefresh(!refresh)
      }).then(() => resetCategory())
      retrieveCategoryByParentCode(selectCategory).then(response => {
        setCategoryList(response)
      })
    }
  }

  /**
   * 검색
   * @returns {Promise<void>}
   */
  const handleSearchCategory = async () => {
    retrieveTopLevelCategory(searchKeyword).then(response => {
      setTopLevelCategoryList(response)
      console.log(response)
      if(response.length !== 0) {
        handleSelectCategory(response[0]?.code)
      } else {
        setCategoryList([])
      }
    })
  }

  return(
    <>
      <Board>
        <BoardHeader>광고주 카테고리 관리</BoardHeader>
        <RowSpan style={{marginBottom: 15, justifyContent: 'flex-start'}}>
          <ColSpan1 style={{paddingLeft: 0}}>
            <SearchInput>
              <Input
                value={searchKeyword}
                onChange={handleChangeSearchCategory}
                placeholder={'카테고리 검색'}
                onKeyDown={event => (event.key === 'Enter') && handleSearchCategory()}
              />
            </SearchInput>
          </ColSpan1>
          <GraySearchButton onClick={handleSearchCategory}>검색</GraySearchButton>
        </RowSpan>
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
              {topLevelCategoryList?.length !== 0 && topLevelCategoryList?.map((item, key) => {
                return (
                  <CategoryItem
                    key={key}
                    onClick={() => handleSelectCategory(item.code)}
                    active={item.code === selectCategory}
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
                <ColSpan1><SearchButton onClick={handleCreateSubCategory} disabled={selectCategory === ''}>등록</SearchButton></ColSpan1>
              </div>
            </CategoryEnroll>
            <SubCategoryBody>
              {categoryList?.length !== 0 && categoryList.map((item, key) => {
                return(
                  <SubCategoryItem key={key}>{item.name}</SubCategoryItem>
                )
              })}
              {topLevelCategoryList?.length === 0 && <div style={{padding: 30}}>검색 결과가 없습니다.</div>}
            </SubCategoryBody>
          </SubCategory>
        </CategoryContainer>
      </Board>
    </>
  )
}

