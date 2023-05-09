import {atom} from "jotai/index";
import {Link} from "react-router-dom";
import {Icon} from "../../../components/table";
import {decimalFormat} from "../../../common/StringUtils";
import React from "react";


export const PaymentDetailsDataAtom = atom([])
export const PointDetailsDataAtom = atom([])

/*은행 리스트 테스트 값 */
export const refundRequestData = {
    bankType: [
        {key: "1", value: 'ke', label: 'KEB하나은행'},
        {key: "2", value: 'sc', label: 'SC제일은행'},
        {key: "3", value: 'kb', label: '국민은행'},
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
        render: ({ value })=> {
            const dateString = value;
            const dateObject = new Date(dateString.split(' ')[0]);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
            const day = dateObject.getDate();
            const result = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            return (<p>{result}</p>)
        }
    },
    {
        name: 'progressType',
        header: '신청 상태',
        defaultFlex: 1,
        resizable: false,
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
    },
    {
        name: 'bankType',
        header: '결제 수단(계좌번호)',
        defaultFlex: 1,
        resizable: false,
    },
    {
        name: 'amount',
        header: '결제/신청 금액',
        defaultFlex: 1,
        resizable: false,
        render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
    },
]

/**
 * 사용자 포인트 지급 내역 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const PointDetailsColumns = [
    {
        name: '',
        header: '신청 일시',
        defaultFlex: 1,
        resizable: false,
    },
    {
        name: '',
        header: '신청 상태',
        defaultFlex: 1,
        resizable: false,
        render: ({ value })=> <p>{decimalFormat(value)}</p>
    },
    {
        name: '',
        header: '환불 정보',
        defaultFlex: 1,
        resizable: false,
    },
    {
        name: '',
        header: '지급 금액',
        defaultFlex: 1,
        resizable: false,
        render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
    },
]