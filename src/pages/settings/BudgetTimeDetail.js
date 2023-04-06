import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  CancelButton,
  ColSpan2,
  ColSpan4,
  ColTitle,
  DefaultButton,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useState} from "react";
import {useAtom} from "jotai";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useNavigate} from "react-router-dom";
import {timeBudgetDetailDataAtom} from "./entity/BudgetTime";
import DragToSelect from "../../components/common/DragToSelect";
import styled from "styled-components";
import InsertToSelect from "../../components/common/InsertToSelect";

function BudgetTimeDetail() {
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const [timeSetting, setTimeSetting] = useState('equal')
  const navigate = useNavigate()
  const [reset, setReset] = useState(false)

  const handleRadioSelect = (e) => {
    setTimeSetting(e.target.value)
    console.log(e.target.value)
    setReset(!reset)
  }

  return (
    <>
      <Board>
        <BoardHeader>시간별 예산 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{justifyContent: 'space-between'}}>
            <ColSpan2><strong>시간별 예산 기본 정보</strong></ColSpan2>
            <div>
              <ColTitle>
                <span>최근 수정 : </span>
                <span>{dateFormat(timeBudgetDetailDataState !==null && timeBudgetDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</span>
              </ColTitle>
            </div>
          </RowSpan>
          <RowSpan box={true}>
            <ColSpan4>
              <Span4>시간별 예산 그룹명</Span4>
              <Input readOnly value={'퇴근 시간 집중 예산 세팅'}/>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <Span4><strong>예산 소진 설정</strong></Span4>
          </RowSpan>
          <RowSpan>
            <RelativeDiv>
              <label>
                <input
                  type={'radio'}
                  name={'exhaust'}
                  value={'equal'}
                  onChange={handleRadioSelect}
                />
                <span>균등 소진</span>
              </label>
              <label>
                <input
                  type={'radio'}
                  name={'exhaust'}
                  value={'fast'}
                  onChange={handleRadioSelect}
                />
                <span>빠른 소진</span>
              </label>
              <label>
                <input
                  type={'radio'}
                  name={'exhaust'}
                  value={'direct'}
                  onChange={handleRadioSelect}
                />
                <span>직접 설정</span>
              </label>
            </RelativeDiv>
          </RowSpan>
        </BoardSearchDetail>
        {['equal','fast'].includes(timeSetting) &&
        <BoardSearchResult>
          <RowSpan>
            <div><strong>광고 노출 요일 및 시간 설정</strong></div>
          </RowSpan>
          <RowSpan>
            <RelativeDiv box={true} column={true}>
              <ColSpan4 style={{color: '#ccc',marginBottom: 10, justifyContent:'space-between'}}>
                <div>Drag & Drop으로 원하는 요일 및 시간을 설정하세요.</div>
                <div style={{width: 'auto'}}>
                  <SelectShape active={true}><span>노출</span></SelectShape>
                    <SelectShape><span>미노출</span></SelectShape>
                </div>
              </ColSpan4>
              <DragToSelect userId={'id'} reset={reset}/>
            </RelativeDiv>
          </RowSpan>
        </BoardSearchResult>
        }
        {timeSetting === 'direct' &&
        <BoardSearchResult>
          <RowSpan>
            <div><strong>요일 및 시간별 예산 설정</strong></div>
          </RowSpan>
          <RowSpan>
            <RelativeDiv box={true} column={true}>
              <ColSpan4 style={{color: '#ccc',marginBottom: 10, justifyContent:'space-between'}}>
                <div>요일 및 시간별 예산을 % 단위로 설정해주세요</div>
              </ColSpan4>
              <InsertToSelect userId={'id'}/>
            </RelativeDiv>
          </RowSpan>
        </BoardSearchResult>
        }
        <SubmitContainer>
          <CancelButton onClick={()=>navigate('/board/budgetTime')}>목록</CancelButton>
          <DefaultButton>저장</DefaultButton>
        </SubmitContainer>
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
export default BudgetTimeDetail

const SelectShape = styled.div`
  padding: 2px 10px;
  background-color: ${(props) => props.active ? '#4b85ff':'#fff'};
  color: ${(props) => props.active ? '#fff':'#222'};
  border: 1px solid ${(props) => props.active ? '#4b85ff':'#e5e5e5'};
  border-radius: 3px;
  font-size: 12px;
`
