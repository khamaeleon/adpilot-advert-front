import {
  Board,
  BoardHeader,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColTitle,
  DefaultButton,
  Input,
  RelativeDiv,
  RowSpan, selectStyle,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom, useAtomValue} from "jotai";
import Table from "../../components/table";
import {toast} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {selPixelAdverInfoList, selPixelInfoList, updatePixelInfo} from "../../services/header/ManagePixelAxios";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import {hostList} from "../signup/entity/Common";
import {ValidationScript} from "../signup/styles";
import {
  retrieveSubLevelCategoryKeyValue,
  retrieveTopLevelCategoryKeyValue,
  retrieveUserSubLevelCategoryKeyValue,
  retrieveUserTopLevelCategoryKeyValue
} from "../../services/Platform/CategoryAxios";
import styled from "styled-components";
import {pixelDetailAdverInfoColumns, pixelDetailInfoColumns, pixelInfoListAtom, statusTypeAll} from "./entity/Pixel";
import {tokenResultAtom} from "../login/entity/Common";

function PixelDetail() {
  const [pixelInfoListState, setPixelInfoListState] = useAtom(pixelInfoListAtom)
  const [topLevelCategoryList,setTopLevelCategoryList] = useState([])
  const [rowLevelCategoryList,setRowLevelCategoryList] = useState([])
  const tokenResult = useAtomValue(tokenResultAtom)
  const navigate = useNavigate()
  const {state} = useLocation()
  const {register, handleSubmit, control, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: pixelInfoListState
  })

  const onError = (error) => {
    toast.warning('필수 정보를 입력해주세요')
  }
  useEffect(() => {
    if(tokenResult.role !== 'NORMAL') {
      retrieveTopLevelCategoryKeyValue().then(response => {
        setTopLevelCategoryList(response)
      })
      selPixelInfoList(state.id).then(response => {
        setPixelInfoListState(response)
        retrieveSubLevelCategoryKeyValue(response.mainCategoryCode).then(response => {
          setRowLevelCategoryList(response)
        })
      })
    } else {
      retrieveUserTopLevelCategoryKeyValue().then(response => {
        setTopLevelCategoryList(response)
      })
      selPixelAdverInfoList(state.id).then(response => {
        setPixelInfoListState(response)
        retrieveUserSubLevelCategoryKeyValue(response.mainCategoryCode).then(response => {
          setRowLevelCategoryList(response)
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenResult.role])

  const handleSelectHosting = (selectHostType) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      hostType: selectHostType.value
    })
  }
  const handleSelectTopCategory = (selectTopCategory) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      mainCategoryCode: selectTopCategory.value,
      subCategoryCode:''
    })
    retrieveSubLevelCategoryKeyValue(selectTopCategory.value).then(response => {
      setRowLevelCategoryList(response)
    })
  }

  const handleSelectRowCategory = (selectRowCategory) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      subCategoryCode: selectRowCategory.value
    })
  }
  const handlePixelName = (e) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      pixelName: e.target.value
    })
  }
  const handleLinkUrl = (e) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      linkUrl: e.target.value
    })
  }

  const onSubmit = () => {
    updatePixelInfo(state.id,pixelInfoListState).then(response =>{
      if(response){
        navigate('/board/pixel')
      }else{
        toast.warning("수정이 실패 하였습니다. 관리자한테 문의하세요")
      }
    })
  }
  let textColor = {color: pixelInfoListState !== null ? statusTypeAll?.find(type => type.value === pixelInfoListState.status).color : ''};

  return (
    <>
      <Board>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <BoardHeader>픽셀 기본 정보</BoardHeader>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{pixelInfoListState !== null && dateFormat(pixelInfoListState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
            </ColSpan0>
          </RowSpan>
          <PixelDetailInfoBox>
            <div className={'col'}>
              <div className={'row'}>
                <div className={'w-50'}>
                  <p className={'tit'}>광고주명</p>
                  <div className={'txt'}>{pixelInfoListState !== null && pixelInfoListState.adverName}</div>
                </div>
                <div className={'w-50'}>
                  <p className={'tit'}>아이디</p>
                  <div className={'txt'}>{pixelInfoListState !== null && pixelInfoListState.username}</div>
                </div>
              </div>
              <div className={'row'}>
                <p className={'tit'}>픽셀 정보</p>
                <div className={'txt'}>
                  {tokenResult.role !== 'NORMAL' ?
                    <RelativeDiv>
                      {pixelInfoListState !== null &&
                        <Input
                          style={{height:38,border: errors.pixelName && "1px solid red"}}
                          type={'text'}
                          placeholder={'픽셀명을 입력해주세요'}
                          {...register("pixelName", {
                            required: "픽셀명을 입력해주세요",
                            onChange:(e) => handlePixelName(e)
                          })}
                          value={pixelInfoListState?.pixelName}
                        />}
                    </RelativeDiv>
                    :
                    <RelativeDiv>
                      {pixelInfoListState?.pixelName}
                    </RelativeDiv>
                  }
                </div>
              </div>
              <div className={'row'}>
                <p className={'tit'}>연동 URL</p>
                <div className={'txt'}>
                  {tokenResult.role !== 'NORMAL' ?
                    <RelativeDiv>
                      {pixelInfoListState !== null &&
                        <Input
                          style={{height:38,border: errors.linkUrl && "1px solid red"}}
                          type={'text'}
                          placeholder={'연동URL을 입력해주세요'}
                          {...register("linkUrl", {
                            required: "연동URL을 입력해주세요",
                            onChange:(e) => handleLinkUrl(e),
                            pattern:{
                              value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                              message: "http(s)://가 포함된 url 주소를 확인해주세요."
                            }
                          })}
                          value={pixelInfoListState.linkUrl}
                        />}
                    </RelativeDiv>
                    :
                    <RelativeDiv>
                      {pixelInfoListState?.linkUrl}
                    </RelativeDiv>
                  }
                </div>
              </div>
                {tokenResult.role !== 'NORMAL' ?
                  <div className={'row'}>
                    <p className={'tit'}>카테고리</p>
                    <div className={'txt'} style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{width: '48%'}}>
                        {pixelInfoListState !== null &&
                          <Controller
                            style={{width: '50%'}}
                            name="mainCategoryCode"
                            control={control}
                            rules={{
                              required: {
                                value: pixelInfoListState.mainCategoryCode === "",
                                message: "카테고리를 선택해주세요"
                              }
                            }}
                            render={({field}) => (
                              <Select options={topLevelCategoryList}
                                      placeholder={'카테고리선택 선택'}
                                      {...field}
                                      value={pixelInfoListState.mainCategoryCode !== '' ? topLevelCategoryList?.find(value => value.value === pixelInfoListState.mainCategoryCode) : ''}
                                      onChange={handleSelectTopCategory}
                                      styles={selectStyle}
                                      isSearchable={false}
                              />
                            )}
                          />
                        }
                        {errors.mainCategoryCode &&
                          <ValidationScript>{errors.mainCategoryCode?.message}</ValidationScript>}
                      </div>
                      <div style={{width: '50%'}}>
                        {pixelInfoListState !== null &&
                          <Controller
                            name="subCategoryCode"
                            control={control}
                            rules={{
                              required: {
                                value: pixelInfoListState.subCategoryCode === "",
                                message: "카테고리를 선택해주세요"
                              }
                            }}
                            render={({field}) => (
                              <Select options={rowLevelCategoryList}
                                      placeholder={'서브 카테고리 선택'}
                                      {...field}
                                      value={pixelInfoListState.subCategoryCode !== '' ? rowLevelCategoryList?.find(value => value.value === pixelInfoListState.subCategoryCode) : ''}
                                      onChange={handleSelectRowCategory}
                                      styles={selectStyle}
                                      isSearchable={false}
                              />
                            )}
                          />
                        }
                        {errors.subCategoryCode && <ValidationScript>{errors.subCategoryCode?.message}</ValidationScript>}
                      </div>
                    </div>
                  </div>
                  :
                  <div className={'row'}>
                    <div className={'w-50'}>
                      <p className={'tit'}>카테고리</p>
                      <div className={'txt'}>{topLevelCategoryList?.find(value => value.value === pixelInfoListState?.mainCategoryCode)?.label}</div>
                    </div>
                    <div className={'w-50'}>
                      <p className={'tit'}>하위 카테고리</p>
                      <div className={'txt'}>{rowLevelCategoryList?.find(value => value.value === pixelInfoListState?.subCategoryCode)?.label}</div>
                    </div>
                  </div>
                }
            </div>
            <div className={'col2'}>
              <div className={'row'}>
                <p className={'tit'}>담당자</p>
                <div className={'txt'}>{pixelInfoListState !== null && pixelInfoListState.managerName}</div>
              </div>
              <div className={'row'}>
                <p className={'tit'}>연동 상태</p>
                <div className={'txt'}>
                  <p className={'tit'}  style={textColor}>
                    {pixelInfoListState?.interlockYn === 'Y' ? '연동 중' : '연동 중지'}
                  </p>
                  {/*<SwitchComponent background={pixelInfoListState?.interlock} styles={{cursor: 'default'}}/>*/}
                </div>
              </div>
              <div className={'row'}>
                <p className={'tit'}>데이터 수집 상태</p>
                <div className={'txt'}>
                  <p style={textColor}>
                    {pixelInfoListState !== null && statusTypeAll?.find(type => type.value === pixelInfoListState.status).label}
                  </p>
                </div>
              </div>
              <div className={'row'}>
                <p className={'tit'}>호스팅 설정</p>
                {tokenResult.role !== 'NORMAL' ?
                  <div className={'txt'}>
                    {pixelInfoListState !== null &&
                      <Controller
                        name="hostType"
                        control={control}
                        rules={{
                          required: {
                            value: pixelInfoListState.hostType === "",
                            message: "호스팅을 선택해주세요"
                          }
                        }}
                        render={({field}) => (
                          <Select options={hostList}
                                  placeholder={'호스팅 선택'}
                                  {...field}
                                  value={pixelInfoListState.hostType !== '' ? hostList?.find(value => value.value === pixelInfoListState.hostType) : ''}
                                  onChange={handleSelectHosting}
                                  styles={selectStyle}
                                  isSearchable={false}
                          />
                        )}
                      />
                    }
                    {errors.hostType && <ValidationScript>{errors.hostType?.message}</ValidationScript>}
                  </div>
                  :
                  <div>
                    {hostList?.find(item => item.value === pixelInfoListState?.hostType)?.label}
                  </div>
                }
              </div>
            </div>
          </PixelDetailInfoBox>
          <SubmitContainer>
            <CancelButton onClick={() => navigate('/board/pixel')}>목록</CancelButton>
            {tokenResult.role !== 'NORMAL' &&
              <DefaultButton type={'submit'}>저장</DefaultButton>
            }
          </SubmitContainer>
        </form>
      </Board>
      <Board>
          <BoardHeader>이벤트 현황</BoardHeader>
          <BoardTableContainer>
            {pixelInfoListState !== null &&
              <Table columns={tokenResult.role !== 'NORMAL' ? pixelDetailInfoColumns : pixelDetailAdverInfoColumns}
                     data={pixelInfoListState.events}
                     downloadList={false}
                     emptyText={'이벤트 단가 관리 내역이 없습니다.'}/>
            }
          </BoardTableContainer>
          {/*<SubmitContainer>*/}
          {/*  <CancelButton onClick={() => navigate('/board/pixel')}>목록</CancelButton>*/}
          {/*  <DefaultButton>저장</DefaultButton>*/}
          {/*</SubmitContainer>*/}
      </Board>

    </>
  )
}

export default PixelDetail

const PixelDetailInfoBox = styled.div`
  width: 100%;
  margin: 20px 0 0;
  padding: 20px 30px;
  border: solid 1px #e5e5e5;
  background-color: #f9fafb;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    &.col {
      width: calc((100% / 3) * 2 - 30px);
      border-right: solid 1px #ddd;
      padding-right: 30px;
    }
    &.col2 {
      width: calc(100% / 3);
    }
    .row {
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      &:first-child {margin-top:0}
      .w-50 {
        width: 50%;
        display: flex;
        &:last-child {
          width: calc(50% + 30px);
          border-left: solid 1px #ddd;
          padding-left: 30px;
        }
      }
      .tit {
        width: 140px;
      }
      .txt {
        width: calc(100% - 140px);
        input[type='text'] { margin-right: 0}
      }
    }
  }
  
  
`
