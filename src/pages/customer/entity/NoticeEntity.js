
import React from "react";
import {Link} from "react-router-dom";
import {TextMainColor} from "../../../assets/GlobalStyles";
import moment from "moment";

function getTimeData (time) {
  const TIME_ZONE = 3240 * 10000;
  const start = new Date(time)
  const end = new Date(new Date().getTime() + TIME_ZONE)
  const diff = (end - start)/1000
  const times = [
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];
  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime < 25) {
      return `${betweenTime}${value.name} 전`;
    } else {
      return time.substring(0,16)
    }
  }
  // 모든 단위가 맞지 않을 시
  return "방금 전";
}
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
    defaultWidth: 100,
    render: ({value, cellProps}) => {
      return cellProps.totalDataCount - cellProps.rowIndex
    }
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
      return <Link to={'/board/noticeDetail'} state={{data: cellProps.data}}>{value}</Link>
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
  // {
  //   name: 'createdBy',
  //   header: '작성자',
  //   defaultWidth: 150,
  //   render: ({value, cellProps}) => {
  //     return <p>{'관리자'}</p>
  //   }
  // },
  {
    name: 'createdAt',
    header: '작성 일시',
    defaultWidth: 300,
    render: ({value}) => {
      return <p>{value.substring(0,16)}</p>
    }
  }
]


export const columnInquiry = [
  // {
  //   name: 'id',
  //   header: 'No',
  //   defaultWidth: 100
  // },
  {
    name: 'title',
    header: '제목',
    defaultWidth: 500,
    render: ({value, cellProps}) => {
      return <Link to={'/board/inquiryDetail'} state={{data: cellProps.data}}>{value}</Link>
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
  // {
  //   name: 'createdBy',
  //   header: '작성자',
  //   defaultWidth: 150
  // },
  {
    name: 'createdAt',
    header: '작성 일시',
    defaultWidth: 300,
    render: ({value}) => {
      return <p>{getTimeData(value)}</p>;
    }
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