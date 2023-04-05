import {
  Board,
  BoardHeader, BoardSearchDetail,
  BoardSearchResult,
  ColSpan2,
  DefaultButton,
  Input,
  RowSpan, SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import React, {useState} from "react";
import styled from "styled-components";

export function ManageCreative() {
  const [open, setOpen] = useState({id: 0})
  const [slideMove, setSlideMove] = useState(0)
  const creativeData = [
    {
      id: 1,
      name: '노스페이스',
      userId: 'north55',
      managerName: '홍길동',
      creativeGroup: 10,
    },
    {
      id: 2,
      name: '아디다스',
      userId: 'hsad_adidas',
      managerName: '홍길동',
      creativeGroup: 0,
    },
    {
      id: 3,
      name: '나이키',
      userId: 'nike98',
      managerName: '홍길동',
      creativeGroup: 3,
    },
  ]
  const creativeDetailData =  [
    {
      id: 1,
      creativeGroupName: '노스페이스 신규 프로모션',
      creativeType:'네이티브',
      creativeInfo: [
        {key:1, url: '/assets/images/common/sample1.png'},
        {key:2, url: '/assets/images/common/sample2.png'},
        {key:3, url: '/assets/images/common/sample3.png'},
        {key:4, url: '/assets/images/common/sample4.png'},
        {key:5, url: '/assets/images/common/sample5.png'},
        {key:6, url: '/assets/images/common/sample1.png'},
        {key:7, url: '/assets/images/common/sample2.png'},
        {key:8, url: '/assets/images/common/sample3.png'},
        {key:9, url: '/assets/images/common/sample4.png'},
        {key:10, url: '/assets/images/common/sample5.png'}
      ]
    },
    {
      id: 1,
      creativeGroupName: '나이키 신규 프로모션',
      creativeType:'고정배너',
      creativeInfo: [
        {key:1, url: '/assets/images/common/sample1.png'},
        {key:2, url: '/assets/images/common/sample2.png'},
      ]
    }
  ]

  const handleSlideLeft = (length) => {
    if(slideMove < (length/5) -1 ){
      setSlideMove(
        slideMove+1
      )
    }
  }

  const handleSlideRight = () => {
    if(slideMove > 0){
      setSlideMove(
        slideMove-1
      )
    }
  }

  const handleDetailData = (id) => {
    setOpen({
      id: id
    })
  }
  const detailTable = () => {
    return(
      <CustomDetailTable>
        <CustomDetailHeader>
          <ShadowEffect/>
          <CreativeGroup>크리에이티브 그룹명</CreativeGroup>
          <CreativeInfo>크리에이티브 정보</CreativeInfo>
        </CustomDetailHeader>
        {creativeDetailData.map((item,key) => {
          return(
            <CustomDetailRow key={key}>
              <CreativeGroup>{item.creativeGroupName}</CreativeGroup>
              <CreativeType>{item.creativeType}</CreativeType>
              <CreativeInfo>
                <div>
                  {item.creativeInfo.map((info,idx) => {
                    return(
                      <CreativeImage>
                        <img src={info.url}/>
                      </CreativeImage>
                    )
                  })}
                </div>
              </CreativeInfo>
            </CustomDetailRow>
          )
        })}
      </CustomDetailTable>
    )
  }

  return(
    <Board>
      <BoardHeader>크리에이티브 그룹 현황</BoardHeader>
      <BoardSearchDetail>
        <RowSpan>
          <ColSpan2>
            <SearchInput>
              <input type={'text'}/>
            </SearchInput>
          </ColSpan2>
          <ColSpan2>
            <SearchButton>검색</SearchButton>
          </ColSpan2>
        </RowSpan>
      </BoardSearchDetail>
      <BoardSearchResult>
        <CustomTable>
          <CustomTableHeader>
            <div>광고주명</div>
            <div>아이디</div>
            <div>담당자</div>
            <div>크리에이티브 그룹</div>
          </CustomTableHeader>
          {creativeData.map((item,key) => {
            return(
              <>
                <CustomTableRow onClick={() => handleDetailData(item.id)} style={{color: item.id === open.id ? '#f5811f':null}}>
                  <div>{item.name}</div>
                  <div>{item.userId}</div>
                  <div>{item.managerName}</div>
                  <div>{item.creativeGroup}</div>
                </CustomTableRow>
                {item.id === open.id && detailTable()}
              </>
            )
          })}
        </CustomTable>
      </BoardSearchResult>
    </Board>
  )
}

export const CustomTable = styled.div``
export const CustomTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
  border-top: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  & > div{
    padding: 9px;
    width: 100%;
    text-align: center;
  }
`

export const CustomTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #bbbbbb;
  cursor: pointer;
  & > div{
    padding: 9px;
    width: 100%;
    text-align: center;
  }
`
export const CustomDetailTable = styled.div`
  border-top: 1px solid #f5811f;
  border-bottom: 1px solid #f5811f;
`
export const CustomDetailRow = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
`

export const ShadowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 10px;
  padding: 0 0 9px;
  opacity: 0.15;
  background-image: linear-gradient(to bottom, hsl(27, 60%, 33%), hsla(27, 60%, 33%, 0));
  z-index: 999;
}
`

export const CustomDetailHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fffaf1;
  border-bottom: 1px solid #ffe3cb;
`

export const CreativeGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 0;
  width: 30%;
  border-bottom: 1px solid #ffe3cb;
`
export const CreativeType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 0;
  width: 10%;
  border-bottom: 1px solid #ffe3cb;
  border-left: 1px solid #ffe3cb
`
export const CreativeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 0;
  width: 60%;
  border-bottom: 1px solid #ffe3cb;
`

export const CreativeImage = styled.div`
  display: inline-block;
  margin: 5px;
  padding:5px;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  vertical-align: middle;
  text-align: center;
  & > img {
    margin-top: 50%;
    transform: translateY(-50%);
    max-width: 100%;
  }
`
export const SlideContainer = styled.div`
  position: relative;
  width: 550px;
  height: 100px;
  overflow: hidden;
`
export const Left = styled.div`
  margin: 10px;
  width: 24px;
  height: 24px;
  background-image: url("/assets/images/common/btn_table_slide_off@3x.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  &:hover {
    background-image: url("/assets/images/common/btn_table_slide_on@3x.png");
    cursor: pointer;
  }
`
export const Right = styled.div`
  margin: 10px;
  width: 24px;
  height: 24px;
  background-image: url("/assets/images/common/btn_table_slide_off@3x.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(180deg);
  &:hover {
    background-image: url("/assets/images/common/btn_table_slide_on@3x.png");
    cursor: pointer;
  }
`