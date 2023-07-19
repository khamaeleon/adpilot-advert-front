import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer,
  CancelButton,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  DefaultButton,
  Input,
  RelativeDiv,
  RowSpan,
  selectStyle, Span2,
  Span4,
  SubmitButton,
  SubmitContainer,
  TextArea,
  ValidationScript
} from "../../assets/GlobalStyles";
import {Row} from "../campaign/styles/common";
import WriteNoticeModal from "../../components/common/WriteNoticeModal";
import Table from "../../components/table";
import {
  inquiryTypes,
  initDataInquiry, columnInquiry
} from "./entity/NoticeEntity";
import React, {useEffect, useState} from "react";
import {dataTotalInfo} from "../../components/common/entity";
import Select from "react-select";
import {tokenResultAtom} from "../login/entity/Common";
import {
  createInquiry, selInquiryById,
  selInquiryList
} from "../../services/notice/InquiryAxios";
import {useAtom} from "jotai/index";
import {useLocation, useNavigate} from "react-router-dom";
import {
  selInquiryByIdAdmin,
  selInquiryListAdmin, updateInquiryReply
} from "../../services/notice/InquiryAdminAxios";
import {Controller, useForm} from "react-hook-form";

export default function InquiryList(props) {

  const [tokenUserInfo] = useAtom(tokenResultAtom);

  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [inquiryList, setInquiryList] = useState(initDataInquiry);

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
    const callbackFunc = (response) => {
      if (response != null) {
        setInquiryList(response.rows);
        setTotalInfo({
          totalCount: response.totalCount,
          currentPage: response.currentPage,
          totalPages: response.totalPages
        })
      }
    }

    if(tokenUserInfo.role !== 'NORMAL'){
      selInquiryListAdmin({
        ...searchCondition,
        inquiryType: searchCondition.inquiryType.value
      })
      .then(callbackFunc)
    } else {
      selInquiryList(tokenUserInfo.id ,{
        ...searchCondition,
        inquiryType: searchCondition.inquiryType.value
      })
      .then(callbackFunc)
    }
  }

  const handleSearchType = (e) => {
    setSearchCondition({
      ...searchCondition,
      inquiryType: e
    })
  }

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
                    onChange={handleSearch}
                    onKeyDown={e => (e.code === 'Enter') && onSearch() }

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
                   totalCount={[totalInfo.totalCount, '1:1문의']}
                   pagenations
                   defaultLimit={searchCondition.pageSize}
                   data={inquiryList.sort((a,b) => {
                     if(a.id > b.id) return -1
                     else return 1
                   })}/>
          </BoardTableContainer>
        </Board>
      </>
  )
}
