import {
  Board,
  BoardHeader,
  BoardTableContainer,
  CancelButton,
  ColSpan3,
  ColSpan4,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  TextArea,
  ValidationScript
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {tokenResultAtom} from "../login/entity/Common";
import {
   selInquiryById,
} from "../../services/notice/InquiryAxios";
import {useAtom} from "jotai/index";
import {
  selInquiryByIdAdmin,
  updateInquiryReply
} from "../../services/notice/InquiryAdminAxios";
import {Controller, useForm} from "react-hook-form";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function InquiryDetail() {
  const [tokenUserInfo] = useAtom(tokenResultAtom);

  const { state } = useLocation();
  const {control, handleSubmit, clearErrors, formState: {errors}} = useForm()
  const navigate = useNavigate();
  const [reply, setReply] = useState({title:'', content:''});
  const callbackFunc = (response) => {
    if(response?.replies.length != 0) {
      setReply(response?.replies[0]);
    }
  }

  useEffect(()=>{
    if(tokenUserInfo.role !== 'NORMAL'){
      selInquiryByIdAdmin(state.data.id).then(callbackFunc)
    } else {
      selInquiryById(state.data.id).then(callbackFunc)
    }
  },[])

  const onError = () => {}
  const onSubmit = () => {

    updateInquiryReply(state.data.id, reply).then(()=>
        navigate('/board/inquiry')
    )
  }

  return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>
            <ColSpan3>
              <p>1:1문의</p>
            </ColSpan3>
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
            <RowSpan validation>
              <ColSpan4>
                <Span4>작성자</Span4>
                <RelativeDiv>
                  <span style={{paddingLeft: '20px'}}>{state.data?.createdBy}</span>
                </RelativeDiv>
              </ColSpan4>
              <ColSpan4>
                <Span4>작성일</Span4>
                <RelativeDiv>
                  <span style={{paddingLeft: '20px'}}>{state.data?.createdAt}</span>
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan validation>
              <ColSpan4 style={{alignItems: 'start'}}>
                <Span4 style={{paddingTop: '10px'}}>내용</Span4>
                <RelativeDiv>
                  <TextArea rows={!(tokenUserInfo.role === 'NORMAL' && reply?.title === '') ? 10 : 20}
                            style={{backgroundColor: 'transparent', borderWidth: 0}}
                            value={state.data?.content}
                            readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
          </BoardTableContainer>
        </Board>
        { !(tokenUserInfo.role === 'NORMAL' && reply?.title === '') &&
          <Board>
            <BoardHeader>
              <ColSpan3>
                <p>답변</p>
              </ColSpan3>
            </BoardHeader>
            <BoardTableContainer>
              <RowSpan validation>
                <ColSpan4>
                  <Span4>제목</Span4>
                  <RelativeDiv>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                          required: {
                            value: reply?.title === '',
                            message: '답변 제목을 입력해 주세요.'
                          }
                        }}
                        render={({field}) => (
                            <Input type={'text'}
                                   {...field}
                                   value={reply?.title}
                                   style={tokenUserInfo.role === 'NORMAL' ? {backgroundColor: 'transparent', borderWidth: 0, padding: '10px', fontWeight: 'bold'} : {padding: '10px'}}
                                   readOnly={tokenUserInfo.role === 'NORMAL'}
                                   onChange={(e) => {
                                     setReply({...reply, title: e.target.value})
                                   }}
                            />
                          )}
                    />
                    {errors.title && <ValidationScript>{errors.title.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
              <RowSpan validation>
                <ColSpan4 style={{alignItems: 'start'}}>
                  <Span4 style={{paddingTop: '10px'}}>내용</Span4>
                  <RelativeDiv>
                    <Controller
                        name="content"
                        control={control}
                        rules={{
                          required: {
                            value: reply?.content === '',
                            message: '답변 내용을 입력해 주세요.'
                          }
                        }}
                        render={({field}) => (
                            <TextArea
                                rows={7}
                                {...field}
                                value={reply?.content}
                                style={tokenUserInfo.role === 'NORMAL' ? {backgroundColor: 'transparent', borderWidth: 0} : {}}
                                readOnly={tokenUserInfo.role === 'NORMAL'}
                                onChange={(e) => {
                                  setReply({...reply, content: e.target.value})
                                }}
                            />
                        )}
                    />
                    {errors.content && <ValidationScript>{errors.content.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
            </BoardTableContainer>
          </Board>
        }
        <SubmitContainer>
          <CancelButton type={"button"} onClick={()=> navigate('/board/inquiry')}>목록</CancelButton>
          {tokenUserInfo.role !== 'NORMAL' &&
              <SubmitButton type={"submit"}>{'저장'}</SubmitButton>
          }
        </SubmitContainer>
      </form>
  );
}