import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import React, {useEffect, useState} from "react";
import {
  BoardSearchResult,
  ColSpan2,
  inputStyle, SearchButton,
  SearchInput,
  Span1,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  ColSpan3,
  ColTitle,
  RowSpan,
  TitleContainer,
  AgentType, BoardSearchResultTitle, SaveExcelButton,
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import {
  columnData,
  mediaAcceptYn,
  mediaSearchResult,
  searchInfo,
  searchMediaTypeAll
} from "../media_manage/entity";
import {adExchangeListAtom, columnAdExChangeData, searchAdExChangeParams} from "./entity";
import Table from "../../components/table";
import {getAdExchangeList} from "../../services/AdExchangeAxios";
import {atom, useAtom} from "jotai";
import SearchBoard from "../../components/common/SearchBoard";

function AdExchange(){
  const [searchMediaTypeAllState, ] = useState(searchMediaTypeAll)
  const [searchAdExChangeParamsState, setSearchAdExChangeParamsState] = useState(searchAdExChangeParams)
  const [adExChangeList, setAdExChangeList] = useAtom(adExchangeListAtom)
  const [mediaAcceptYnAll] = useState(mediaAcceptYn)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [deviceChecked, setDeviceChecked] = useState({
    pc: true,
    mobile: true,
    responsive:true
  })
  const [pTypeChecked, setPTypeChecked] = useState({
    banner: true,
    popUnder: true
  })

  /**
   * 초기 데이터 리스트 페칭
   * @param event
   */
  useEffect(() => {
    async function fetchAndGetList() {
      const data = await getAdExchangeList(searchInfo);
      if(data !== undefined){
        setAdExChangeList(data)
      }
    }
    fetchAndGetList()
  }, []);

  /**
   * 체크박스 전체 체크
   * @param event
   */
  useEffect(() => {
    if (deviceChecked.pc && deviceChecked.mobile && deviceChecked.responsive) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [deviceChecked, isCheckedAll]);

  /**
   * 검색 타입 선택
   * @param event
   */
  const handleSearchMediaType = (searchMediaType) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      selectMediaType:searchMediaType
    })
    //지면리스트 호출
  }
  /**
   * 검색 매체명, 지면명 input
   * @param event
   */
  const handleSearchName = (event) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchName:event.target.value
    })
  }
  /**
   * 디바이스 전체 체크
   * @param event
   */
  const handleDeviceTypeAll = (event) => {
    if (event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        deviceType:['PC','MOBILE', 'RESPONSIVE']
      })
    }else{
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        agentTypes: []
      })
    }
    setIsCheckedAll(event.target.checked)
    setDeviceChecked({
      ...deviceChecked,
      pc: event.target.checked,
      mobile: event.target.checked,
      responsive: event.target.checked
    })
  }

  /**
   * 디바이스 체크
   * @param event
   */
  const handleDeviceType = (event) => {
    if (event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        deviceType: [...searchAdExChangeParamsState.deviceType, event.target.id]
      })
    } else {
      //기존이 전체선택이 아닌경우
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        deviceType: searchAdExChangeParamsState.deviceType.filter((value) => value !== event.target.id)
      })
    }
    //체크박스 핸들링
    if (event.target.id === 'pc') {
      setDeviceChecked({
        ...deviceChecked,
        pc: event.target.checked,
      })
    }
    if (event.target.id === 'mobile') {
      setDeviceChecked({
        ...deviceChecked,
        mobile: event.target.checked,
      })
    }
    if (event.target.id === 'responsive') {
      setDeviceChecked({
        ...deviceChecked,
        responsive: event.target.checked,
      })
    }
    //지면리스트 호출
  }

  /**
   * 광고상품 체크
   * @param event
   */
  const handleMediaAcceptConfig = (mediaAcceptConfig) =>{
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      mediaAcceptConfig: mediaAcceptConfig
    })
  }
  /**
   * 광고상품 체크
   * @param event
   */
  const handlePType = (event) => {
    if (event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        pType: [...searchAdExChangeParamsState.pType, event.target.id]
      })
    } else {
      //기존이 전체선택이 아닌경우
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        pType: searchAdExChangeParamsState.pType.filter((value) => value !== event.target.id)
      })
    }
    //체크박스 핸들링
    if (event.target.id === 'banner') {
      setPTypeChecked({
        ...pTypeChecked,
        banner: event.target.checked,
      })
    }
    if (event.target.id === 'popUnder') {
      setPTypeChecked({
        ...pTypeChecked,
        popUnder: event.target.checked,
      })
    }
    //지면리스트 호출
  }
  /**
   * 검색 데이터 페칭
   * @param event
   */
  const handleSearchAdExchange = async(e) => {
    const data = await getAdExchangeList(e);
    if(data !== undefined){
      setAdExChangeList(data)
    }
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면별 연동사 수신 연동</BoardHeader>
          <BoardSearchDetail>
            <SearchBoard productType deviceType searchKeyword onSearch={handleSearchAdExchange}/>
          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div>
              총 <span>{adExChangeList.length}</span>건의 매체
            </div>
            <div>
              <SaveExcelButton>엑셀 저장</SaveExcelButton>
            </div>
          </BoardSearchResultTitle>
          <BoardSearchResult>
            <Table columns={columnAdExChangeData}
                   data={adExChangeList}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AdExchange