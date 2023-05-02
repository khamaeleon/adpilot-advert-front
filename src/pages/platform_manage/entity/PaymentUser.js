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
        header: '결제/신청 방식',
        defaultFlex: 1,
        resizable: false,
    },
    {
        name: '',
        header: '결제/신청 수단',
        defaultFlex: 1,
        resizable: false,
    },
    {
        name: '',
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