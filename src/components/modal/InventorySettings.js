import {useAtom} from "jotai";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../store";
import {ColSpan2, DefaultButton, defaultStyle, RowSpan, Span4} from "../../assets/GlobalStyles";
import {SmallButton} from "../../pages/campaign/styles/common";
import Select from "react-select";
import {Icon} from "../table";
import {mediaInventoryInfo, mediaInventoryInfoAtom} from "../../pages/campaign/entity/Group";
import {selSearchMediaInfo} from "../../services/campaign/GroupAxios";

export function InventoryButton(props) {
  const {title, onSubmit, btnStyle, historyAdd} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 1370,
      modalComponent: () => {
        return (
          <SearchModal onSubmit={onSubmit} historyAdd={historyAdd}/>
        )
      }
    })
  }

  return <SmallButton type={'button'} onClick={handleModalComponent}>{title}</SmallButton>
}

function SearchModal (props) {
  const [, setModal] = useAtom(modalController)
  const [selectedInventory, setSelectedInventory] = useState([])
  const [searchKeyword,setSearchKeyword] =useState('')
  const [mediaInventoryInfo,setMediaInventoryInfo] = useAtom(mediaInventoryInfoAtom)

  const handleSearchKeyword = (event)=>{
    setSearchKeyword(event.target.value)
  }
  const onSearchMediaInventory =() =>{
    if(searchKeyword === ''){
      alert('키워드입력해라')
    }else{
      selSearchMediaInfo(searchKeyword).then(response => {
        if(response){
          console.log(response)
          setMediaInventoryInfo(response)
        }
      })
    }
  }
  const inventory = [
    {inventoryName: '네이트 콘텐츠 배너', code: '1', mediaName: '네이트', userId: 'nate12', category: '언론사', device:'PC',bannerSize:'200*200'},
    {inventoryName: '네이트 콘텐츠 배너', code: '2', mediaName: '네이트', userId: 'nate12', category: '언론사', device:'PC',bannerSize:'200*200'},
    {inventoryName: '네이트 콘텐츠 배너', code: '3', mediaName: '네이트', userId: 'nate12', category: '언론사', device:'PC',bannerSize:'200*200'},
    {inventoryName: '네이트 콘텐츠 배너', code: '4', mediaName: '네이트', userId: 'nate12', category: '언론사', device:'PC',bannerSize:'200*200'},
  ]

  const handleSubmit = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    console.log(selectedInventory)
  }

  const handleClickSelectItem = (selectItem) => {
    if(selectedInventory.length !== 0) {
      if (selectedInventory.find(item => item.inventoryId === selectItem.inventoryId) !== undefined){
        setSelectedInventory([...selectedInventory.filter(item => item.inventoryId !== selectItem.inventoryId)])
      } else {
        setSelectedInventory([...selectedInventory.concat(selectItem)])
      }
    } else {
      setSelectedInventory([...selectedInventory,selectItem])
    }

  }

  return (
    <div>
      <ModalHeader title={"광고 그룹 선택"}/>
      <ModalBody>
        <RowSpan>
          <ColSpan2>
            <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
              <SearchInventoryMain>
                <Span4>지면검색</Span4>
                <SearchInventoryInputGroup>
                  <input type = {'text'}
                         placeholder= {'지면명, 매체명, 지면 코드'}
                         value = {searchKeyword}
                         onChange={handleSearchKeyword}
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
                {mediaInventoryInfo !==null && mediaInventoryInfo.map((item, key) => {
                  return (
                    <InventoryItem key={key} onClick={() => handleClickSelectItem(item)} active={selectedInventory.find(is => is.inventoryId === item.inventoryId) !== undefined ? true : null}>
                      <MediaName>{item.siteName}</MediaName>
                      <InventoryName>{item.inventoryName}</InventoryName>
                      <UserId>{item.username}</UserId>
                      <Category>{item.category}</Category>
                      <Code><a href={item.siteUrl} target={'_blank'}>사이트보기</a></Code>
                      <Device>{item.deviceType}</Device>
                      <BannerSize>{item.bannerSize.replace('IMG','')}</BannerSize>
                    </InventoryItem>
                  )
                })}
              </SearchInventoryItemResult>
            </div>
          </ColSpan2>
          <ColSpan2 style={{alignItems: 'flex-start'}}>
            <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
              <SelectedInventoryMain>
                <div>선택된 지면</div>
                <div>총 <span>{selectedInventory.length}</span>건의 광고 그룹</div>
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
                {selectedInventory.map((item, key) => {
                  console.log(item)
                  return (
                    <SelectedInventoryResultItem key={key} onClick={() => handleClickSelectItem(item)}>
                      <MediaName>{item.siteName}</MediaName>
                      <InventoryName>{item.inventoryName}</InventoryName>
                      <UserId>{item.username}</UserId>
                      <Category>{item.category}</Category>
                      <Code><a href={item.siteUrl} target={'_blank'}>사이트보기</a></Code>
                      <Device>{item.deviceType}</Device>
                      <BannerSize>{item.bannerSize.replace('IMG','')}</BannerSize>
                    </SelectedInventoryResultItem>
                  )
                })}
              </SelectedInventoryResult>
            </div>
          </ColSpan2>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <DefaultButton onClick={handleSubmit}>불러오기</DefaultButton>
      </ModalFooter>
    </div>
  )
}

const SearchInventoryMain = styled.div`
  border: 1px solid #e5e5e5;
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
    border: 1px solid #e5e5e5;
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
  border: 1px solid #e5e5e5;
  height: 350px;
  overflow: auto;
  width: 100%;
`

const InventoryItem = styled.div`
  display: flex;
  border-left: 2px solid ${(props) => props.active ? '#f5811f': '#fff'};
  border-bottom: 1px solid #e5e5e5;
  color: ${(props) => props.active ? '#f5811f': null};
  background-color: ${(props) => props.active ? '#fffaf1': null};;
  &:hover {
    background-color: #fffaf1;
    border-left: 2px solid #ffe3cb;
    border-bottom: 1px solid #ffe3cb;
    cursor: pointer;
    color: #f5811f;
  }
`

const SearchInventoryHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  border: 1px solid #e5e5e5;
  background-color: #f3f3f3;
`


const SelectedInventoryMain = styled.div`
  padding: 15px 20px;
  width: 100%;
  line-height: 30px;
  background-color: #f9fafb;
  border: 1px solid #e5e5e5;
  & > div:last-child {
    & > span {
      color: #f5811f;
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
  border-top: 1px solid #e5e5e5;
  text-align: center;
`
const SelectedInventoryResult = styled.div`
  width: 100%;
  height: 350px;
  overflow: auto;
`

const SelectedInventoryResultItem = styled.div`
  display: flex;
  border-left: ${(props) => props.active ? '2px solid #f5811f': '2px solid #fff'};
  border-bottom: 1px solid #e5e5e5;
  color: ${(props) => props.active ? '#f5811f': null};
  &:hover {
    background-color: #fffaf1;
    border-left: 2px solid #ffe3cb;
    border-bottom: 1px solid #ffe3cb;
    cursor: pointer;
    color: #f5811f;
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
    background-color: #ffff;
    padding: 4px;
    border-radius: 4px;
    font-size: 12px;
    &:hover {
      border: 1px solid #f5811f;
      cursor: pointer;
      color: #f5811f;
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
