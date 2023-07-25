import {
  Board, BoardHeader,
  BoardTableContainer, CancelButton, ColSpan1,
  ColSpan3, ColSpan4,
  Input, RelativeDiv, RowSpan, Span4, SubmitButton, SubmitContainer, TextArea,
} from "../../assets/GlobalStyles";
import { Small } from "../../components/table/styles";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {
  updateNoticePublishAdmin
} from "../../services/notice/NoticeAdminAxios";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../login/entity/Common";
import {useLocation, useNavigate} from "react-router-dom";

export default function NoticeDetail(props) {

  const [tokenUserInfo] = useAtom(tokenResultAtom)

  const { state } = useLocation();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const [publishYn, setPublishYn] = useState(state.data?.publishYn);

  const handleRadio = (boolean) => {
    setPublishYn(boolean);
  }

  const onError = () => {}
  const onSubmit = () => {
    updateNoticePublishAdmin(state.data?.id, publishYn)
    .then(()=>
        navigate("/board/notice", {replace: true})
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>
            <ColSpan3>
              <p>공지사항</p>
            </ColSpan3>
            {
              tokenUserInfo.role !== 'NORMAL' &&
                <ColSpan1>
                  <RelativeDiv style={{justifyContent: 'flex-end'}}>
                    <label>
                      <input
                          type={'radio'}
                          name={'notice'}
                          id={'publishY'}
                          onChange={() => handleRadio('Y')}
                          checked={publishYn === 'Y'}
                      />
                      <span>공개</span>
                    </label>
                    <label>
                      <input
                          type={'radio'}
                          name={'notice'}
                          id={'publishN'}
                          onChange={() => handleRadio('N')}
                          checked={publishYn === 'N'}
                      />
                      <span>비공개</span>
                    </label>
                  </RelativeDiv>
                </ColSpan1>
            }
          </BoardHeader>
          <BoardTableContainer>
            <RowSpan validation>
              <ColSpan4>
                <Span4>제목</Span4>
                <RelativeDiv>
                  <Input type={'text'}
                         style={{backgroundColor: 'transparent', borderWidth: 0, padding: '10px', fontWeight: 'bold'}}
                         value={state.data?.title}
                         readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            {/*<RowSpan validation>*/}
            {/*  <RelativeDiv>*/}
            {/*    <Span4>작성자</Span4>*/}
            {/*    <span>{state.data?.createdBy}</span>*/}
            {/*  </RelativeDiv>*/}
            {/*  <RelativeDiv>*/}
            {/*    <Span4>작성일</Span4>*/}
            {/*    <span>{state.data?.createdAt}</span>*/}
            {/*  </RelativeDiv>*/}
            {/*</RowSpan>*/}
            <RowSpan validation>
              <ColSpan4 style={{alignItems: 'start'}}>
                <Span4 style={{paddingTop: '10px'}}>내용</Span4>
                <RelativeDiv>
                  <TextArea rows={25}
                            style={{backgroundColor: 'transparent', borderWidth: 0}}
                            value={state.data?.content}
                            readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan>

            </RowSpan>
          </BoardTableContainer>
        </Board>
        {tokenUserInfo.role !== "NORMAL" &&
          <Small>* 수정 버튼은 공개 / 비공개 여부 수정</Small>
        }
        <SubmitContainer>
          <CancelButton type={"button"} onClick={()=> navigate('/board/notice')}>목록</CancelButton>
          {tokenUserInfo.role !== "NORMAL" &&
            <SubmitButton type={"submit"} title="공개 / 비공개 여부 수정">{'수정'}</SubmitButton>
          }
        </SubmitContainer>
      </form>
  )
}