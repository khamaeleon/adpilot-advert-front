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

        // 증권사 목록
        // {key: "28", value: 'KB_SEC', label: '국민은행'},
        // {key: "29", value: 'KTB_SEC', label: '국민은행'},
        // {key: "30", value: 'MIRAEASSET_SEC', label: '국민은행'},
        // {key: "31", value: 'SAMSUNG_SEC', label: '국민은행'},
        // {key: "32", value: 'KI_SEC', label: '국민은행'},
        // {key: "33", value: 'NH_SEC', label: '국민은행'},
        // {key: "34", value: 'KYOBO_SEC', label: '국민은행'},
        // {key: "35", value: 'HI_SEC', label: '국민은행'},
        // {key: "36", value: 'HMC_SEC', label: '국민은행'},
        // {key: "37", value: 'KIWOOM_SEC', label: '국민은행'},
        // {key: "38", value: 'EBEST_SEC', label: '국민은행'},
        // {key: "39", value: 'SK_SEC', label: '국민은행'},
        //
        // {key: "40", value: 'DAISHIN_SEC', label: '국민은행'},
        // {key: "41", value: 'HANWHA_SEC', label: '국민은행'},
        // {key: "42", value: 'HANA_SEC', label: '국민은행'},
        // {key: "43", value: 'TOSS_SEC', label: '국민은행'},
        // {key: "44", value: 'SHINHAN_SEC', label: '국민은행'},
        // {key: "45", value: 'DONGBU_SEC', label: '국민은행'},
        // {key: "46", value: 'EUGENE_SEC', label: '국민은행'},
        // {key: "47", value: 'MERITZ_SEC', label: '국민은행'},

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
        name: 'progressType',
        header: '신청 상태',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            let valueType = {
                REGISTRATION_TRADE: { label: '결제 신청', color: 'blue' },
                AUTHENTICATION_TRADE: { label: '결제 인증', color: 'orange' },
                APPROVAL_TRADE: { label: '결제 완료', color: 'green' },
                REVISE_TRADE: { label: '결제 개정', color: 'pink' },
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
        header: '결제 수단(카드)',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            return (
              <p>{value === true ? value : '-'}</p>
            )
        }
    },
    {
        name: 'bankType',
        header: '결제 수단(계좌번호)',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            return (
              <p>{value === true ? value : '-'}</p>
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
                CHARGE_OF_PAYMENT: { label: '충전 신청', color: 'blue' },
                REFUND_OF_PAYMENT: { label: '환불 신청', color: 'orange' },
                GIVEN_BY_ADMIN: { label: '포인트 지급', color: 'green' },
                TAKEN_BY_ADMIN: { label: '포인트 차감', color: 'pink' },
                REFUND_REQUEST_OF_USER: { label: '환불 요청', color: 'pink' },
                REFUNDED_BY_ADMIN: { label: '환불 완료', color: 'pink' },
                ERROR: { label: 'ERROR', color: 'red' }
            }[value] || { label: '', color: '' };
            return (
              <p style={{ color: valueType.color }}>{valueType.label}</p>
            )
        }
    },
    {
        name: 'description',
        header: '환불 정보',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> {
            return (
              <p>{value !== "" ? value : '-'}</p>
            )
        }
    },
    {
        name: 'point',
        header: '지급 금액',
        defaultFlex: 1,
        resizable: false,
        textAlign: 'center',
        render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
    },
]
