import styled from "styled-components";
import React, {useState} from "react";
import {
  CancelButton,
  ColSpan4,
  Input,
  RelativeDiv,
  RowSpan,
  selectStyle,
  Span4,
  SubmitButton,
  TextArea,
  ValidationScript,
} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {Controller, useForm} from "react-hook-form";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import Select from "react-select";
import {inquiryTypes} from "../../pages/customer/entity/NoticeEntity";

export default function WriteNoticeModal(props) {
  const {formType, title, onClick, buttonText, userId} = props;
  const [, setModal] = useAtom(modalController)
  const onClose = () => {
    setModal({ isShow: false })
  }

  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 900,
      modalComponent: () => {
        return (
          <WriteForm formType={formType} title={title} onSubmitProps={onClick} onClose={onClose} userId={userId}/>
        )
      }
    })
  }
  return (
      <Button type={'button'} onClick={handleModalComponent}>{buttonText}</Button>
  )
}

function WriteForm(props) {
  const { formType, title, onSubmitProps, onClose, userId } = props;
  const [notice, setNotice] = useState({title: '', content: ''});
  const [noticePublish, setNoticePublish] = useState({publishYn: 'N'});
  const [inquiryType, setInquiryType] = useState({id: 0, value: 'ADVER_INQUIRY', label:'광고 문의'});
  const {control, handleSubmit, clearErrors, formState: {errors}} = useForm({
    mode: "onSubmit"
  })

  const onError = (error) => console.log(error);
  const onSubmit = () => {
    onClose();
    if(formType.indexOf('notice') > -1){
      Object.assign(notice, noticePublish);
    }else{
      Object.assign(notice, {inquiryType: inquiryType.value, userId: userId});
    }
    onSubmitProps(notice)
  };

  const handleSearchType = (data) => {
    setInquiryType(data)
  }

  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <ModalHeader title={title} style={{borderBottomWidth: 0}}/>
          <ModalBody>
            <RowSpan validation>
              <ColSpan4>
                <Span4>제목</Span4>
                <RelativeDiv>
                  <Controller
                      name="title"
                      control={control}
                      rules={{
                        required: {
                          value: notice?.title === '',
                          message: '제목을 입력해 주세요.'
                        }
                      }}
                      render={({field}) => (
                          <Input type={'text'}
                                 {...field}
                                 value={notice?.title}
                                 placeholder={'제목을 입력해주세요.'}
                                 onChange={(e) => {
                                   setNotice({...notice, title: e.target.value})
                                   clearErrors('title')
                                 }}
                          />)}
                      />
                  {errors.title && <ValidationScript>{errors.title.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan validation>
              <ColSpan4>
                <Span4>내용</Span4>
                <RelativeDiv>
                  <Controller
                      name="content"
                      control={control}
                      rules={{
                        required: {
                          value: notice?.content === '',
                          message: '내용을 입력해 주세요.'
                        }
                      }}
                      render={({field}) => (
                          <TextArea rows={25}
                                    {...field}
                                    placeholder={'내용을 입력해주세요.'}
                                    value={notice?.content}
                                    onChange={(e) => {
                                      setNotice(
                                          {...notice, content: e.target.value})
                                      clearErrors('content')
                                    }}
                          />)}
                      />
                  {errors.content && <ValidationScript>{errors.content.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            {formType.indexOf('notice') > -1 ?
                <RowSpan>
                  <ColSpan4>
                    <Span4>공개 여부</Span4>
                    <RelativeDiv>
                      <label>
                        <input
                            type={'radio'}
                            name={'notice'}
                            id={'publishY'}
                            onChange={() => setNoticePublish({publishYn: 'Y'})}
                            checked={noticePublish?.publishYn === 'Y'}
                        />
                        <span>공개</span>
                      </label>
                      <label>
                        <input
                            type={'radio'}
                            name={'notice'}
                            id={'publishN'}
                            onChange={() => setNoticePublish({publishYn: 'N'})}
                            checked={noticePublish?.publishYn === 'N'}
                        />
                        <span>비공개</span>
                      </label>
                    </RelativeDiv>
                  </ColSpan4>
                </RowSpan>
                :
                <RowSpan>
                  <ColSpan4>
                    <Span4>문의 형식</Span4>
                    <RelativeDiv>
                      <Select styles={selectStyle}
                              width={150}
                              isSearchable={false}
                              options={inquiryTypes.filter((d,i)=> i!=0)}
                              value={inquiryType.value !== '' ? inquiryTypes.find(
                                      type => type.value === inquiryType.value)
                                  : inquiryTypes[1]}
                              onChange={handleSearchType}
                      />
                    </RelativeDiv>
                  </ColSpan4>
                </RowSpan>
            }
          </ModalBody>
          <ModalFooter style={{borderWidth: 0}}>
            <CancelButton type={"button"} onClick={onClose}>취소</CancelButton>
            <SubmitButton type={"submit"}>{'저장'}</SubmitButton>
          </ModalFooter>
        </form>
      </div>
  )
}

const Button = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 5px;
  background-color: #777777;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #535353;
  }
`