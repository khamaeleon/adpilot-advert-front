import {
  Board, BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer, CancelButton, ColSpan1,
  ColSpan2, ColSpan3, ColSpan4,
  DefaultButton,
  Input, RelativeDiv, RowSpan, Span4, SubmitButton, SubmitContainer, TextArea,
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import React, {useEffect, useState} from "react";
import {dataTotalInfo} from "../../components/common/entity";
import {Row} from "../campaign/styles/common";
import {columnNotice, initDataNotice} from "./entity/NoticeEntity";
import WriteNoticeModal from "../../components/common/WriteNoticeModal";
import {useForm} from "react-hook-form";
import {
  selNoticeList,
} from "../../services/notice/NoticeAxios";
import {
  createNoticeAdmin, selNoticeListAdmin,
  updateNoticePublishAdmin
} from "../../services/notice/NoticeAdminAxios";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../login/entity/Common";
import {useLocation, useNavigate} from "react-router-dom";

export default function Notice() {
  const [tokenUserInfo] = useAtom(tokenResultAtom)

  const location = useLocation();
  const navigate = useNavigate();
  const {state} = location;

  const replaceLocation = () => {
    navigate(location.pathname, {replace: true});
  }

  return (
      state === null ?
          <NotionList tokenUserInfo={tokenUserInfo}/>
          :
          <NoticeDetail state={state} reset={replaceLocation} tokenUserInfo={tokenUserInfo}/>
  )
}

function NotionList(props) {

  const {tokenUserInfo} = props;

  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [noticeList, setNoticeList] = useState(initDataNotice);

  const [searchCondition, setSearchCondition] = useState(
      {keyword:'', pageSize: 20, currentPage: 1, publishYn:''});

  useEffect(()=>{
        onSearch()
      }, []);

  const handleSearch = (e) => {
    setSearchCondition({
      ...searchCondition,
      keyword: e.target.value
    })
  }

  const onWriteNotice = (data) => {
    createNoticeAdmin(data)
    .then(onSearch)

  }

  const onSearch = () => {
    const callbackFunc = (response) => {

      if (response != null) {
        setTotalInfo({
          totalCount: response.totalCount,
          currentPage: response.currentPage,
          totalPages: response.totalPages
        })
        setNoticeList(response.rows);
      }
    }

    if(tokenUserInfo.role !== 'NORMAL'){
      selNoticeListAdmin(searchCondition).then(callbackFunc);
    }else{
      selNoticeList({...searchCondition, publishYn: 'Y'}).then(callbackFunc);
    }
  }

  return <>
    <Board>
      <BoardHeader>공지사항 현황</BoardHeader>
      <BoardSearchDetail>
        <Row>
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
          {tokenUserInfo.role !== "NORMAL" &&
              <WriteNoticeModal formType={'notice'} onClick={onWriteNotice} title={'공지사항 작성'} buttonText={'글쓰기'}/>
          }
        </div>
      </BoardSearchResultTitle>
      <BoardTableContainer>
        <Table columns={tokenUserInfo.role !== 'NORMAL' ? columnNotice : columnNotice.filter(column => column.name !== 'publishYn')}
               totalCount={[totalInfo.totalCount, '공지사항']}
               data={noticeList?.sort((a,b) => {
                 if(a.id > b.id) return -1
                 else return 1
               })}
        />
      </BoardTableContainer>
    </Board>
  </>
}

function NoticeDetail(props) {

  const { state, reset, tokenUserInfo } = props;
  const { handleSubmit } = useForm()

  const [publishYn, setPublishYn] = useState(state.data?.publishYn);

  const handleRadio = (boolean) => {
    setPublishYn(boolean);
  }

  const onError = () => {}
  const onSubmit = () => {
    updateNoticePublishAdmin(state.data?.id, publishYn)
    .then(reset);
  }

  return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>
            <ColSpan3>
              <p>공지사항</p>
            </ColSpan3>

            {
              tokenUserInfo.role !== 'NORMAL' &&
                <ColSpan1>
                  <RelativeDiv>
                    <label>
                      <input
                          type={'radio'}
                          name={'notice'}
                          id={'publishY'}
                          onChange={() => handleRadio('Y')}
                          checked={publishYn === 'Y'}
                      />
                      <span>공개</span>
                    </label>
                    <label>
                      <input
                          type={'radio'}
                          name={'notice'}
                          id={'publishN'}
                          onChange={() => handleRadio('N')}
                          checked={publishYn === 'N'}
                      />
                      <span>비공개</span>
                    </label>
                  </RelativeDiv>
                </ColSpan1>
            }
          </BoardHeader>
          <BoardTableContainer>
            <RowSpan validation>
              <ColSpan4>
                <Span4>제목</Span4>
                <RelativeDiv>
                  <Input type={'text'}
                         style={{backgroundColor: 'transparent', borderWidth: 0, padding: '10px', fontWeight: 'bold'}}
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
                  <TextArea rows={25}
                            style={{backgroundColor: 'transparent', borderWidth: 0}}
                            value={state.data?.content}
                            readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan>

            </RowSpan>
          </BoardTableContainer>
        </Board>
        <SubmitContainer>
          <CancelButton type={"button"} onClick={reset}>목록</CancelButton>
          {tokenUserInfo.role !== "NORMAL" &&
            <SubmitButton type={"submit"}>{'저장'}</SubmitButton>
          }
        </SubmitContainer>
      </form>
  )
}