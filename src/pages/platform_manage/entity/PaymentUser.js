import React from "react";
import {atom} from "jotai/index";
import {decimalFormat} from "../../../common/StringUtils";
import moment from "moment";

export const PaymentDetailsDataAtom = atom([])
export const PointDetailsDataAtom = atom([])

/*은행 리스트 테스트 값 */
export const refundRequestData = {
    bankType: [
        {key: "1", value: 'KDB_BANK', label: 'KDB산업은행'},
        {key: "2", value: 'IBK_BANK', label: 'IBK기업은행'},
        {key: "3", value: 'KOOKMIN_BANK', label: '국민은행'},
        {key: "4", value: 'KEB_BANK', label: 'KEB하나은행'},
        {key: "5", value: 'SUHYUP_BANK', label: '수협'},
        {key: "6", value: 'NONGHYUP_BANK', label: '농협'},
        {key: "7", value: 'REGIONAL_NONGHYUP_BANK', label: '농협중앙회'},
        {key: "8", value: 'WOORI_BANK', label: '우리은행'},
        {key: "9", value: 'SC_BANK', label: 'SC제일은행'},
        {key: "10", value: 'SHINHAN_BANK', label: '신한은행'},
        {key: "11", value: 'CITY_BANK', label: '시티은행'},
        {key: "12", value: 'DAEGU_BANK', label: '대구은행'},
        {key: "13", value: 'BUSAN_BANK', label: '부산은행'},
        {key: "14", value: 'GWANGJU_BANK', label: '광주은행'},
        {key: "15", value: 'JEJU_BANK', label: '제주은행'},
        {key: "16", value: 'JEONBUK_BANK', label: '전북은행'},
        {key: "17", value: 'GYEONGNAM_BANK', label: '경남은행'},
        {key: "18", value: 'KFCC_BANK', label: '새마을금고'},
        {key: "19", value: 'SHINHYUP_BANK', label: '신협'},
        {key: "20", value: 'FSB_BANK', label: '저축은행중앙회'},
        {key: "21", value: 'NFCF_BANK', label: '산립조합중앙회'},
        {key: "22", value: 'EPOST_BANK', label: '우체국'},
        {key: "23", value: 'HANA_BANK', label: '하나은행'},
        {key: "24", value: 'K_BANK', label: '케이뱅크'},
        {key: "25", value: 'KAKAO_BANK', label: '카카오뱅크'},
        {key: "26", value: 'TOSS_BANK', label: '토스뱅크'},
    ],
    sortType: null
}

/**
 * 사용자 결제내역 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const PaymentDetailsColumns = [
    {
        name: 'createdAt',
        header: '신청 일시',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            const dateString = moment(value).format('YYYY-MM-DD');
            return (<p>{dateString}</p>)
        }
    },
    {
        // name: 'progressType',
        name: 'paymentStatusType',
        header: '신청 상태',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            let valueType = {
                // REGISTRATION_TRADE: { label: '결제 신청', color: 'blue' },
                // AUTHENTICATION_TRADE: { label: '결제 인증', color: 'orange' },
                // APPROVAL_TRADE: { label: '결제 완료', color: 'green' },
                // REVISE_TRADE: { label: '결제 개정', color: 'pink' },
                // PAYMENT_PROGRESS: { label: '결제 진행', color: 'green' },
                PAYMENT_COMPLETED: { label: '결제 완료', color: 'blue' },
                PAYMENT_CANCELED: { label: '결제 취소', color: 'orange' },
                PAYMENT_FAILED: { label: '결제 실패', color: 'red' },
                ERROR: { label: 'ERROR', color: 'red' }
            }[value] || { label: '', color: '' };
            return (
              <p style={{ color: valueType.color }}>{valueType.label}</p>
            )
        }
    },
    {
        name: 'paymentMethodType',
        header: '결제/신청 방식',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            let valueType = {
                CARD: '카드 결제',
                TRANS: '계좌이체',
                V_BANK: '가상계좌',
                MOBILE: '휴대폰 결제',
                ADVANCE_PAYMENT: 'ADVANCE_PAYMENT',
                SIMPLE_PAYMENT: 'SIMPLE_PAYMENT',
                BATCH: 'BATCH',
            }[value] || '';
            return (
              <p>{valueType}</p>
            )
        }
    },
    {
        name: 'creditCardType',
        header: '결제 수단',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({value, cellProps}) =>{
            return (
              cellProps.data.bankType !== null ?
                (<p>{cellProps.data.bankType}</p>) :
                cellProps.data.creditCardType !== null ?
                  (
                    <>
                        <p>{cellProps.data.creditCardType}</p>
                        <p>{cellProps.data.cardNo}</p>
                    </>
                  ) : "-"
            )
        }
    },
    {
        name: 'amount',
        header: '결제/신청 금액',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
    },
]

/**
 * 사용자 포인트 지급 내역 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const PointDetailsColumns = [
    {
        name: 'createdAt',
        header: '신청 일시',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            const dateString = moment(value).format('YYYY-MM-DD');
            return (<p>{dateString}</p>)
        }
    },
    {
        name: 'pointHistoryType',
        header: '신청 상태',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            let valueType = {
                CHARGE_OF_PAYMENT: { label: '결제 완료', color: 'blue' },
                REFUND_OF_PAYMENT: { label: '환불 신청', color: 'orange' },
                GIVEN_BY_ADMIN: { label: '포인트 지급', color: 'green' },
                TAKEN_BY_ADMIN: { label: '포인트 차감', color: 'orange' },
                REFUND_REQUEST_OF_USER: { label: '환불 요청', color: 'red' },
                REFUNDED_BY_ADMIN: { label: '환불 완료', color: 'SaddleBrown' },
                // ERROR: { label: 'ERROR', color: 'red' }
            }[value] || { label: '', color: '' };
            return (
              <p style={{ color: valueType.color }}>{valueType.label}</p>
            )
        }
    },
    {
        //[d] 은행명 + 계좌 번호
        name: 'refundBankType',
        header: '환불 정보',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value, cellProps })=> {
            let valueType = {
                //[d] 아래 목록 따로 빼서 관리 사용자, 어드민 모두 사용
                KDB_BANK: { label: 'KDB산업은행' },
                IBK_BANK: { label: 'IBK기업은행' },
                KOOKMIN_BANK: { label: '국민은행' },
                KEB_BANK: { label: 'KEB하나은행' },
                SUHYUP_BANK: { label: '수협' },
                NONGHYUP_BANK: { label: '농협' },
                REGIONAL_NONGHYUP_BANK: { label: '농협중앙회' },
                WOORI_BANK: { label: '우리은행' },
                SC_BANK: { label: 'SC제일은행' },
                SHINHAN_BANK: { label: '신한은행' },
                CITY_BANK: { label: '시티은행' },
                DAEGU_BANK: { label: '대구은행' },
                BUSAN_BANK: { label: '부산은행' },
                GWANGJU_BANK: { label: '광주은행' },
                JEJU_BANK: { label: '제주은행' },
                JEONBUK_BANK: { label: '전북은행' },
                GYEONGNAM_BANK: { label: '경남은행' },
                KFCC_BANK: { label: '새마을금고' },
                SHINHYUP_BANK: { label: '신협' },
                FSB_BANK: { label: '저축은행중앙회' },
                NFCF_BANK: { label: '산립조합중앙회' },
                EPOST_BANK: { label: '우체국' },
                HANA_BANK: { label: '하나은행' },
                K_BANK: { label: '케이뱅크' },
                KAKAO_BANK: { label: '카카오뱅크' },
                TOSS_BANK: { label: '토스뱅크' },
            }[value] || { label: '', color: '' };
            return (
              <>
                  {valueType.label === "" ?
                    <p>-</p>
                    :
                    <>
                        <p>{valueType.label} / {cellProps.data.refundBankAccount} / {cellProps.data.refundBankAccountHolder}</p>
                    </>
                  }
              </>
            )
        }
    },
    {
        name: 'point',
        header: '지급 금액',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        // [d] 6월1일 -표기 제거
        // render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
        render: ({ value }) => (
          <p className="won">{decimalFormat(String(value).replace(/-/g, ''))}</p>
        )
    },
]
