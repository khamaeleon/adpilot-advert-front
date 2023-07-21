import React, {useCallback, useEffect, useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResultTitle,
  BoardTableContainer, ColSpan2, RowSpan,
  SaveExcelButton
} from "../../assets/GlobalStyles";
import 'react-confirm-alert/src/react-confirm-alert.css';

import {useAtom} from "jotai";
import {PaymentCondition} from "../../components/Platform/Condition";
import {paymentAllListRequest} from "../../services/payment/admin/PaymentAllListRequestAxios"
import {
  paymentColumns,
  searchPaymentParams,
  searchPaymentType,
} from "./entity/Payment";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {TotalCount} from "../../components/table/TableDetail";
import {Small} from "../../components/table/styles";

function PaymentManage() {
  const [totalInfo, setTotalInfo] = useState(0)
  const [searchPaymentParamsState, setSearchPaymentParamsState] = useAtom(searchPaymentParams)
  const [searchState, setSearchState] = useState(searchPaymentParamsState)

  //[d] 그리드 데이터
  const [pageSize, ] = useState(10); // 한 페이지 보여줄 데이터
  const [currentPage, ] = useState(1); // 현재 페이지

  const gridStyle = {minHeight: 510, textAlign: 'center'}

  useEffect(() => {
    handlePaymentTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPaymentParamsState])
  /**
   * 검색 버튼
   */
  const handleData = () => {
    setSearchPaymentParamsState({
      ...searchState,
    })
  }
  const handlePaymentTableData = (props={}) => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    const { skip = (currentPage - 1) * pageSize, limit = pageSize } = props;

    const requestData = {
      pageSize: limit,
      currentPage: skip / limit + 1,
      searchStartDate: searchPaymentParamsState.startAt,
      searchEndDate: searchPaymentParamsState.endAt,
      // pointHistoryTypes: null,
      paymentStatusTypes: null,
      //[d] 결제 신청만 있어서 null 이 아니면 볼 수 없어요~!
      // paymentStatusType: searchPaymentParamsState.statusList,
      keywordType: searchPaymentParamsState.searchType,
      keyword: searchPaymentParamsState.search
    };
    return paymentAllListRequest ( requestData )
      .then(response => {
        console.log(response);
        // 성공적인 응답 처리
        if (response !== null) {
          // console.log(response)
          const { totalCount, rows: data } = response;
          setTotalInfo(totalCount);
          return Promise.resolve({ data, count: parseInt(totalCount) });
        } else {
          return Promise.resolve({ data: [], count: 0 });
        }
      })
      .catch(error => {
        // 실패한 응답 처리
        console.error("실패 응답 처리",error);
      });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataCallback = useCallback( handlePaymentTableData , [totalInfo, searchPaymentParamsState])

  return (
    <>
      <Board>
        <BoardHeader>결재 현황</BoardHeader>
        <PaymentCondition searchType={searchPaymentType} searchCondition={searchState} setSearchCondition={setSearchState} handleTableData={handleData} />
        <BoardTableContainer>
          <RowSpan>
            <ColSpan2 style={{paddingLeft: 0}}>
              <TotalCount><span/>총 <span>{totalInfo}</span> 건의 결제 내역</TotalCount>
            </ColSpan2>
              {/*<SaveExcelButton>엑셀 저장</SaveExcelButton>*/}
          </RowSpan>
          <ReactDataGrid
            licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
            handle={null}
            columns={paymentColumns}
            dataSource={dataCallback}
            headerHeight={48}
            showZebraRows={true}
            showCellBorders={'horizontal'}
            enableColumnAutosize={true}
            showColumnMenuLockOptions={false}
            showColumnMenuGroupOptions={false}
            emptyText={'결제 내역이 없습니다.'}
            limit={10}
            pagination={true}
            sortable={false}
            style={gridStyle}
            activeCell={null}
          />
        </BoardTableContainer>
      </Board>
    </>
  )
}

export default PaymentManage



