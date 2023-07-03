import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../store";
import {campaignTemporaryListAtom} from "../../pages/campaign/entity/Info";
import {toast} from "react-toastify";
import {SmallButton} from "../../pages/campaign/styles/common";
import {deleteTemporary, selTemporaryList} from "../../services/campaign/InfoAxios";
import {light} from "../../assets/theme";

export function TemporaryListModal(props) {
  const {onSubmit, userId} = props;
  const [, setModal] = useAtom(modalController)
  useEffect( () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => {
        return (
          <TemporaryList onSubmit={onSubmit} userId={userId}/>
        )
      }
    })
  },[])
}

function TemporaryList (props) {
  const [, setModal] = useAtom(modalController)
  const [campaignTemporaryList, setCampaignTemporaryList] = useAtom(campaignTemporaryListAtom)
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
    deleteTemporary(item).then( response => {
      response ? selTemporaryList(props.userId).then(response =>{
        if(response !== null) {
          setCampaignTemporaryList(response)
        }
      }) : toast.error('삭제가 실패하였습니다.')
    })
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
                          backgroundColor: light.color.mainColor,
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
            <div style={{textAlign: 'center', margin: '10px 0'}}>임시저장된 정보가 없습니다.</div>
          }
          {campaignTemporaryList.length !== 0 && <MediaSelectedButton onClick={handleSubmit}>선택 완료</MediaSelectedButton>}
        </MediaSearchResult>
      </ModalBody>
    </div>
  )
}

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
