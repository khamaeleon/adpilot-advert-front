import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton,
  ColSpan1,
  ColSpan100,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  Input,
  RelativeDiv,
  RowSpan,
  selectStyle,
  Span3,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../../assets/GlobalStyles";
import {
  CampaignButton,
  CategoryItem,
  CreateImage,
  DeleteIcon,
  FolderButton,
  ImageTitle,
  ImageUploadCard,
  PrevImage,
  ResistBanner,
  Row,
  RowBody,
  RowHeader,
  SelectCategory,
  Validation,
  ValidationGroup
} from "../styles/common";
import {HorizontalRule} from "../../../components/common/Common";
import Select from "react-select";
import React, {useState} from "react";
import {useFormContext} from "react-hook-form";
import {CreativeButton} from "../../../components/modal/CreativeOpen";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";

const RegistryBannerItem = (props) => {
  const [bannerImage, setBannerImage] = useState([])

  const handleAddImage = () => {
    if(bannerImage.length < 5){
      setBannerImage((prev) => [...prev, {key:bannerImage.length,url:'../assets/images/common/sample1.png'}])
    }
  }

  const handleDeleteImage = (key) => {
    setBannerImage([...bannerImage.filter(item => item.key !== key)])
  }

  return (
    <RowSpan style={{width: '50%'}}>
      <ColSpan4>
        <Span4 style={{textAlign:'right',whiteSpace:'nowrap'}}>{props.bannerSize}</Span4>
        <RowSpan box={true} style={{justifyContent:'flex-start'}}>
          {bannerImage.map((item, key) => {
            return (
              <ColSpan100 padding={'0'} key={key}>
                <DeleteIcon onClick={() => handleDeleteImage(key)}/>
                <ImageUploadCard>
                  <img src={item.url} alt={'이미지'}/>
                </ImageUploadCard>
              </ColSpan100>
            )
          })}
          {bannerImage.length < 5 &&
          <ColSpan100 padding={'0'}>
            <CreateImage onClick={handleAddImage}/>
          </ColSpan100>
          }
        </RowSpan>
      </ColSpan4>
    </RowSpan>
  )
}

function CampaignFourBanner (props) {
  const {stepFour, setStepFour, register,handleSubmit ,control, errors} = props
  const bannerSize = [
    {name: '250*250'},
    {name: '250*50'},
    {name: '300*300'},
    {name: '120*600'},
    {name: '728*90'},
    {name: '320*50'},
    {name: '320*100'},
    {name: '300*250'},
    {name: '300*600'}
  ]

  const [creative, setCreative] = useState([])
  const [fold, setFold] = useState(true)
  const [logoImage, setLogoImage] = useState([])

  const handleAddLogoImage = () => {
    if(logoImage.length < 5){
      setLogoImage((prev) => [...prev, {key:logoImage.length,url:'../assets/images/common/sample1.png'}])
    }
  }

  const handleDeleteLogoImage = (key) => {
    setLogoImage([...logoImage.filter(item => item.key !== key)])
  }

  const handleAddCreative = (e) => {
    setCreative((prev) => [...prev, {name:e.target.innerText,value:[]}])
  }

  const handleChangeInputs = (e) => {
    setStepFour({
      ...stepFour,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <RowSpan column={true}>
        <Span4>광고 소재</Span4>
        <div style={{marginTop:15}}>
          <SelectCategory style={{padding:20,borderRadius:'5px 5px 0 0'}}>
            {bannerSize.map((item, key) => {
              return (
                <CategoryItem key={key} onClick={handleAddCreative}>{item.name}</CategoryItem>
              )
            })}
          </SelectCategory>
          <ResistBanner>
            <p style={{color: '#ccc'}}>사이즈별 소재는 최대 5개까지 등록 가능합니다.</p>
            <div style={{display:'flex', flexWrap:'wrap'}}>
              {creative.map((item, key) => {
                return (
                  <RegistryBannerItem key={key} bannerSize={item.name}/>
                )
              })}
            </div>
          </ResistBanner>
        </div>
      </RowSpan>
      <RowSpan box={true} column={true} style={{padding:0,backgroundColor:'#fff'}}>
        <RowHeader onClick={()=> setFold(!fold)}>
          <div>소재 상세 설정 (선택 입력) <small style={{color: '#ccc'}}>로고 이미지 및 광고 문안을 자세히 설정할 수 있습니다.</small></div>
          <FolderButton fold={fold}/>
        </RowHeader>
        <RowBody fold={fold}>
          <ColSpan2 column={true}>
            <Row>
              <span style={{fontSize: 14}}>소재설정</span>
            </Row>
            <Row>
              <span>광고 타이틀</span>
              <input
                type={'text'}
                name={'name'}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목1<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input
                type={'text'}
                name={'title1'}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목2</span>
              <input
                type={'text'}
                name={'title2'}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>긴 광고 제목<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input
                type={'text'}
                name={'longTitle'}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>클릭 유도 문안</span>
              <Select
                styles={selectStyle}
                options={[{key: 1, value: 1, label: '유도 문안'}]}
              />
            </Row>
          </ColSpan2>
          <div style={{width: 1,margin: '0 30px',backgroundColor:'#ddd'}}/>
          <ColSpan2 column={true}>
            <Row>
              <span style={{fontSize: 14}}>서비스 (회사) 정보</span>
            </Row>
            <Row style={{alignItems:'flex-start'}}>
              <span>로고이미지<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <RowSpan box={true} style={{marginTop:0,width: '80%',justifyContent:'flex-start'}}>
                {logoImage.map((item,key) => {
                  return(
                    <ColSpan100 padding={'0'}  key={key}>
                      <DeleteIcon onClick={() => handleDeleteLogoImage(key)}/>
                      <ImageUploadCard>
                        <img src={item.url} alt={key}/>
                      </ImageUploadCard>
                    </ColSpan100>
                  )
                })}
                {logoImage.length < 5 &&
                <ColSpan100 padding={'0'}>
                  <CreateImage onClick={() => handleAddLogoImage()}/>
                </ColSpan100>
                }
              </RowSpan>
            </Row>
            <Row>
              <span>서비스 명</span>
              <input
                type={'text'}
                name={'serviceName'}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 설명</span>
              <input
                type={'text'}
                name={'description'}
                onChange={handleChangeInputs}
              />
            </Row>
          </ColSpan2>
        </RowBody>
      </RowSpan>
      <RowSpan>
        <ColSpan4>
          <Span4>크리에이티브 명</Span4>
          <RelativeDiv>
            <Input value={'픽셀명_광고상품명_설정 목표명_광고 그룹_YYYY.MM.DD HH:MM'} readOnly/>
          </RelativeDiv>
        </ColSpan4>
      </RowSpan>
    </>
  )
}

function CampaignFourNative (props) {
  const {stepFour, setStepFour, register,handleSubmit ,control, errors} = props
  const [bannerImage, setBannerImage] = useState([])
  const [logoImage, setLogoImage] = useState([])
  const handleAddImage = () => {
    if(bannerImage.length < 5){
      setBannerImage((prev) => [...prev, {key:bannerImage.length,url:'../assets/images/common/sample1.png'}])
    }
  }

  const handleDeleteImage = (key) => {
    setBannerImage([...bannerImage.filter(item => item.key !== key)])
  }


  const handleAddLogoImage = () => {
    if(logoImage.length < 5){
      setLogoImage((prev) => [...prev, {key:logoImage.length,url:'../assets/images/common/sample1.png'}])
    }
  }

  const handleDeleteLogoImage = (key) => {
    setLogoImage([...logoImage.filter(item => item.key !== key)])
  }

  const handleChangeInputs = (e) => {
    setStepFour({
      ...stepFour,
      [e.target.name]: e.target.value
    })
  }


  return (
    <form>
      <RowSpan>
        <ColSpan3><Span4>광고소재</Span4></ColSpan3>
        <ColSpan1><Span4>미리보기</Span4></ColSpan1>
      </RowSpan>
      <RowSpan>
        <ColSpan3 style={{alignItems: 'flex-start',flexDirection:'column', paddingLeft:0}}>
          <RowSpan box={true} column={true} padding={'0'} style={{width: '100%',padding: '20px 30px',backgroundColor:'#fff'}}>
            <Row>
              <span style={{fontSize: 14}}>소재설정</span>
            </Row>
            <Row>
              <span>이미지</span>
              <RowSpan style={{marginTop:0,gap: 10,width: '80%',justifyContent:'flex-start'}}>
                {bannerImage.map((item, key) => {
                  return (
                    <ColSpan100 padding={'0'}>
                      <DeleteIcon onClick={() => handleDeleteImage(key)}/>
                      <ImageUploadCard>
                        <img src={item.url}/>
                      </ImageUploadCard>
                    </ColSpan100>
                  )
                })}
                {bannerImage.length < 5 &&
                  <ColSpan100 padding={'0'} onClick={handleAddImage}>
                    <CreateImage/>
                  </ColSpan100>
                }
              </RowSpan>
            </Row>
            <Row>
              <span>광고 타이틀</span>
              <input
                name={'name'}
                type={'text'}
                onChange={()=>handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목1 (선택)<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input
                name={'title'}
                type={'text'}
                onChange={()=>handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목2 (선택)</span>
              <input
                name={'title2'}
                type={'text'}
                onChange={()=>handleChangeInputs}
              />
            </Row>
            <Row>
              <span>긴 광고 제목 (선택)<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input
                name={'longTitle'}
                type={'text'}
                onChange={()=>handleChangeInputs}
              />
            </Row>
            <Row>
              <span>클릭 유도 문안 (선택)</span>
              <Select styles={selectStyle}/>
            </Row>
          </RowSpan>
          <RowSpan box={true} column={true} padding={'0'} style={{padding: '20px 30px',backgroundColor:'#fff'}}>
            <Row>
              <span>서비스 명</span>
              <input
                name={'serviceName'}
                type={'text'}
                onChange={()=>handleChangeInputs}
              />
            </Row>
            <Row>
              <Span4>로고 <p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></Span4>
              <RowSpan style={{marginTop:0,gap: 10,width: '80%',justifyContent:'flex-start'}}>
                {logoImage.map((item, key) => {
                  return(
                    <ColSpan100 padding={'0'} key={key}>
                      <DeleteIcon onClick={() => handleDeleteLogoImage(key)}/>
                      <ImageUploadCard>
                        <img src={item.url} alt={key}/>
                      </ImageUploadCard>
                    </ColSpan100>
                  )
                })}
                {logoImage.length < 5 &&
                  <ColSpan100 padding={'0'} onClick={handleAddLogoImage}>
                    <CreateImage/>
                  </ColSpan100>
                }
              </RowSpan>
            </Row>
            <Row>
              <span>광고 설명 (선택)</span>
              <input
                name={'description'}
                type={'text'}
                onChange={()=>handleChangeInputs}
              />
            </Row>
          </RowSpan>
        </ColSpan3>
        {bannerImage.length !== 0 &&
        <ColSpan1 style={{alignItems: 'flex-start',overflowY:'scroll',maxHeight: 700}}>
          <RowSpan box={true} column={true}>
            {bannerImage.map((item, key) => {
              return (
                <PrevImage style={{backgroundImage: `url(${item.url})`}}>
                  <ImageTitle>{item.name} 소재</ImageTitle>
                </PrevImage>
              )
            })}
          </RowSpan>
        </ColSpan1>
        }
      </RowSpan>
      <RowSpan>
        <ColSpan3>

        </ColSpan3>
      </RowSpan>
      <RowSpan>
        <ColSpan4>
          <Span4>크리에이티브 명</Span4>
          <RelativeDiv>
            <Input value={'픽셀명_광고상품명_설정 목표명_광고 그룹_YYYY.MM.DD HH:MM'} readOnly/>
          </RelativeDiv>
        </ColSpan4>
      </RowSpan>
    </form>
  )
}

export function CampaignFour() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const [creativeGroup, setCreativeGroup] = useState('banner')
  const {register,handleSubmit ,control, formState:{errors}} = useFormContext()
  const [stepFour, setStepFour] = useState({
    bannerType: 'banner',
    pcUrl:'',
    mobileUrl:'',
    pcCode:'',
    mobileCode:'',
    creative: [],
    options: {
      name:'',
      title:'',
      title2:'',
      summary: {key:'',value:'',label:''},
      longTitle:'',
      logo:[],
      serviceName:'',
      description:'',
    },
    creativeName:''
  })

  const handleChangeInputs = (e) => {
    setStepFour({
      ...stepFour,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (data) => {
    console.log(data)
    setStepCampaign({steps:4})
  }
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Board>
        <BoardHeader>광고 그룹 설정</BoardHeader>
        <BoardSearchResult>
          <Span4>크리에이티브 그룹 선택</Span4>
          <RowSpan box={true} column={false}>
            <ColSpan1 padding={'0'}>
              <CampaignButton
                onClick={() => setCreativeGroup('banner')}
                className={creativeGroup === 'banner' ? 'on': null}
              >고정 배너</CampaignButton>
              <CampaignButton
                onClick={() => setCreativeGroup('native')}
                className={creativeGroup === 'native' ? 'on': null}
              >네이티브</CampaignButton>
            </ColSpan1>
            <HorizontalRule style={{margin: '0',height: 50}}/>
            <ColSpan1 padding={'0'}>
              <CreativeButton title={'크리에이티브 불러오기'}/>
            </ColSpan1>
            <ColSpan2>
              <span>나이키_특별 기획_노출 집중그룹_YYYY.MM.DD HH:MM</span>
            </ColSpan2>
          </RowSpan>
          <RowSpan column={true}>
            <Span4>랜딩 url</Span4>
            <RowSpan box={true} column={false}>
              <ColSpan2>
                <Span3>PC 랜딩 url</Span3>
                <Input
                  type={'text'}
                  name={'pcUrl'}
                  onChange={handleChangeInputs}
                  {...register('pcUrl',{
                    required: {
                      value: stepFour.pcUrl === '',
                      message: 'PC 랜딩 URL을 작성해주세요'
                    }
                  })}
                />
              </ColSpan2>
              <HorizontalRule style={{height:42}}/>
              <ColSpan2>
                <Span4>MOBILE 랜딩 url</Span4>
                <Input
                  type={'text'}
                  name={'mobileUrl'}
                  {...register('mobileUrl',{
                    required: {
                      value: stepFour.mobileUrl === '',
                      message: '모바일 랜딩 URL을 작성해주세요'
                    },
                    onChange: () => handleChangeInputs
                  })}
                />
              </ColSpan2>
            </RowSpan>
          </RowSpan>
          <ValidationGroup>
            <Validation>{errors.pcUrl && errors.pcUrl.message}</Validation>
            <Validation>{errors.mobileUrl && errors.mobileUrl.message}</Validation>
          </ValidationGroup>
          <RowSpan column={true}>
            <Span4>인식 코드</Span4>
            <RowSpan box={true} column={false}>
              <ColSpan2>
                <Span3>PC 인식 코드</Span3>
                <Input
                  type={'text'}
                  name={'pcCode'}
                  {...register('pcCode',{
                    required: {
                      value: stepFour.pcCode === '',
                      message: 'PC 인식 코드를 작성해주세요'
                    },
                    onChange: () => handleChangeInputs
                  })}
                />
              </ColSpan2>
              <HorizontalRule style={{height:42}}/>
              <ColSpan2>
                <Span4>MOBILE 인식 코드</Span4>
                <Input
                  type={'text'}
                  name={'mobileCode'}
                  {...register('mobileCode',{
                    required: {
                      value: stepFour.mobileCode === '',
                      message: '모바일 인식 코드를 작성해주세요'
                    },
                    onChange: () => handleChangeInputs
                  })}
                />
              </ColSpan2>
            </RowSpan>
          </RowSpan>
          <ValidationGroup>
            <Validation>{errors.pcCode && errors.pcCode.message}</Validation>
            <Validation>{errors.mobileCode && errors.mobileCode.message}</Validation>
          </ValidationGroup>
          {creativeGroup === 'banner' &&
            <CampaignFourBanner stepFour={stepFour} setStepFour={setStepFour} register={register} errors={errors}/>
            ||
            <CampaignFourNative stepFour={stepFour} setStepFour={setStepFour} register={register} errors={errors}/>
          }
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={()=> setStepCampaign({steps:2})}>취소</CancelButton>
        <SubmitButton type={'submit'}>캠페인 검토</SubmitButton>
      </SubmitContainer>
    </form>
  )
}