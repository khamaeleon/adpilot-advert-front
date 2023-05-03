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
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {findCreativeGroupList, retrieveCreativeByUserId} from "../../services/campaign/CreativeManageAxios";
import {useAtomValue} from "jotai/index";
import {tokenResultAtom} from "../login/entity/Common";

export function ManageCreative() {
  const [open, setOpen] = useState({id: 0})
  const [slideMove, setSlideMove] = useState(0)
  const tokenResult = useAtomValue(tokenResultAtom)
  const [creativeData, setCreativeData] = useState([])
  const [creativeDetailData, setCreativeDetailData] =  useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if(tokenResult.role !== 'NORMAL'){
      findCreativeGroupList(keyword).then(response => {
        console.log(response)
        setCreativeData(response.creativeGroupDtos)
      })
    }
  }, []);


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

  const handleDetailData = (userId) => {
    retrieveCreativeByUserId(userId).then(response => {
      setCreativeDetailData(response)
      if(open.id === 0){
        setOpen({
          id: userId
        })
      } else {
        setOpen({
          id: 0
        })
      }

    })
  }
  const handleSearchKeyword = () => {
    findCreativeGroupList(keyword).then(response => {
      setCreativeData(response.creativeGroupDtos)
      setOpen({id: 0})
      setCreativeDetailData([])
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
        {creativeDetailData.length !== 0 && creativeDetailData.map((item,key) => {
          return(
            <CustomDetailRow key={key}>
              <CreativeGroup>{item.creativeName}</CreativeGroup>
              <CreativeType>{item.creativeType}</CreativeType>
              <CreativeType>{item.productType}</CreativeType>
              <CreativeInfo>
                <div>
                  {item.images.map((info,idx) => {
                    return(
                      <CreativeImage key={idx}>
                        <img src={info.imagePath}/>
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
              <input type={'text'} value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            </SearchInput>
          </ColSpan2>
          <ColSpan2>
            <SearchButton onClick={handleSearchKeyword}>검색</SearchButton>
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
          {creativeData.length !== 0 && creativeData.map((item,key) => {
            return(
              <div key={key}>
                <CustomTableRow onClick={() => handleDetailData(item.userId)} style={{color: item.userId === open.id ? '#f5811f':null}}>
                  <div>{item.adverName}</div>
                  <div>{item.username}</div>
                  <div>{item.managerName}</div>
                  <div>{item.creativeCount}</div>
                </CustomTableRow>
                {item.userId === open.id && detailTable()}
              </div>
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