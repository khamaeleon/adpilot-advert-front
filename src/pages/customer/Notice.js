import {
  Board, BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer,
  ColSpan2,
  DefaultButton,
  Input,
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import React, {useEffect, useState} from "react";
import {dataTotalInfo} from "../../components/common/entity";
import {Row} from "../campaign/styles/common";
import {columnNotice, initDataNotice} from "./entity/NoticeEntity";
import WriteNoticeModal from "../../components/common/WriteNoticeModal";
import {
  selNoticeList,
} from "../../services/notice/NoticeAxios";
import {
  createNoticeAdmin, selNoticeListAdmin
} from "../../services/notice/NoticeAdminAxios";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../login/entity/Common";

export default function Notice() {

  const [tokenUserInfo] = useAtom(tokenResultAtom)

  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [noticeList, setNoticeList] = useState(initDataNotice);

  const [searchCondition, setSearchCondition] = useState(
      {keyword:'', pageSize: 20, currentPage: 1, publishYn:''});

  useEffect(()=>{
        onSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [tokenUserInfo]);

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
               pagenations
               defaultLimit={searchCondition.pageSize}
               data={noticeList?.sort((a,b) => {
                 if(a.id > b.id) return -1
                 else return 1
               })}
        />
      </BoardTableContainer>
    </Board>
  </>
}