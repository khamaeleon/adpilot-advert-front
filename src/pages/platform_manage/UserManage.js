import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer,
  ColSpan1,
  ColSpan2,
  ColTitle,
  inputStyle,
  RowSpan,
  SaveExcelButton,
  SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import Select from "react-select";
import Table from "../../components/table";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {dataTotalInfo} from "../../components/common/entity";
import {selUserList} from "../../services/Platform/ManageUserAxios";
import {hostList} from "../signup/entity";
import {
  adverType,
  columnUserData,
  searchAccountInfo,
  selectAccountUseInfo,
  selectKeywordType,
  userInfoAtom
} from "./entity/user";
import {hostType} from "./entity/common";

export default function UserManage(){
  const [searchAccountInfoState ,setSearchAccountInfoState] = useState(searchAccountInfo)
  const [adverTypeState]=useState(adverType)
  const [hostTypeState]=useState(hostType)
  const [searchType,]=useState(selectKeywordType)
  const [accountUseYnState]=useState(selectAccountUseInfo)
  const [userInfoList, setUserInfoList] = useAtom(userInfoAtom)
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)

  useEffect(()=>{
    selUserList(searchAccountInfoState).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  },[])

  /**
   * 광고주 타입 변경
   * @param adverType
   */
  const handleAdverType =(adverType) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      adverType: adverType
    })
    //검색
    selUserList({...searchAccountInfoState,adverType:adverType.value}).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }

  /**
   * 호스트 타입
   * @param hostType
   */
  const handleSelectHosting = (selectHostType) => {
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      hostType: selectHostType
    })
    //검색
    selUserList({...searchAccountInfoState,hostType:selectHostType.value}).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }

  /**
   * 계정 사용여부
   * @param accountStateType
   */
  const handleSelectAccountStateType =(accountState) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      accountStateType: accountState
    })
    //검색
    selUserList({...searchAccountInfoState,accountStateType:accountState.value}).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }

  /**
   * 검색 타입 선택
   * @param searchType
   */
  const handleSearchType = (searchType) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      searchType:searchType
    })
  }

  /**
   * 검색어 입력
   * @param event
   */
  const handleSearchKeyword = (event) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      keyword: event.target.value,
    })
  }

  /**
   * 검색버튼
   */
  const searchUserList =() =>{
    selUserList(searchAccountInfoState).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }

  return(
    <>
      <Board>
        <BoardHeader>사용자 관리</BoardHeader>
        <BoardSearchDetail>
          {/*line1*/}
          <RowSpan style={{justifyContent: 'flex-start', marginBottom: 20}}>
            <ColSpan1>
              <ColTitle><span>광고주 구분</span></ColTitle>
              <div>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={adverTypeState}
                        value={(searchAccountInfoState.adverType !== null && searchAccountInfoState.adverType.value !== '') ? searchAccountInfoState.adverType : adverTypeState[0]}
                        onChange={handleAdverType}
                />
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><span>호스팅 타입</span></ColTitle>
              <div>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={hostTypeState}
                        value={searchAccountInfoState?.hostType !== null ? hostList.find(value => value.value === searchAccountInfoState?.hostType) : hostTypeState[0]  }
                        onChange={handleSelectHosting}
                />
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><span>사용 여부</span></ColTitle>
              <div>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={accountUseYnState}
                        value={(searchAccountInfoState.accountStateType !== null && searchAccountInfoState.accountStateType.value !== '') ? searchAccountInfoState.accountStateType : accountUseYnState[0]}
                        onChange={handleSelectAccountStateType}
                />
              </div>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <ColTitle><span>검색어</span></ColTitle>
              <Select styles={inputStyle}
                      components={{IndicatorSeparator: () => null}}
                      options={searchType}
                      value={(searchAccountInfoState.searchType !== null && searchAccountInfoState.searchType.value !== '') ? searchAccountInfoState.searchType : {key: "0", value: "select", label: "선택"}}
                      onChange={handleSearchType}
              />
              <SearchInput>
                <input type={'text'}
                       placeholder={'아이디 및 담당자명 검색'}
                       value={searchAccountInfoState?.keyword !== null ? searchAccountInfoState?.keyword : ''}
                       onChange={handleSearchKeyword}
                       readOnly={(searchAccountInfoState.searchType === null || searchAccountInfoState.searchType.value === 'select') ? true : false}
                />
              </SearchInput>
              <SearchButton onClick={()=>searchUserList()}>검색</SearchButton>
            </ColSpan2>
          </RowSpan>
        </BoardSearchDetail>
        <BoardSearchResultTitle>
          <div></div>
          <div>
            <SaveExcelButton>엑셀 저장</SaveExcelButton>
          </div>
        </BoardSearchResultTitle>
        <BoardTableContainer>
          <Table columns={columnUserData}
                 totalCount={[totalInfo.totalCount, '사용자']}
                 data={userInfoList}/>
        </BoardTableContainer>
      </Board>
    </>
  )
}