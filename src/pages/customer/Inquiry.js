import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer, CancelButton,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  DefaultButton,
  Input,
  RelativeDiv,
  RowSpan, selectStyle, Span4, SubmitButton, SubmitContainer, TextArea
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
import {useForm} from "react-hook-form";

export default function Inquiry() {
  const [tokenUserInfo] = useAtom(tokenResultAtom);

  const location = useLocation();
  const navigate = useNavigate();
  const {state} = location;

  const replaceLocation = () => {
    navigate(location.pathname, {replace: true});
  }

  return (
      state === null ?
          <InquiryList userId={tokenUserInfo.id} userRole={tokenUserInfo.role === 'NORMAL'}/>
          :
          <InquiryDetail state={state} reset={replaceLocation} userRole={tokenUserInfo.role === 'NORMAL'}/>
  )

}

function InquiryList(props) {

  const { userRole, userId } = props;

  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [inquiryList, setInquiryList] = useState(initDataInquiry);

  const [searchCondition, setSearchCondition] = useState(
      {keyword:'', inquiryType: 'DEFAULT', pageSize: 10, currentPage: 1});

  useEffect(()=> {
    onSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    if(!userRole){
      selInquiryListAdmin({
        ...searchCondition,
        inquiryType: searchCondition.inquiryType.value
      })
      .then(callbackFunc)
    } else {
      selInquiryList(userId ,{
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
s                      options={inquiryTypes}
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
              {userRole &&
                  <WriteNoticeModal formType={'inquiry'} onClick={onWriteNotice} title={'1:1문의 작성'} buttonText={'문의하기'} userId={userId}/>
              }
            </div>
          </BoardSearchResultTitle>
          <BoardTableContainer>
            <Table columns={columnInquiry}
                   totalCount={[totalInfo.totalCount, '1:1문의']}
                   data={inquiryList.sort((a,b) => {
                     if(a.id > b.id) return -1
                     else return 1
                   })}/>
          </BoardTableContainer>
        </Board>
      </>
  )
}

function InquiryDetail(props) {

  const { state, reset, userRole } = props;
  const { handleSubmit } = useForm();
  const [reply, setReply] = useState();

  const callbackFunc = (response) => {
    setReply(response?.replies[0]);
  }

  useEffect(()=>{
    if(!userRole){
      selInquiryByIdAdmin(state.data.id).then(callbackFunc)
    } else {
      selInquiryById(state.data.id).then(callbackFunc)
    }
  },[userRole, state])

  const onError = () => {}
  const onSubmit = () => {
    updateInquiryReply(state.data.id, reply).then(reset)
  }


  return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>
            <ColSpan3>
              <p>1:1문의</p>
            </ColSpan3>
          </BoardHeader>
          <BoardTableContainer>
            <RowSpan validation>
              <ColSpan4>
                <Span4>제목</Span4>
                <RelativeDiv>
                  <Input type={'text'}
                         style={{backgroundColor: 'transparent', borderWidth: 0, fontWeight: 'bold'}}
                         value={state.data?.title}
                         readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan validation>
              <RelativeDiv>
                <Span4>작성자</Span4>
                <span>{state.data?.createdBy}</span>
              </RelativeDiv>
              <RelativeDiv>
                <Span4>작성일</Span4>
                <span>{state.data?.createdAt}</span>
              </RelativeDiv>
            </RowSpan>
            <RowSpan validation>
              <ColSpan4 style={{alignItems: 'start'}}>
                <Span4 style={{paddingTop: '10px'}}>내용</Span4>
                <RelativeDiv>
                  <TextArea rows={!(userRole && reply === undefined) ? 10 : 20}
                            style={{backgroundColor: 'transparent', borderWidth: 0}}
                            value={state.data?.content}
                            readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
          </BoardTableContainer>
        </Board>
        { !(userRole && reply === undefined) &&
          <Board>
            <BoardHeader>
              <ColSpan3>
                <p>답변</p>
              </ColSpan3>
            </BoardHeader>
            <BoardTableContainer>
              <RowSpan validation>
                <ColSpan4>
                  <Span4>제목</Span4>
                  <RelativeDiv>
                    <Input type={'text'}
                           value={reply?.title}
                           style={userRole ? {backgroundColor: 'transparent', borderWidth: 0, fontWeight: 'bold'} : {}}
                           readOnly={userRole}
                           onChange={(e) => {
                             setReply({...reply, title: e.target.value})
                           }}
                    />
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
              <RowSpan validation>
                <ColSpan4 style={{alignItems: 'start'}}>
                  <Span4 style={{paddingTop: '10px'}}>내용</Span4>
                  <RelativeDiv>
                    <TextArea
                        rows={7}
                        value={reply?.content}
                        style={userRole ? {backgroundColor: 'transparent', borderWidth: 0} : {}}
                        readOnly={userRole}
                        onChange={(e) => {
                          setReply({...reply, content: e.target.value})
                        }}
                    />
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
            </BoardTableContainer>
          </Board>
        }
        <SubmitContainer>
          <CancelButton type={"button"} onClick={reset}>목록</CancelButton>
          {!userRole &&
              <SubmitButton type={"submit"}>{'저장'}</SubmitButton>
          }
        </SubmitContainer>
      </form>
  );
}