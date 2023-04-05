import {useAtom} from "jotai";
import React from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../store";
import {ColSpan2, DefaultButton, RowSpan, Span3} from "../../assets/GlobalStyles";
import {LoadButton} from "../../pages/campaign/styles/common";

export function CreativeButton(props) {
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

  return <LoadButton type={'button'} onClick={handleModalComponent}>{title}</LoadButton>
}

function SearchModal (props) {
  const [, setModal] = useAtom(modalController)
  const advertiser = [
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'},
    {name: 'mcorporation1', userId: 'mcor123', managerName: '홍길동'}
  ]

  const adGroupList = [
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
    {groupName: '퓨마 특별 기획전_집중 방문 그룹을 왼쪽 정렬로 작성하여 길어지면 짤리겠지', date: '2020-02-02 14:00'},
  ]
  const handleSubmit = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }

  return (
    <div>
      <ModalHeader title={"광고 그룹 선택"}/>
      <ModalBody>
        <RowSpan>
          <ColSpan2>
            <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
              <SearchAdvertiserContainer>
                <Span3>광고주 검색</Span3>
                <InputGroup>
                  <input placeholder={'광고주, 아이디, 담당자 검색'}/>
                  <button>검색</button>
                </InputGroup>
              </SearchAdvertiserContainer>
              <SearchAdvertiserHeader>
                <Name>광고주 명</Name>
                <UserId>아이디</UserId>
                <ManagerName>담당자 명</ManagerName>
              </SearchAdvertiserHeader>
              <SearchAdvertiserResult>
                {advertiser.map((item, key) => {
                  return (
                    <AdvertiserItem key={key}>
                      <Name>{item.name}</Name>
                      <UserId>{item.userId}</UserId>
                      <ManagerName>{item.managerName}</ManagerName>
                    </AdvertiserItem>
                  )
                })}
              </SearchAdvertiserResult>
            </div>
          </ColSpan2>
          <ColSpan2 style={{alignItems: 'flex-start'}}>
            <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
              <AdGroupMain>
                <div>등록된 소재</div>
                <div>총 <span>{adGroupList.length}</span>건의 소재</div>
              </AdGroupMain>
              <AdGroupHeader>
                <GroupName>광고 그룹명</GroupName>
                <CreateDate>생성 일시</CreateDate>
              </AdGroupHeader>
              <AdGroupResult>
                {adGroupList.map((item, key) => {
                  return (
                    <AdGroupResultItem key={key}>
                      <GroupName>{item.groupName}</GroupName>
                      <CreateDate>{item.date}</CreateDate>
                    </AdGroupResultItem>
                  )
                })}
              </AdGroupResult>
            </div>
          </ColSpan2>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <DefaultButton>불러오기</DefaultButton>
      </ModalFooter>
    </div>
  )
}

const SearchAdvertiserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
  background-color: #f9f9f9;
`
const InputGroup = styled.div`
  display: flex;
  width: 100%;
  & input {
    padding: 10px;
    width: 100%;
    height: 45px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-radius: 10px 0 0 10px;
  }
  & button {
    width: 30%;
    border-radius: 0 10px 10px 0;
    height: 45px;
    background-color: #777777;
    color: #fff;
    &:hover {
      background-color: #535353;
    }
  }
`

const SearchAdvertiserResult = styled.div`
  border: 1px solid #e5e5e5;
  height: 350px;
  overflow: auto;
  width: 100%;
`

const AdvertiserItem = styled.div`
  display: flex;
  border-left: 2px solid #fff;
  border-bottom: 1px solid #e5e5e5;
  color: ${(props) => props.active ? '#f5811f': null};
  &:hover {
    background-color: #fffaf1;
    border-left: 2px solid #ffe3cb;
    border-bottom: 1px solid #ffe3cb;
    cursor: pointer;
    color: #f5811f;
  }
`

const SearchAdvertiserHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  border: 1px solid #e5e5e5;
  background-color: #f3f3f3;
`

const Name = styled.div`
  padding: 9px 0;
  width: 50%;
  text-align: center;
`
const UserId = styled.div`
  padding: 9px 0;
  width: 25%;
  text-align: center;
`
const ManagerName = styled.div`
  padding: 9px 0;
  width: 25%;
  text-align: center;
`

const AdGroupMain = styled.div`
  width: 100%;
  padding: 15px 20px;
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

const AdGroupHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: #f3f3f3;
  border-top: 1px solid #e5e5e5;
  text-align: center;
`
const AdGroupResult = styled.div`
  height: 350px;
  overflow: auto;
`

const AdGroupResultItem = styled.div`
  display: flex;
  border-left: 2px solid #fff;
  border-bottom: 1px solid #e5e5e5;
  color: ${(props) => props.active ? '#f5811f': null};
  &:hover {
    background-color: #fffaf1;
    border-left: 2px solid #ffe3cb;
    border-bottom: 1px solid #ffe3cb;
    cursor: pointer;
    color: #f5811f;
  }
`
const GroupName = styled.div`
  width: 65%;
  padding: 9px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const CreateDate = styled.div`
  width: 35%;
  padding: 9px 0;
  text-align: center;
`

const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: #777777;
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #535353;
  }
`

