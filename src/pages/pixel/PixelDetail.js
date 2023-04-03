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
  DefaultButton,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
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

  return (
    <>
      <Board>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <BoardHeader>픽셀 기본 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
              <ColSpan0>
                <ColTitle>최근 수정</ColTitle>
                <div>{pixelInfoListState !== null && dateFormat(pixelInfoListState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
              </ColSpan0>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <ColSpan2>
                <ColTitle>광고주명</ColTitle>
                <div>{pixelInfoListState !== null && pixelInfoListState.adverName}</div>
              </ColSpan2>
              <ColSpan1>
                <ColTitle>아이디</ColTitle>
                <div>{pixelInfoListState !== null && pixelInfoListState.username}</div>
              </ColSpan1>

              <ColSpan1>
                <ColTitle>담당자</ColTitle>
                <div>{pixelInfoListState !== null && pixelInfoListState.managerName}</div>
              </ColSpan1>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <ColSpan3>
                <ColTitle>픽셀 정보</ColTitle>
                <div>{pixelInfoListState !== null && pixelInfoListState.pixelName}</div>
              </ColSpan3>
              <ColSpan2>
                <ColTitle>연동 상태</ColTitle>
                <div>{pixelInfoListState !== null && pixelInfoListState.interlock ? 'ON' : 'OFF'}</div>
              </ColSpan2>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <ColSpan2>
                <ColTitle>연동 URL</ColTitle>
                <div>{pixelInfoListState !== null && pixelInfoListState.linkUrl}</div>
              </ColSpan2>
              <ColSpan2>
                <ColTitle>데이터 수집 상태</ColTitle>
                <div>{pixelInfoListState !== null && statusTypeAll.find(type => type.value === pixelInfoListState.status).label}</div>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle>카테고리설정</ColTitle>
                <ColSpan2>
                  <div>
                    {pixelInfoListState !== null &&
                      <Controller
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
                      <ValidationScript>{errors.mainCategoryCode?.message}</ValidationScript>}</div>
                </ColSpan2>
                <ColSpan2>
                  <div>
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
                </ColSpan2>
              </ColSpan3>
              <ColSpan2>
                <ColTitle>호스팅 설정</ColTitle>
                <div>
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
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardTableContainer>
            <div>
              총 <span>{pixelInfoListState !== null && pixelInfoListState.totalCount}</span>건
            </div>
            {pixelInfoListState !== null &&
              <Table columns={pixelDetailInfoColumns}
                     data={pixelInfoListState}
                     showHoverRows={false}
                     activeCell={[0]}
                     emptyText={'이벤트 단가 관리 내역이 없습니다.'}/>
            }
          </BoardTableContainer>
          <SubmitContainer>
            <CancelButton onClick={() => navigate('/board/pixel')}>목록</CancelButton>
            <DefaultButton>저장</DefaultButton>
          </SubmitContainer>
        </form>
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
