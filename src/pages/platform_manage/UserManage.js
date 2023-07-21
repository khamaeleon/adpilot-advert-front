import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan0, ColSpan4,
  ColTitle,
  GraySearchButton,
  RowSpan,
  SearchInput,
  selectStyle,
  Span2
} from "../../assets/GlobalStyles";
import Select from "react-select";
import Table from "../../components/table";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {dataTotalInfo} from "../../components/common/entity";
import {selUserList} from "../../services/Platform/ManageUserAxios";
import {hostList} from "../signup/entity/Common";
import {
  adverType,
  columnUserData,
  searchAccountInfo,
  selectAccountUseInfo,
  selectKeywordType,
  userInfoAtom
} from "./entity/User";
import {hostType} from "./entity/Common";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }

  /**
   * 검색 타입 선택
   * @param searchType
   */
  const handleSearchType = (searchType) =>{
    if(searchType.value === 'DEFAULT') {
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        searchType: searchType,
        keyword: ''
      })
    } else {
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        searchType: searchType
      })
    }
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
    selUserList({
      ...searchAccountInfoState,
      accountStateType:searchAccountInfoState.accountStateType?.value,
      hostType:searchAccountInfoState.hostType?.value,
      adverType:searchAccountInfoState.adverType?.value,
      searchType: searchAccountInfoState.searchType?.value
    }).then(response =>{
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
        <BoardSearchDetail style={{marginTop: 10}}>
          <div style={{marginRight: 10}}>
            <RowSpan style={{marginTop: 0, justifyContent: 'flex-start'}}>
              <ColSpan4>
                <ColSpan0>
                  <Span2>광고주 구분</Span2>
                  <Select options={adverTypeState}
                          value={(searchAccountInfoState.adverType !== null && searchAccountInfoState.adverType.value !== '') ? searchAccountInfoState.adverType : adverTypeState[0]}
                          onChange={handleAdverType}
                          width={140}
                          styles={selectStyle}
                          isSearchable={false}
                  />
                </ColSpan0>
                <ColSpan0>
                  <ColTitle><Span2>호스팅 타입</Span2></ColTitle>
                  <Select options={hostTypeState}
                          value={searchAccountInfoState?.hostType !== null ? hostList.find(value => value.value === searchAccountInfoState?.hostType) : hostTypeState[0]  }
                          onChange={handleSelectHosting}
                          width={140}
                          styles={selectStyle}
                          isSearchable={false}
                  />
                </ColSpan0>
                <ColSpan0>
                  <ColTitle><Span2>사용 여부</Span2></ColTitle>
                  <Select options={accountUseYnState}
                          value={(searchAccountInfoState.accountStateType !== null && searchAccountInfoState.accountStateType.value !== '') ? searchAccountInfoState.accountStateType : accountUseYnState[0]}
                          onChange={handleSelectAccountStateType}
                          width={140}
                          styles={selectStyle}
                          isSearchable={false}
                  />
                </ColSpan0>
              </ColSpan4>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start'}}>
              <ColSpan4>
                {/*<Span2>검색어</Span2>*/}
                <Select options={searchType}
                        value={(searchAccountInfoState.searchType !== null && searchAccountInfoState.searchType.value !== '') ? searchAccountInfoState.searchType : searchType[0]}
                        onChange={handleSearchType}
                        width={140}
                        styles={selectStyle}
                        isSearchable={false}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'아이디 및 담당자명 검색'}
                         value={searchAccountInfoState?.keyword !== null ? searchAccountInfoState?.keyword : ''}
                         onChange={handleSearchKeyword}
                         readOnly={searchAccountInfoState.searchType.value === 'DEFAULT'}
                         onKeyDown={e => (e.code === 'Enter') && searchUserList() }
                  />
                </SearchInput>
              </ColSpan4>
            </RowSpan>
          </div>
          <GraySearchButton onClick={()=>searchUserList()}>적용</GraySearchButton>
        </BoardSearchDetail>
        {userInfoList !== null &&
          <BoardTableContainer>
            <Table columns={columnUserData}
                   totalCount={[totalInfo.totalCount, '사용자']}
                   downloadList={true}
                   data={userInfoList}/>
          </BoardTableContainer>
        }
      </Board>
    </>
  )
}