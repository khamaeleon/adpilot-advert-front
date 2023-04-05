import {atom} from "jotai";
import {Icon} from "../../../components/table";
import {dateFormat, decimalFormat} from "../../../common/StringUtils";
import {Check} from "../../../assets/GlobalStyles";
import {ImageView} from "../ProductManage";
import React from "react";

/**
 * 상품 수집 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
export const productListDataAtom = atom(null)

export const searchProductType = [
  {id: "1", value: "DEFAULT", label: "기본"},
  {id: "2", value: "PRODUCT_CODE", label: "상품코드"},
  {id: "3", value: "PRODUCT_NAME", label: "상품명"}
]

/**
 * 상품 수집 관리 리스트 컬럼 설정
 */
export const productListColumn = [
  {
    name: 'username',
    header: '광고주 아이디',
    textAlign: 'center',
    minWidth: 80,
    showColumnMenuTool: false,
  },
  {
    name: 'productCode',
    header: '상품 코드',
    textAlign: 'center',
    width: 80,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: '',
    header: '등록 일시',
    textAlign: 'center',
    width: 90,
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD HH:mm')}</p>
    }
  },
  {
    name: 'productStatusType',
    header: () => {
      return (
        <div><p>중지/품절</p><p>여부</p></div>
      )
    },
    textAlign: 'center',
    width: 100,
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <Check/>
    }
  },
  {
    name: 'productImages',
    header: '상품 이미지1',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productImages.length !== 0 &&
            <ImageView url={props.cellProps.data.productImages[0]}/>
          }
        </>
      )
    }
  },
  {
    name: 'productImages2',
    header: '상품 이미지2',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productImages.length > 1 &&
            <ImageView url={props.cellProps.data.productImages[1]}/>
          }
        </>
      )
    }
  },
  {
    name: 'productImages3',
    header: '상품 이미지3',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productImages.length > 2 &&
            <ImageView url={props.cellProps.data.productImages[2]}/>
          }
        </>
      )
    }
  },
  {
    name: 'productCategorys',
    header: () => {
      return (
        <div><p>표준 카테고리</p><p>(seq)</p></div>
      )
    },
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productCategorys.length !== 0 &&
            <span>{props.cellProps.data.productCategorys[0].name}</span>
          }
        </>
      )
    }
  },
  {
    name: 'productCategorys1',
    header: () => {
      return (
        <div><p>상품</p><p>카테고리1</p></div>
      )
    },
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productCategorys.length > 1 &&
            <span>{props.cellProps.data.productCategorys[1].name}</span>
          }
        </>
      )
    }
  },
  {
    name: 'productCategorys2',
    header: () => {
      return (
        <div><p>상품</p><p>카테고리2</p></div>
      )
    },
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productCategorys.length > 2 &&
            <span>{props.cellProps.data.productCategorys[2].name}</span>
          }
        </>
      )
    }
  },
  {
    name: 'price',
    header: '원가',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'discountRate',
    header: '할인가',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      const price = parseFloat(props.cellProps.data.price)
      const discount = parseFloat(props.cellProps.data.discountRate)
      const value = price - (price / discount)
      return (
        <p className={'won'}>{decimalFormat(value)}</p>
      )
    }
  },
  {
    name: 'productUrl',
    header: '사이트',
    textAlign: 'center',
    sortable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <div style={{display: 'flex', alignItems: 'center'}}><p>이동</p> <Icon icon={'url'} value={value}
                                                                                  cellProps={cellProps}/></div>
    }
  },
  {
    name: 'ratingPoint',
    header: '평점',
    textAlign: 'center',
    showColumnMenuTool: false
  },
  {
    name: 'reviewCnt',
    header: '리뷰수',
    textAlign: 'center',
    showColumnMenuTool: false
  },
  {
    name: 'keyword',
    header: '키워드',
    textAlign: 'center',
    showColumnMenuTool: false
  }
]
