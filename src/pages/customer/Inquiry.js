import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer,
  ColSpan2,
  DefaultButton,
  Input,
  selectStyle
} from "../../assets/GlobalStyles";
import {Row} from "../campaign/styles/common";
import WriteNoticeModal from "../../components/common/WriteNoticeModal";
import Table from "../../components/table";
import {columnInquiry, inquiryTypes} from "./entity/NoticeEntity";
import React, {useCallback, useEffect, useState} from "react";
import {dataTotalInfo} from "../../components/common/entity";
import Select from "react-select";
import {tokenResultAtom} from "../login/entity/Common";
import {createInquiry, selInquiryList} from "../../services/notice/InquiryAxios";
import {useAtom} from "jotai/index";
import {selInquiryListAdmin} from "../../services/notice/InquiryAdminAxios";

export default function InquiryList() {

  const [tokenUserInfo] = useAtom(tokenResultAtom);

  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [isSearch, setIsSearch] = useState(false);

  const [searchCondition, setSearchCondition] = useState(
      {keyword:'', inquiryType: 'DEFAULT', pageSize: 10, currentPage: 1});

  useEffect(()=> {
    onSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenUserInfo]);

  const handleSearch = (e) => {
    setSearchCondition({
      ...searchCondition,
      keyword: e.target.value
    });
  }

  const onWriteNotice = (data) => {
    createInquiry(data)
    .then(onSearch);
  }

  const onSearch = () => {
    setIsSearch(true);
  }

  const handleSearchType = (e) => {
    if(e.id === 0) {
      setSearchCondition({
        ...searchCondition,
        inquiryType: e,
        keyword: ''
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        inquiryType: e
      })
    }
  }

  const loadData = ({skip, limit}) => {
    let params = {
      ...searchCondition,
      currentPage: skip/limit + 1,
      pageSize: limit,
      inquiryType: searchCondition.inquiryType.value
    }

    if(tokenUserInfo.role !== 'NORMAL') {
      return selInquiryListAdmin(params).then(response => {
        const totalCount = response.totalCount;
        setIsSearch(false);
        setTotalInfo({
          totalCount: response.totalCount,
          currentCount: response?.rows.length,
          currentPage: response.currentPage,
          totalPages: response.totalPages
        });
        return {data: response.rows, count: parseInt(totalCount)};
      })
    } else {
      return selInquiryList(tokenUserInfo.id, params).then(response => {
        const totalCount = response.totalCount;
        setIsSearch(false);
        setTotalInfo({
          totalCount: response.totalCount,
          currentCount: response?.rows.length,
          currentPage: response.currentPage,
          totalPages: response.totalPages
        });
        return {data: response.rows, count: parseInt(totalCount)};
      })
    }
  }
  const dataSource = useCallback(loadData, [searchCondition.currentPage, isSearch])
  return (
      <>
        <Board>
          <BoardHeader>1:1문의 현황</BoardHeader>
          <BoardSearchDetail>
            <Row>
              <Select styles={selectStyle}
                      isSearchable={false}
                      width={150}
                      options={inquiryTypes}
                      value={searchCondition.searchType !== '' ? inquiryTypes.find(type => type.value === searchCondition.inquiryType) : inquiryTypes[0]}
                      onChange={handleSearchType}
              />
              <ColSpan2>
                <Input
                    placeholder={'제목 검색'}
                    value={searchCondition.keyword}
                    readOnly={searchCondition.inquiryType === 'DEFAULT' || searchCondition.inquiryType.id === 0}
                    onChange={handleSearch}
                    onKeyDown={e => (e.key === 'Enter') && onSearch() }

                />
                <DefaultButton onClick={onSearch}>검색</DefaultButton>
              </ColSpan2>
            </Row>

          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div/>
            <div>
              {tokenUserInfo.role === 'NORMAL' &&
                  <WriteNoticeModal formType={'inquiry'} onClick={onWriteNotice} title={'1:1문의 작성'} buttonText={'문의하기'} userId={tokenUserInfo.id}/>
              }
            </div>
          </BoardSearchResultTitle>
          <BoardTableContainer>
            <Table columns={columnInquiry}
                   idProperty={'id'}
                   totalCount={[totalInfo.currentCount, '1:1문의']}
                   defaultLimit={searchCondition.pageSize}
                   data={dataSource}
                   pagination
            />
          </BoardTableContainer>
        </Board>
      </>
  )
}
