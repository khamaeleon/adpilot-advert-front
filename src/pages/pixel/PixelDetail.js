import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  DefaultButton, Input, RelativeDiv,
  RowSpan, Span4,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table, {SwitchComponent} from "../../components/table";
import {pixelDetailInfoColumns, pixelInfoListAtom, statusTypeAll} from "./entity";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {modalController} from "../../store";
import {selPixelInfoList} from "../../services/header/ManagePixelAxios";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import {hostList} from "../signup/entity";
import {ValidationScript} from "../signup/styles";
import {
  retrieveSubLevelCategoryKeyValue,
  retrieveTopLevelCategoryKeyValue
} from "../../services/Platform/CategoryAxios";
import styled from "styled-components";

function PixelDetail() {
  const [pixelInfoListState, setPixelInfoListState] = useAtom(pixelInfoListAtom)
  const [topLevelCategoryList,setTopLevelCategoryList] = useState([])
  const [rowLevelCategoryList,setRowLevelCategoryList] = useState([])
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [saveType, setSaveType] = useState('create')
  const {state} = useLocation()
  const {register, handleSubmit, reset, control, watch, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: pixelInfoListState
  })
  const onError = (error) => console.log(error)
  useEffect(() => {
    let mainCategory =[]
    retrieveTopLevelCategoryKeyValue().then(response => {
      setTopLevelCategoryList(response)
    })
    selPixelInfoList(state.id).then(response => {
      console.log(response)
      setPixelInfoListState(response)
      retrieveSubLevelCategoryKeyValue(response.mainCategoryCode).then(response => {
        console.log(response)
        setRowLevelCategoryList(response)
      })
    })
  }, [])

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
      console.log(response)
      setRowLevelCategoryList(response)
    })
  }

  const handleSelectRowCategory = (selectRowCategory) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      subCategoryCode: selectRowCategory
    })
  }

  const onSubmit = (data) => {
    console.log(data)
  }
  let textColor = {color: pixelInfoListState !== null ? statusTypeAll.find(type => type.value === pixelInfoListState.status).color : ''};
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
            <div>
              <div className={'col'}>
                <div className={'row'}>
                  <p className={'tit'}>광고주명</p>
                  <div className={'txt'}>{pixelInfoListState !== null && pixelInfoListState.adverName}</div>
                </div>
                <div className={'row'}>
                  <p className={'tit'}>픽셀 정보</p>
                  <div className={'txt'}>
                    <RelativeDiv>
                      {pixelInfoListState !== null &&
                        <Input
                          type={'text'}
                          placeholder={'픽셀명을 입력해주세요'}
                          {...register("pixelName", {
                            required: "픽셀명을 입력해주세요",
                            //onChange:(e) => handlePixelName(e)
                          })}
                          value={pixelInfoListState?.pixelName}
                        />}
                      {errors.pixelName && <ValidationScript>{errors.pixelName?.message}</ValidationScript>}
                    </RelativeDiv>
                  </div>
                </div>
              </div>
              <div className={'col'}>
                <div className={'row'}>
                  <p className={'tit'}>아이디</p>
                  <div className={'txt'}>{pixelInfoListState !== null && pixelInfoListState.username}</div>
                </div>
                <div className={'row'}>
                  <p className={'tit'}>연동 상태</p>
                  <div className={'txt'}>
                    <SwitchComponent background={pixelInfoListState?.interlock} styles={{cursor: 'default'}} eventClick={()=> console.log('연동상태')}/>
                  </div>
                </div>
              </div>
              <div className={'col'}>
                <div className={'row'}>
                  <p className={'tit'}>담당자</p>
                  <div className={'txt'}>{pixelInfoListState !== null && pixelInfoListState.managerName}</div>
                </div>
                <div className={'row'}>
                  <p className={'tit'}>데이터 수집 상태</p>
                  <div className={'txt'}>
                    <p style={textColor}>
                      {pixelInfoListState !== null && statusTypeAll.find(type => type.value === pixelInfoListState.status).label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={'col2'}>
                <div className={'row'}>
                  <p className={'tit'}>연동 URL</p>
                  <div className={'txt'}>
                    <RelativeDiv>
                      {pixelInfoListState !== null &&
                        <Input
                          type={'text'}
                          placeholder={'그룹명을 입력해주세요'}
                          {...register("linkUrl", {
                            required: "그룹명을 입력해주세요",
                            //onChange:(e) => handleLinkUrl(e)
                          })}
                          value={pixelInfoListState.linkUrl}
                        />}
                      {errors.linkUrl && <ValidationScript>{errors.linkUrl?.message}</ValidationScript>}
                    </RelativeDiv>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={'col2'}>
                <div className={'row'}>
                  <p className={'tit'}>카테고리 설정</p>
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
                                    value={pixelInfoListState.mainCategoryCode !== '' ? topLevelCategoryList.find(value => value.value === pixelInfoListState.mainCategoryCode) : ''}
                                    onChange={handleSelectTopCategory}
                                    styles={{
                                      input: (baseStyles, state) => (
                                        {
                                          ...baseStyles,
                                          minWidth: "300px",
                                        })
                                    }}
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
                                    value={pixelInfoListState.subCategoryCode !== '' ? rowLevelCategoryList.find(value => value.value === pixelInfoListState.subCategoryCode) : ''}
                                    onChange={handleSelectRowCategory}
                                    styles={{
                                      input: (baseStyles, state) => (
                                        {
                                          ...baseStyles,
                                          minWidth: "300px",
                                        })
                                    }}
                            />
                          )}
                        />
                      }
                      {errors.subCategoryCode && <ValidationScript>{errors.subCategoryCode?.message}</ValidationScript>}
                    </div>
                  </div>
                </div>
              </div>
              <div className={'col'}>
                <div className={'row'} style={{marginTop: 15}}>
                  <p className={'tit'}>호스팅 설정</p>
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
                                  value={pixelInfoListState.hostType !== '' ? hostList.find(value => value.value === pixelInfoListState.hostType) : ''}
                                  onChange={handleSelectHosting}
                                  styles={{
                                    input: (baseStyles, state) => (
                                      {
                                        ...baseStyles,
                                        minWidth: "300px",
                                      })
                                  }}
                          />
                        )}
                      />
                    }
                    {errors.hostType && <ValidationScript>{errors.hostType?.message}</ValidationScript>}</div>
                </div>
              </div>
            </div>
          </PixelDetailInfoBox>
          <SubmitContainer>
            <CancelButton onClick={() => navigate('/board/pixel')}>목록</CancelButton>
            <DefaultButton>저장</DefaultButton>
          </SubmitContainer>
        </form>
      </Board>
      <Board>
          <BoardTableContainer>
            <div>
              총 <span>{pixelInfoListState !== null && pixelInfoListState.totalCount}</span>건
            </div>
            {pixelInfoListState !== null &&
              <Table columns={pixelDetailInfoColumns}
                     data={pixelInfoListState.events}
                     showHoverRows={false}
                     activeCell={[0]}
                     emptyText={'이벤트 단가 관리 내역이 없습니다.'}/>
            }
          </BoardTableContainer>
          {/*<SubmitContainer>*/}
          {/*  <CancelButton onClick={() => navigate('/board/pixel')}>목록</CancelButton>*/}
          {/*  <DefaultButton>저장</DefaultButton>*/}
          {/*</SubmitContainer>*/}
      </Board>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
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
  flex-direction: column;
  > div {
    display: flex;
  }
  .col {
    width: calc(100% / 3);
    border-right: solid 1px #ddd;
    &:last-child {border-right:0}
    &:first-child .row {justify-content:normal}
    .row {
      margin-top: 18px;
      justify-content: center;
      &:first-child {margin-top: 0;}
    }
  }
  .col2 {
    width: calc((100% / 3) * 2);
    border-right: solid 1px #ddd;
    padding-top: 18px;
    .row {
      margin-top: 0;
    }
  }
  .row {
    width: 100%;
    display: flex;
    align-items: center;
    .tit {
      width: 140px;
    }
    .txt {
      width: calc(100% - 190px);
      input { height: 38px; }
    }
  }
`
