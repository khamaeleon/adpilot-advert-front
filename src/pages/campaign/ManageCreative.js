import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  ColSpan2, lightGray, mainColor, mainColorOpacity20, mainColorOpacity5,
  RowSpan,
  SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {findCreativeGroupList, retrieveCreativeByUserId} from "../../services/campaign/CreativeManageAxios";
import {useAtomValue} from "jotai";
import {tokenResultAtom} from "../login/entity/Common";
import {defaultImage} from "../../constants/GlobalConst";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {light} from "../../assets/theme";

export function ManageCreative() {
  const [open, setOpen] = useState({id: 0})
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetailData = (userId) => {
    retrieveCreativeByUserId(userId).then(response => {
      setCreativeDetailData(response)
      if(open.id === 0){
        setOpen({
          id: userId
        })
      } else if (open.id === userId) {
        setOpen({
          id: 0
        })
      }else {
        setOpen({
          id: userId
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
  const detailTable = (adverName) => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      variableWidth: true,
      adaptiveHeight: true
    };

    return(
      <CustomDetailTable>
        <CustomDetailHeader>
          <CreativeGroup>크리에이티브 그룹명</CreativeGroup>
          <CreativeInfo>크리에이티브 정보</CreativeInfo>
        </CustomDetailHeader>
        {creativeDetailData.length !== 0 && creativeDetailData.map((item,key) => {
          return(
            <CustomDetailRow key={key}>
              <CreativeGroup>
                <Link
                  to={'/board/manageCreativeDetail'}
                  state={{campaignId: item?.campaignId, creativeType: item?.creativeType, productType: item.productType, adverInfo: adverName}}>
                  {item.creativeName}
                </Link>
              </CreativeGroup>
              <CreativeType>{item.creativeType}</CreativeType>
              <CreativeType>{item.productType}</CreativeType>
              <CreativeInfo>
                {item.images.length > 6 &&
                <SliderComponent {...settings} style={{marginLeft: 35,width: 660}}>
                  {item.images.map((info,idx) => {
                    const onErrorImg = (e) => {
                      e.target.src = defaultImage
                    }
                    return(
                      <CreativeImage key={idx}  style={{ width: 100 }}>
                        <img src={info.imagePath} alt={item.productType} onError={onErrorImg}/>
                      </CreativeImage>
                    )
                  })}
                </SliderComponent>
                  ||
                  <div>
                    {item.images.map((info,idx) => {
                      const onErrorImg = (e) => {
                        e.target.src = defaultImage
                      }
                      return(
                        <CreativeImage key={idx}>
                          <img src={info.imagePath} alt={item.productType} onError={onErrorImg}/>
                        </CreativeImage>
                      )
                    })}
                  </div>
                }

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
                <CustomTableRow onClick={() => handleDetailData(item.userId)} style={{color: item.userId === open.id ? light.color.mainColor :null}}>
                  <div>{item.adverName}</div>
                  <div>{item.username}</div>
                  <div>{item.managerName}</div>
                  <div>{item.creativeCount}</div>
                </CustomTableRow>
                {item.userId === open.id && detailTable(item.adverName)}
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
  border-top: 1px solid #e4e3e2;
  border-bottom: 1px solid #e4e3e2;
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
  border-bottom: 1px solid #e4e3e2;
  cursor: pointer;
  & > div{
    padding: 9px;
    width: 100%;
    text-align: center;
  }
`
export const CustomDetailTable = styled.div`
  border-top: 1px solid ${mainColor};
  border-bottom: 1px solid ${mainColor};
`
export const CustomDetailRow = styled.div`
  position: relative;
  display: flex;
`

export const CustomDetailHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${mainColorOpacity5};
  border-bottom: 1px solid ${mainColorOpacity20};
  & > div {
    border-bottom:0
  }
`

export const CreativeGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 0;
  flex-basis: 20%;
  border-bottom: 1px solid ${mainColorOpacity20};
  & a {
    text-decoration: underline;
  }
`
export const CreativeType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 0;
  flex-basis: 10%;
  border-bottom: 1px solid ${mainColorOpacity20};
  border-left: 1px solid ${mainColorOpacity20}
`
export const CreativeInfo = styled.div`
  padding: 9px 0;
  flex-basis: 60%;
  width: 60%;
  border-bottom: 1px solid ${mainColorOpacity20};
`

export const CreativeImage = styled.div`
  display: inline-block;
  margin: 5px;
  padding:5px;
  width: 100px;
  height: 100px;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  vertical-align: middle;
  text-align: center;
  & > img {
    margin-top: 50%;
    transform: translateY(-50%);
    max-width: 100%;
  }
`

const SliderComponent = styled(Slider)`
  .slick-slide {
    margin: 0 5px;
  }
  .slick-prev {
    width: 24px;
    height: 24px;
    background-image: url("/assets/images/common/btn_table_slide_off@3x.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    &::before {
      content: '';
    }
    &:hover {
      background-image: url("/assets/images/common/btn_table_slide_on@3x.png");
      cursor: pointer;
    }
  }
  .slick-next {
    width: 24px;
    height: 24px;
    background-image: url("/assets/images/common/btn_table_slide_off@3x.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transform: rotate(180deg) translate(0, 50%);
    &::before {
      content: '';
    }
    &:hover {
      background-image: url("/assets/images/common/btn_table_slide_on@3x.png");
      cursor: pointer;
    }
  }
`
