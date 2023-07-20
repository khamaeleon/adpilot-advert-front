import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "./Modal";
import styled from "styled-components";
import {modalController} from "../../store";
import {
  borderColor,
  ColSpan2,
  DefaultButton,
  mainColor, mainColorOpacity20, mainColorOpacity5,
  RowSpan,
  Span4
} from "../../assets/GlobalStyles";
import {SmallButton} from "../../pages/campaign/styles/common";
import {
  allowInventoryIdsAtom,
  campaignGroupInfoAtom,
  disAllowInventoryIdsAtom,
  mediaInventoryInfoAtom
} from "../../pages/campaign/entity/Group";
import {selSearchMediaInfo, selSearchMediaList} from "../../services/campaign/GroupAxios";
import {toast} from "react-toastify";
import {deviceType} from "../../pages/dash_board/entity/Common";

export function InventoryButton(props) {
  const {title, buttonText, type} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 1370,
      modalComponent: () => {
        return (
          <SearchModal type={type} title={title} />
        )
      }
    })
  }

  return <SmallButton type={'button'} onClick={handleModalComponent}>{buttonText}</SmallButton>
}

function SearchModal (props) {
  const {type, title} =props
  const [, setModal] = useAtom(modalController)
  const [allowInventoryIds, setAllowInventoryIds] = useAtom(allowInventoryIdsAtom)
  const [disAllowInventoryIds, setDisAllowInventoryIds] = useAtom(disAllowInventoryIdsAtom)
  const [searchKeyword,setSearchKeyword] =useState('')
  const [mediaInventoryInfo,setMediaInventoryInfo] = useState(null)
  const [campaignGroupInfo, setCampaignGroupInfo] = useAtom(campaignGroupInfoAtom)

  useEffect(()=>{
    let param = {inventoryIds: type==='allow' ? campaignGroupInfo.allowInventoryIds : campaignGroupInfo.disAllowInventoryIds};
    selSearchMediaList(param).then(response => {
      setAllowInventoryIds(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[campaignGroupInfo])

  const handleSearchKeyword = (event)=>{
    setSearchKeyword(event.target.value)
  }
  const onSearchMediaInventory =() =>{
    if(searchKeyword === ''){
      toast.warning('키워드를 입력해주세요.')
    }else{
      selSearchMediaInfo(searchKeyword).then(response => {
        if(response){
          setMediaInventoryInfo(response)
        }
      })
    }
  }

  const handleSubmit = (e) => {
     e.preventDefault();
     setModal({
        isShow: false,
        modalComponent: null
      })
  }

  const handleClickSelectItem = (selectItem) => {
    if(type==='allow'){
      if(allowInventoryIds === null){
        setAllowInventoryIds([selectItem])
        setCampaignGroupInfo({
          ...campaignGroupInfo,
          allowInventoryIds:[selectItem.inventoryId]
        })
      } else {
        if(allowInventoryIds.length !== 0) {
          if (allowInventoryIds.find(item => item.inventoryId === selectItem.inventoryId) !== undefined){
            setAllowInventoryIds([...allowInventoryIds.filter(item => item.inventoryId !== selectItem.inventoryId)])
            setCampaignGroupInfo({
              ...campaignGroupInfo,
              allowInventoryIds:[...campaignGroupInfo.allowInventoryIds.filter(value => value !== selectItem.inventoryId)]
            })
          } else {
            setAllowInventoryIds([...allowInventoryIds.concat(selectItem)])
            setCampaignGroupInfo({
              ...campaignGroupInfo,
              allowInventoryIds:[...campaignGroupInfo.allowInventoryIds.concat(selectItem.inventoryId)]
            })
          }
        } else {
          setAllowInventoryIds([...allowInventoryIds,selectItem])
          setCampaignGroupInfo({
            ...campaignGroupInfo,
            allowInventoryIds:[...campaignGroupInfo.allowInventoryIds,selectItem.inventoryId]
          })
        }
      }

    }else{
      if(disAllowInventoryIds === null) {
        setDisAllowInventoryIds([selectItem])
        setCampaignGroupInfo({
          ...campaignGroupInfo,
          disAllowInventoryIds:[selectItem.inventoryId]
        })
      } else {
        if(disAllowInventoryIds.length !== 0) {
          if (disAllowInventoryIds.find(item => item.inventoryId === selectItem.inventoryId) !== undefined){
            setDisAllowInventoryIds([...disAllowInventoryIds.filter(item => item.inventoryId !== selectItem.inventoryId)])
            setCampaignGroupInfo({
              ...campaignGroupInfo,
              disAllowInventoryIds:[...campaignGroupInfo.disAllowInventoryIds.filter(value => value !== selectItem.inventoryId)]
            })
          } else {
            setDisAllowInventoryIds([...disAllowInventoryIds.concat(selectItem)])
            setCampaignGroupInfo({
              ...campaignGroupInfo,
              disAllowInventoryIds:[...campaignGroupInfo.disAllowInventoryIds.concat(selectItem.inventoryId)]
            })
          }
        } else {
          setDisAllowInventoryIds([...disAllowInventoryIds,selectItem])
          setCampaignGroupInfo({
            ...campaignGroupInfo,
            disAllowInventoryIds:[...campaignGroupInfo.disAllowInventoryIds,selectItem.inventoryId]
          })
        }
      }

    }
  }

  return (
    <div>
      <ModalHeader title={title}/>
      <ModalBody>
        <RowSpan>
          <ColSpan2>
            <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
              <SearchInventoryMain>
                <Span4>지면 검색</Span4>
                <SearchInventoryInputGroup>
                  <input type = {'text'}
                         placeholder= {'매체명, 지면명, 아이디, 지면 코드를 입력해주세요.'}
                         value = {searchKeyword}
                         onChange={handleSearchKeyword}
                         onKeyDown={e => (e.code === 'Enter') && onSearchMediaInventory() }
                  />
                  <button type={'button'} onClick={onSearchMediaInventory}>검색</button>
                </SearchInventoryInputGroup>
              </SearchInventoryMain>
              <SearchInventoryHeader>
                <MediaName>매체명</MediaName>
                <InventoryName>지면명</InventoryName>
                <UserId>아이디</UserId>
                <Category>카테고리</Category>
                <Code>사이트보기</Code>
                <Device>디바이스</Device>
                <BannerSize>지면 사이즈</BannerSize>
              </SearchInventoryHeader>
              <SearchInventoryItemResult>
                {mediaInventoryInfo !== null && mediaInventoryInfo.map((item, key) => {
                  return (
                    <InventoryItem key={key} onClick={() => handleClickSelectItem(item)} active={type ==='allow' ? allowInventoryIds !== null && allowInventoryIds.find(is => is.inventoryId === item.inventoryId) !== undefined ? true : null : disAllowInventoryIds !== null && disAllowInventoryIds.find(is => is.inventoryId === item.inventoryId) !== undefined ? true : null}>
                      <MediaName>{item.siteName}</MediaName>
                      <InventoryName>{item.inventoryName}</InventoryName>
                      <UserId>{item.username}</UserId>
                      <Category>{item.category1}</Category>
                      <Code><a href={item.siteUrl} target={'_blank'} rel="noreferrer">사이트보기</a></Code>
                      <Device>{deviceType.filter(d=> d.value === item.deviceType)[0].label}</Device>
                      <BannerSize>{item.bannerSize?.replace('IMG','')}</BannerSize>
                    </InventoryItem>
                  )
                })}
                { (mediaInventoryInfo === null || mediaInventoryInfo.length === 0) &&
                  <Centered>데이터가 없습니다. 지면을 검색해주세요.</Centered>
                }
              </SearchInventoryItemResult>
            </div>
          </ColSpan2>
          <ColSpan2 style={{alignItems: 'flex-start'}}>
            <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
              <SelectedInventoryMain>
                <div>선택된 지면</div>
                <div>총 <span>{type ==='allow' ? allowInventoryIds!==null && allowInventoryIds.length : disAllowInventoryIds !==null && disAllowInventoryIds.length}</span>건의 광고 그룹</div>
              </SelectedInventoryMain>
              <SelectedInventoryHeader>
                <MediaName>매체명</MediaName>
                <InventoryName>지면명</InventoryName>
                <UserId>아이디</UserId>
                <Category>카테고리</Category>
                <Code>사이트보기</Code>
                <Device>디바이스</Device>
                <BannerSize>지면 사이즈</BannerSize>
              </SelectedInventoryHeader>
              <SelectedInventoryResult>
                {type ==='allow' && allowInventoryIds !== null && allowInventoryIds.map((item, key) => {
                  return (
                    <SelectedInventoryResultItem key={key} onClick={() => handleClickSelectItem(item)}>
                      <MediaName>{item.siteName}</MediaName>
                      <InventoryName>{item.inventoryName}</InventoryName>
                      <UserId>{item.username}</UserId>
                      <Category>{item.category1}</Category>
                      <Code><a href={item.siteUrl} target={'_blank'} rel="noreferrer">사이트보기</a></Code>
                      <Device>{deviceType.filter(d=> d.value === item.deviceType)[0].label}</Device>
                      <BannerSize>{item.bannerSize?.replace('IMG','')}</BannerSize>
                    </SelectedInventoryResultItem>
                  )
                })}
                {type !=='allow' && disAllowInventoryIds !== null && disAllowInventoryIds.map((item, key) => {
                  return (
                    <SelectedInventoryResultItem key={key} onClick={() => handleClickSelectItem(item)}>
                      <MediaName>{item.siteName}</MediaName>
                      <InventoryName>{item.inventoryName}</InventoryName>
                      <UserId>{item.username}</UserId>
                      <Category>{item.category1}</Category>
                      <Code><a href={item.siteUrl} target={'_blank'} rel="noreferrer">사이트보기</a></Code>
                      <Device>{deviceType.filter(d=> d.value === item.deviceType)[0].label}</Device>
                      <BannerSize>{item.bannerSize?.replace('IMG','')}</BannerSize>
                    </SelectedInventoryResultItem>
                  )
                })}
              </SelectedInventoryResult>
            </div>
          </ColSpan2>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <DefaultButton onClick={handleSubmit}>저장</DefaultButton>
      </ModalFooter>
    </div>
  )
}

const SearchInventoryMain = styled.div`
  border: 1px solid ${borderColor};
  padding: 20px 15px;
  width: 100%;
`

const SearchInventoryInputGroup = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 0;
  & input[type='text'] {
    padding: 10px;
    width: 100%;
    border: 1px solid ${borderColor};
    border-radius: 5px;
  }
  & button {
    width: 100px;
    background-color: #777777;
    height: 40px;
    color: #fff;
    &:hover {
      background-color: #535353;
    }
  }
`

const SearchInventoryItemResult = styled.div`
  position: relative;
  border: 1px solid ${borderColor};
  height: 350px;
  overflow: auto;
  width: 100%;
  font-size: 12px;
`
const InventoryItem = styled.div`
  display: flex;
  border-left: 2px solid ${(props) => props.active ? mainColor: '#fff'};
  border-bottom: 1px solid ${borderColor};
  color: ${(props) => props.active ? mainColor: null};
  background-color: ${(props) => props.active ? mainColorOpacity5: null};;
  &:hover {
    background-color: ${mainColorOpacity20};
    border-left: 2px solid ${mainColorOpacity20};
    border-bottom: 1px solid ${mainColorOpacity20};
    cursor: pointer;
    color: ${mainColor};
  }
`

const SearchInventoryHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  border: 1px solid ${borderColor};
  background-color: #f3f3f3;
  font-size: 12px;
`


const SelectedInventoryMain = styled.div`
  padding: 15px 20px;
  width: 100%;
  line-height: 30px;
  background-color: #f9fafb;
  border: 1px solid ${borderColor};
  & > div:last-child {
    & > span {
      color: ${mainColor};
    }
    &:before{
      content:'';
      display: inline-block;
      margin-right: 5px;
      width: 2px;
      height: 12px;
      background-color: #000;
    }
  }
`

const SelectedInventoryHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: #f3f3f3;
  border-top: 1px solid ${borderColor};
  text-align: center;
  font-size: 12px;
`
const SelectedInventoryResult = styled.div`
  width: 100%;
  height: 350px;
  overflow: auto;
  font-size: 12px;
`

const SelectedInventoryResultItem = styled.div`
  display: flex;
  border-bottom: 1px solid ${borderColor};
  &:hover {
    background-color: ${mainColorOpacity5};
    border-left: 2px solid ${mainColorOpacity20};
    border-bottom: 1px solid ${mainColorOpacity20};
    cursor: pointer;
    color: ${mainColor};
  }
  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const InventoryName = styled.div`
  padding: 9px 0;
  text-align: center;
  width:25%;
`
const Code = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width:15%;
  & a {
    display: inline-block;
    border: 1px solid #777777;
    background-color: #fff;
    padding: 4px;
    border-radius: 4px;
    font-size: 12px;
    &:hover {
      border: 1px solid ${mainColor};
      cursor: pointer;
      color: ${mainColor};
    }
  }
`
const MediaName = styled.div`
  padding: 9px 0;
  text-align: center;
  width:15%;
`
const UserId = styled.div`
  padding: 9px 0;
  text-align: center;
  width:10%;
`
const Category = styled.div`
  padding: 9px 0;
  text-align: center;
  width:20%;
`
const Device = styled.div`
  padding: 9px 0;
  text-align: center;
  width:10%;
`
const BannerSize = styled.div`
  padding: 9px 0;
  text-align: center;
  width:15%;
`
const Centered = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`