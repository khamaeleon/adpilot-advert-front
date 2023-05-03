import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../store";
import {campaignTemporaryListAtom} from "../../pages/campaign/entity/Info";
import {toast} from "react-toastify";
import {DeleteIcon, SmallButton} from "../../pages/campaign/styles/common";

export function TemporaryListModal(props) {
  const {title, onSubmit, btnStyle, historyAdd} = props;
  const [, setModal] = useAtom(modalController)
  useEffect( () => {
    setModal({
      isShow: true,
      width: historyAdd !== undefined ? 700 : 600,
      modalComponent: () => {
        return (
          <TemporaryList onSubmit={onSubmit} historyAdd={historyAdd}/>
        )
      }
    })
  },[])
}

function TemporaryList (props) {
  const [, setModal] = useAtom(modalController)
  const [campaignTemporaryList] = useAtom(campaignTemporaryListAtom)
  const [selectedItem, setSelectedItem] = useState({})

  const handleSelect = (item) => {
    setSelectedItem(item)
  }
  const handleSubmit = () => {
    console.log(selectedItem)
    if(selectedItem.id !== undefined){
      setModal({
        isShow: false,
        modalComponent: null
      })
      props.onSubmit(selectedItem)
    } else {
      toast.warning('임시 저장된 캠페인을 선택해주세요.')
    }
  }
  const handleDeleteTemporaryItem = (item) => {
    console.log(item)
  }
  return (
    <div>
      <ModalHeader title={"임시저장 리스트"}/>
      <ModalBody>
        <MediaSearchResult>
          {campaignTemporaryList !==null && campaignTemporaryList.length !== 0 &&
            <>
              <table>
                <thead>
                <tr>
                  <th colSpan={2}>캠페인명</th>
                </tr>
                </thead>
                <tbody>
                {campaignTemporaryList.map((item, key) => {
                  return (
                    <tr key={key}
                        style={selectedItem.name === item.name ? {
                          backgroundColor: "#f5811f",
                          color: '#fff'
                        } : null}>
                      <td onClick={() => handleSelect(item)}>{item.name}</td>
                      <td><SmallButton type={'button'}  onClick={() => handleDeleteTemporaryItem(item.id)}>삭제</SmallButton></td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </>
          }
          {campaignTemporaryList !==null && campaignTemporaryList.length === 0 &&
            <div>임시저장된 정보가 없습니다.</div>
          }
          {props.historyAdd === undefined && <MediaSelectedButton onClick={handleSubmit}>선택 완료</MediaSelectedButton>}
        </MediaSearchResult>
      </ModalBody>
    </div>
  )
}

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`

const MediaSelectedButton = styled.button`
  display: block;
  margin: 15px auto 0;
  padding: 13px 0;
  width: 200px;
  background-color: #535353;
  color: #fff;
`


const MediaSearchResult = styled.div`
  font-size: 13px;

  & table {
    margin-top: 18px;
    width: 100%;

    & th {
      padding: 12px;
      background-color: #fafafa;
      color: #b2b2b2;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`

const InputGroup = styled.div`
  display: flex;

  & input[type='text'] {
    padding: 0 20px;
    width: 80%;
    border: 1px solid #e5e5e5;
    height: 36px;
    border-radius: 10px 0 0 10px;
  }

  & button {
    width: 20%;
    border-radius: 0 10px 10px 0;
    background-color: #777;
    color: #fff;
  }
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

const AccountButton = styled.button`
  width: 175px; 
  height: 40px;
  border-radius: 5px;
  border: solid 1px #ddd;
  background-color: #f3f3f3;
  font-size: 15px;
  > span {
    padding-left: 10px;
  }
`

const SwitchUserButton = styled.button`
  background-color: #fff;
  padding: 13px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
`
