import React, {useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResult, ColSpan1, ColSpan2,
  ColSpan4, Input,
  RelativeDiv,
  RowSpan, selectStyle, Span1, Span2,
  Span4
} from "../../../assets/GlobalStyles";
import {Won} from "../styles";
import Select from "react-select";

export function CampaignTwo() {
  const [range, setRange] = useState(0)
  const handleChangeInputRange = (e) => {
    setRange(e.target.value)
  }
  return(
    <Board>
      <BoardHeader>예산 및 입찰 설정</BoardHeader>
      <BoardSearchResult>
        <RowSpan>
          <Span4>예산설정</Span4>
        </RowSpan>
        <RowSpan box={true} column={true}>
          <ColSpan4>
            <Span4>일일 평균 예산</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Input/>
                <Won/>
              </ColSpan1>
              <ColSpan1>
                <label>
                  <input type={'checkbox'} className={'checkbox-type-a'}/>
                  <i/>
                  <span>일일 예산 무제한</span>
                </label>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>일일 평균 예산</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Span1>PC</Span1>
                <Input/>
                <Won/>
              </ColSpan1>
              <ColSpan1>
                <input
                  type="range"
                  value={range}
                  onChange={handleChangeInputRange}
                  style={{
                    background: `linear-gradient(to right, #f5811f 0%, #f5811f ${range}%, #ddd ${range}%, #ddd 100%)`
                  }}
                />
              </ColSpan1>
              <ColSpan1>
                <Span2>MOBILE</Span2>
                <Input/>
                <Won/>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>시간별 예산 그룹</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Select styles={selectStyle}/>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>이벤트 예산 그룹</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Select styles={selectStyle}/>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <Span4>과금 설정</Span4>
        </RowSpan>
        <RowSpan box={true} column={true}>
          <ColSpan4>
            <Span4>입찰 방식</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Select
                  styles={selectStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={[{key:1,value:'',label:'입찰 방식 선택'}]}
                />
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>최대 입찰가</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Input/>
                <Won/>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>시간별 예산 그룹</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Select
                  styles={selectStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={[{key:1,value:'',label:'입찰 방식 선택'}]}
                />
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>이벤트 예산 그룹</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Select
                  styles={selectStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={[{key:1,value:'',label:'입찰 방식 선택'}]}
                />
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
      </BoardSearchResult>
    </Board>
  )
}