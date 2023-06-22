
import React from "react";
import {Link} from "react-router-dom";
import {TextMainColor} from "../../../assets/GlobalStyles";

export const inquiryTypes = [
  {id: 0, value: 'DEFAULT', label:'전체'},
  {id: 1, value: 'ADVER_INQUIRY', label:'광고문의'},
  {id: 2, value: 'ALLIANCE', label:'제휴'},
  {id: 3, value: 'ETC', label: '기타'}
]

export const initDataNotice = [];

export const initDataInquiry = [];

export const columnNotice = [
  {
    name: 'id',
    header: 'No',
    defaultWidth: 100
  },
  {
    name: 'title',
    header: '제목',
    defaultWidth: 500,
    cellProps: {
      style: {
        fontWeight: 'bold'
      }
    },
    render: ({value, cellProps}) => {
      return <Link to={'/board/notice'} state={{data: cellProps.data}}>{value}</Link>
    }

  },
  {
    name: 'publishYn',
    header: '공개 여부',
    defaultWidth: 150,
    render: ({value, cellProps}) => {
      return <p>{value === 'Y' ? '공개' : '비공개'}</p>
    }
  },
  {
    name: 'createdBy',
    header: '작성자',
    defaultWidth: 150
  },
  {
    name: 'createdAt',
    header: '작성 일시',
    defaultWidth: 300
  }
]


export const columnInquiry = [
  {
    name: 'id',
    header: 'No',
    defaultWidth: 100
  },
  {
    name: 'title',
    header: '제목',
    defaultWidth: 500,
    render: ({value, cellProps}) => {
      return <Link to={'/board/inquiry'} state={{data: cellProps.data}}>{value}</Link>
    }
  },
  {
    name: 'inquiryType',
    header: '문의 구분',
    defaultWidth: 150,
    render: ({value, cellprops}) => {
      return <p>{inquiryTypes.find(type => type.value === value)?.label}</p>;
    }
  },
  {
    name: 'createdBy',
    header: '작성자',
    defaultWidth: 150
  },
  {
    name: 'createdAt',
    header: '작성 일시',
    defaultWidth: 300
  },
  {
    name: 'replies',
    header: '답변 상태',
    defaultWidth: 200,
    render: ({value, cellprops}) => {
      return value.length !== 0 ? <TextMainColor>{'답변 완료'}</TextMainColor> : <p>{'답변 대기'}</p>
    }
  }
]