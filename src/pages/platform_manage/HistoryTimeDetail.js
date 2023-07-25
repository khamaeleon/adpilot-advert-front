import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {findRevisionBudgetTimeDetail} from "../../services/Platform/HistoryAxios";
import {timesInfo} from "../settings/entity/BudgetTime";
import styled from "styled-components";

export const weeksInfo = [
  {week: '월', dayOfWeek: 'MONDAY'},
  {week: '화', dayOfWeek: 'TUESDAY'},
  {week: '수', dayOfWeek: 'WEDNESDAY'},
  {week: '목', dayOfWeek: 'THURSDAY'},
  {week: '금', dayOfWeek: 'FRIDAY'},
  {week: '토', dayOfWeek: 'SATURDAY'},
  {week: '일', dayOfWeek: 'SUNDAY'}
]
function TimeTable (props) {
  const {data, type} = props
  return (
    <>
      <TimeTableComponent>
        {timesInfo.map((data, index) => {
          return <div key={index}>{data.time + data.label}</div>
        })}
      </TimeTableComponent>
      {weeksInfo.map((info, key) => {
        return (
          <TimeTableComponent key={key}>
            {timesInfo.map((time, index) => {
              const allowTime = data.find(item => item.dayOfWeek === info.dayOfWeek)?.allowTimeAreas
              const styles = allowTime !== undefined && allowTime.find(item => item.hour === time.time - 1) !== undefined ? {backgroundColor: '#4b85ff'} : null
              const percent = allowTime !== undefined &&  allowTime.find(item => item.hour === time.time - 1)?.ratio !== undefined ? `${allowTime.find(item => item.hour === time.time - 1)?.ratio}%` : ''
              return (
                <div className={'time'} key={index} style={type !== 'DIRECT_SETTINGS' ? styles : null}>
                  {type !== 'DIRECT_SETTINGS' ? null : `${percent}`}
                  {index === 0 && info.week}
                </div>
              )
            })}
          </TimeTableComponent>
        )
      })}
    </>
  )
}

function ExposerType ({data}) {
  const [value, setValue] = useState('')
  useEffect(() => {
    if(data === 'EQUAL_DISTRIBUTION'){
      setValue('균등 소진')
    } else {
      setValue('빠른 소진')
    }
  }, []);

  return (
    <div>{value}</div>
  )
}

export function HistoryTimeDetail () {
  const {state} = useLocation()
  const [data, setData] = useState()

  useEffect(()=> {
    findRevisionBudgetTimeDetail(state).then(response =>{
      setData(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      {/*캠페인 정보*/}
      <BoardTapTitle>캠페인 정보</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='15%'/>
              <col width='35%'/>
              <col width='15%'/>
              <col width='35%'/>
            </colgroup>
            <tbody>
            <tr>
              <th>광고주 명</th>
              <td>{data?.adverName}</td>
              <th>광고주 아이디</th>
              <td>{data?.username}</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      {/*이력정보*/}
      <BoardTapTitle>이력 정보</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='15%'/>
              <col width='35%'/>
              <col width='15%'/>
              <col width='35%'/>
            </colgroup>
            <tbody>
            <tr>
              <th>변경 일시</th>
              <td>{data?.revisionDateTime}</td>
              <th>변경자 아이지</th>
              <td>{data?.modifiedBy}</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      {/*이벤트 단가 그룹 설정*/}
      <BoardTapTitle>이벤트 단가 그룹 설정</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='15%'/>
              <col width='35%'/>
              <col width='35%'/>
            </colgroup>
            <tbody>
              <tr>
                <th className={'border-r'}>항목명</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              <tr>
                <th className={'border-r border-t'}>시간별 예산 그룹명</th>
                <td className={'border-t'}>{data?.previous !== null ? data?.previous?.groupName : '-'}</td>
                <td className={'border-t'}>{data?.current !== null ? data?.current?.groupName : '-'}</td>
              </tr>
            </tbody>
          </table>
        </BoardTableContainer>
        <BoardTableContainer style={{marginTop: 30}}>
          <table>
            <colgroup>
              <col width='15%'/>
              <col width='70%'/>
            </colgroup>
            <tbody>
              <tr>
                <th className={'border-r'}>이전 내역</th>
                <td>
                  {data?.previous !== null && data?.previous !== undefined &&
                    <>
                      <ExposerType data={data?.previous?.exposureTimeType} />
                      <TimeTable data={data?.previous?.allowTimes} type={data?.previous?.exposureTimeType}/>
                    </>

                  }
                </td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>변경 내역</th>
                <td className={'border-t'}>
                  {data?.current !== null  && data?.current !== undefined &&
                    <>
                      <ExposerType data={data?.current?.exposureTimeType} />
                      <TimeTable data={data?.current?.allowTimes} type={data?.current?.exposureTimeType}/>
                    </>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <SubmitContainer>
        <Link to={'/board/historyTimeManage'}>
          <CancelButton type={'button'}>목록</CancelButton>
        </Link>
      </SubmitContainer>
    </>
  )
}

const TimeTableComponent = styled.div`
  display: flex;
  margin: -1px 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  min-height: 30px;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    border-left: 1px solid #eee;
  }
`
