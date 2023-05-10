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
  RowSpan,
  Span3,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../../assets/GlobalStyles";
import {
  CampaignButton,
  CategoryItem, CreateImage,
  DeleteIcon,
  FolderButton,
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
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {campaignBasicInfoAtom} from "../entity/Info";
import {selEnumInfo} from "../../../services/campaign/InfoAxios";
import {bannerSizeAtom, campaignCreativeAtom, clickInducementTypeAtom, creativeTypeAtom} from "../entity/Creative";
import ImageUploading from "react-images-uploading";
import {
  selCreativeBannerInfo, selCreativeNativeInfo, selCreativePopUnderInfo,
  updateCampaignBanner, updateCampaignNative, updateCampaignPopUnder,
  uploadBannerImages,
  uploadLogoImages,
  uploadNativeImages
} from "../../../services/campaign/CreativeAxios";
import moment from "moment";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";

const RegistryBannerItem = (props) => {
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)

  const handleDeleteImage = (imagePath) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      materials: campaignCreativeInfo.materials.map(value => {
        if (value.bannerSize === props.size.bannerSize) {
          return {
            ...value,
            images: value.images.filter(item => item.imagePath !== imagePath)
          }
        } else {
          return {
            ...value
          }
        }
      })
    })
  }
  const onDrop = (pictureFiles) => {
    if (pictureFiles.length !== 0) {
      const data = new FormData()
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
      })
      let boolSaveImages = campaignCreativeInfo.materials.find(value =>value.bannerSize === props.size.bannerSize ).images.length +pictureFiles.length

      if(boolSaveImages < 6 ){
        uploadBannerImages(data, props.size.bannerSize).then(response => {
          if (response) {
            setCampaignCreative({
              ...campaignCreativeInfo,
              materials: campaignCreativeInfo.materials.map(value => {
                if (value.bannerSize === props.size.bannerSize) {
                  return {
                    ...value,
                    images: value.images.concat(response.images)
                  }
                } else {
                  return {
                    ...value
                  }
                }
              })
            })
          }
        })
      }else{
        alert("5개 이상 등록 못함")
      }
    }
  }
  return (
    <RowSpan style={{width: '50%'}}>
      <ColSpan4>
        <Span4 style={{textAlign: 'right', whiteSpace: 'nowrap'}}>{props.size.bannerSize}</Span4>
        <RowSpan box={true} style={{justifyContent: 'flex-start'}}>
          {campaignCreativeInfo.materials.find(value => value.bannerSize === props.size.bannerSize).images.map((item, key) => {
            return (
              <ColSpan100 padding={'0'} key={key}>
                <DeleteIcon onClick={() => handleDeleteImage(item.imagePath)}/>
                <ImageUploadCard>
                  <img src={item.thumbnailPath} alt={'이미지'}/>
                </ImageUploadCard>
              </ColSpan100>
            )
          })}
          {campaignCreativeInfo.materials.find(value => value.bannerSize === props.size.bannerSize).images.length < 5 &&
            <ColSpan100 padding={'0'}>
              <ImageUploading
                multiple
                acceptType={["jpg", "gif", "png"]}
                onChange={onDrop}
                maxFileSize={10485760}
                maxNumber={5}
              >
                {({onImageUpload}) => (
                  <CreateImage onClick={onImageUpload}/>
                )}
              </ImageUploading>
            </ColSpan100>
          }
        </RowSpan>
      </ColSpan4>
    </RowSpan>
  )
}

function CampaignFourBanner(props) {
  const [campaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [clickInducementType] = useAtom(clickInducementTypeAtom)
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)
  const [bannerSize] = useAtom(bannerSizeAtom)
  const [fold, setFold] = useState(true)

  const handleDeleteLogoImage = (imagePath) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      logoPaths: campaignCreativeInfo.logoPaths.filter(item =>item.imagePath !==imagePath )
    })
  }

  const handleAddCreative = (e) => {
    let materials = {
      bannerSize: e.target.id,
      images: [],
    }
    const boolActive = campaignCreativeInfo.materials.find(value => value.bannerSize === e.target.id) ? false : true

    if (boolActive || boolActive === undefined) {
      setCampaignCreative({
        ...campaignCreativeInfo,
        materials: campaignCreativeInfo.materials.concat(materials)
      })
    } else {
      setCampaignCreative({
        ...campaignCreativeInfo,
        materials: campaignCreativeInfo.materials.filter(value => value.bannerSize !== e.target.id)
      })
    }
  }

  const handleChangeInputs = (e) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleClickInducementType = (selectedClickInducement) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      clickInducementType: selectedClickInducement.value
    })
  }

  const onLogoDrop = (pictureFiles) => {
    if (pictureFiles.length !== 0) {
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length - 1;
      console.log(pictureFiles)
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
      })
      let boolSaveImages = campaignCreativeInfo.logoPaths.length + pictureFiles.length
      if(boolSaveImages < 6){
        uploadLogoImages(data).then(response => {
          if (response) {
            setCampaignCreative({
              ...campaignCreativeInfo,
              logoPaths: campaignCreativeInfo.logoPaths.concat(response)
            })
          }
        })
      }else{
        alert("5개 이상 등록 못함")
      }
    }
  }

  return (
    <>
      <RowSpan column={true}>
        <Span4>광고 소재</Span4>
        <div style={{marginTop: 15}}>
          <SelectCategory style={{padding: 20, borderRadius: '5px 5px 0 0'}}>
            {bannerSize !== null && bannerSize.map((item, key) => {
              return (
                <CategoryItem key={key} onClick={(e) => handleAddCreative(e)} id={item.value}
                              active={campaignCreativeInfo.materials.find(value => value.bannerSize === item.value)}>{item.label}</CategoryItem>
              )
            })}
          </SelectCategory>
          <ResistBanner>
            <p style={{color: '#ccc'}}>사이즈별 소재는 최대 5개까지 등록 가능합니다.</p>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {campaignCreativeInfo.materials !== undefined && campaignCreativeInfo.materials.map((item, key) => {
                return (
                  <RegistryBannerItem key={key} size={item}/>
                )
              })}
            </div>
          </ResistBanner>
        </div>
      </RowSpan>
      <RowSpan box={true} column={true} style={{padding: 0, backgroundColor: '#fff'}}>
        <RowHeader onClick={() => setFold(!fold)}>
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
                name={'title1'}
                value={campaignCreativeInfo.title1}
                onChange={handleChangeInputs}한
              />
            </Row>
            <Row>
              <span>광고 제목1<p><small style={{color: '#ccc'}}>최대 25자까지 등록</small></p></span>
              <input
                type={'text'}
                name={'title2'}
                maxLength={25}
                value={campaignCreativeInfo.title2}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목2</span>
              <input
                type={'text'}
                name={'title3'}
                value={campaignCreativeInfo.title3}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>긴 광고 제목<p><small style={{color: '#ccc'}}>최대 90자까지 등록</small></p></span>
              <input
                type={'text'}
                name={'titleLong'}
                maxLength={90}
                value={campaignCreativeInfo.titleLong}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>클릭 유도 문안</span>
              <Select options={clickInducementType}
                      placeholder={'유도 문안 선택'}
                      value={campaignCreativeInfo.clickInducementType !== undefined ?
                        clickInducementType.find(value => value.value === campaignCreativeInfo.clickInducementType) : ''}
                      onChange={handleClickInducementType}
              />
            </Row>
          </ColSpan2>
          <div style={{width: 1, margin: '0 30px', backgroundColor: '#ddd'}}/>
          <ColSpan2 column={true}>
            <Row>
              <span style={{fontSize: 14}}>서비스 (회사) 정보</span>
            </Row>
            <Row style={{alignItems: 'flex-start'}}>
              <span>로고이미지<p><small style={{color: '#ccc'}}>최대 5개 까지 등록</small></p></span>
              <RowSpan box={true} style={{marginTop: 0, width: '80%', justifyContent: 'flex-start'}}>
                {campaignCreativeInfo.logoPaths.length !== 0 && campaignCreativeInfo.logoPaths.map((item, key) => {
                  return (
                    <ColSpan100 padding={'0'} key={key}>
                      <DeleteIcon onClick={() => handleDeleteLogoImage(item.imagePath)}/>
                      <ImageUploadCard>
                        <img src={item.imagePath} alt={key}/>
                      </ImageUploadCard>
                    </ColSpan100>
                  )
                })}
                {campaignCreativeInfo.logoPaths.length < 5 &&
                  <ColSpan100 padding={'0'}>
                    <ImageUploading
                      multiple
                      acceptType={["jpg", "gif", "png"]}
                      onChange={onLogoDrop}
                      maxFileSize={10485760}
                      maxNumber={5}
                    >
                      {({onImageUpload}) => (
                        <CreateImage onClick={onImageUpload}/>
                      )}
                    </ImageUploading>
                  </ColSpan100>
                }
              </RowSpan>
            </Row>
            <Row>
              <span>서비스 명</span>
              <input
                type={'text'}
                name={'serviceName'}
                value={campaignCreativeInfo.serviceName}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 설명</span>
              <input
                type={'text'}
                name={'description'}
                value={campaignCreativeInfo.description}
                onChange={handleChangeInputs}
              />
            </Row>
          </ColSpan2>
        </RowBody>
      </RowSpan>
    </>
  )
}

function CampaignFourNative(props) {
  const {stepFour, setStepFour, register, handleSubmit, control, errors} = props
  const [clickInducementType] = useAtom(clickInducementTypeAtom)
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)

  useEffect(()=>{
    console.log(campaignCreativeInfo)
  },[])
  const handleDeleteLogoImage = (imagePath) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      logoPaths: campaignCreativeInfo.logoPaths.filter(item =>item.imagePath !==imagePath )
    })
  }

  const handleChangeInputs = (e) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleDeleteNativeImage = (imagePath) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      nativeMaterials: campaignCreativeInfo.nativeMaterials.filter(item =>item.imagePath !==imagePath )
    })
  }
  const onNativeDrop = (pictureFiles) => {
    if (pictureFiles.length !== 0) {
      const data = new FormData()
      console.log(pictureFiles)
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
      })
      let boolSaveImages = campaignCreativeInfo.nativeMaterials.length + pictureFiles.length
      if(boolSaveImages < 6){
        uploadNativeImages(data).then(response => {
          if (response) {
            setCampaignCreative({
              ...campaignCreativeInfo,
              nativeMaterials: campaignCreativeInfo.nativeMaterials.concat(response)
            })
          }
        })
      }else{
        alert("5개 이상 등록 못함")
      }
    }
  }

  const handleClickInducementType = (selectedClickInducement) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      clickInducementType: selectedClickInducement.value
    })
  }

  const onLogoDrop = (pictureFiles) => {
    if (pictureFiles.length !== 0) {
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length - 1;
      console.log(pictureFiles)
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
      })
      let boolSaveImages = campaignCreativeInfo.logoPaths.length + pictureFiles.length
      if(boolSaveImages < 6){
        uploadLogoImages(data).then(response => {
          if (response) {
            setCampaignCreative({
              ...campaignCreativeInfo,
              logoPaths: campaignCreativeInfo.logoPaths.concat(response)
            })
          }
        })
      }else{
        toast.warning('이미지는 5개 까지만 등록 가능합니다.')
      }
    }
  }
  return (
    <form>
      <RowSpan>
        <ColSpan3><Span4>광고소재</Span4></ColSpan3>
      </RowSpan>
      <RowSpan>
        <ColSpan4 style={{alignItems: 'flex-start', flexDirection: 'column', paddingLeft: 0}}>
          <RowSpan box={true} column={true} padding={'0'}
                   style={{width: '100%', padding: '20px 30px', backgroundColor: '#fff'}}>
            <Row>
              <span style={{fontSize: 14}}>소재설정</span>
            </Row>
            <Row>
              <span>이미지<p><small style={{color: '#ccc'}}>최대 5개 까지 등록</small></p></span>
              <RowSpan box={true} style={{marginTop: 0, gap: 10, width: '80%', justifyContent: 'flex-start'}}>
                {campaignCreativeInfo.nativeMaterials.length !== 0 && campaignCreativeInfo.nativeMaterials.map((item, key) => {
                  return (
                    <ColSpan100 padding={'0'} key={key}>
                      <DeleteIcon onClick={() => handleDeleteNativeImage(item.imagePath)}/>
                      <ImageUploadCard>
                        <img src={item.imagePath} alt={key}/>
                      </ImageUploadCard>
                    </ColSpan100>
                  )
                })}
                {campaignCreativeInfo.nativeMaterials.length < 5 &&
                  <ColSpan100 padding={'0'}>
                    <ImageUploading
                      multiple
                      acceptType={["jpg", "gif", "png"]}
                      onChange={onNativeDrop}
                      maxFileSize={10485760}
                      maxNumber={5}
                    >
                      {({onImageUpload}) => (
                        <CreateImage onClick={onImageUpload}/>
                      )}
                    </ImageUploading>
                  </ColSpan100>
                }
              </RowSpan>
            </Row>
            <Row>
              <span>광고 타이틀</span>
              <input
                type={'text'}
                name={'title1'}
                value={campaignCreativeInfo.title1}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목1<p><small style={{color: '#ccc'}}>최대 25자 까지 등록</small></p></span>
              <input
                type={'text'}
                name={'title2'}
                maxLength={25}
                value={campaignCreativeInfo.title2}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>광고 제목2</span>
              <input
                type={'text'}
                name={'title3'}
                value={campaignCreativeInfo.title3}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>긴 광고 제목<p><small style={{color: '#ccc'}}>최대 90자까지 등록</small></p></span>
              <input
                type={'text'}
                name={'titleLong'}
                maxLength={90}
                value={campaignCreativeInfo.titleLong}
                onChange={handleChangeInputs}
              />
            </Row>
            <Row>
              <span>클릭 유도 문안</span>
              <Select options={clickInducementType}
                      placeholder={'유도 문안 선택'}
                      value={campaignCreativeInfo.clickInducementType !== undefined ?
                        clickInducementType.find(value => value.value === campaignCreativeInfo.clickInducementType) : ''}
                      onChange={handleClickInducementType}
              />
            </Row>
          </RowSpan>
        </ColSpan4>
      </RowSpan>

      <RowSpan box={true} column={true} padding={'0'} style={{padding: '20px 30px', backgroundColor: '#fff'}}>
        <Row>
          <span>서비스 명</span>
          <input
            type={'text'}
            name={'serviceName'}
            value={campaignCreativeInfo.serviceName}
            onChange={handleChangeInputs}
          />
        </Row>
        <Row>
          <Span4>로고 <p><small style={{color: '#ccc'}}>최대 5개 까지 등록</small></p></Span4>
          <RowSpan box={true} style={{marginTop: 0, gap: 10, width: '80%', justifyContent: 'flex-start'}}>
            {campaignCreativeInfo.logoPaths.length !== 0 && campaignCreativeInfo.logoPaths.map((item, key) => {
              return (
                <ColSpan100 padding={'0'} key={key}>
                  <DeleteIcon onClick={() => handleDeleteLogoImage(item.imagePath)}/>
                  <ImageUploadCard>
                    <img src={item.imagePath} alt={key}/>
                  </ImageUploadCard>
                </ColSpan100>
              )
            })}
            {campaignCreativeInfo.logoPaths.length < 5 &&
              <ColSpan100 padding={'0'}>
                <ImageUploading
                  multiple
                  acceptType={["jpg", "gif", "png"]}
                  onChange={onLogoDrop}
                  maxFileSize={10485760}
                  maxNumber={5}
                >
                  {({onImageUpload}) => (
                    <CreateImage onClick={onImageUpload}/>
                  )}
                </ImageUploading>
              </ColSpan100>
            }
          </RowSpan>
        </Row>
        <Row>
          <Row>
            <span>광고 설명(선택)</span>
            <input
              type={'text'}
              name={'description'}
              value={campaignCreativeInfo.description}
              onChange={handleChangeInputs}
            />
          </Row>
        </Row>
      </RowSpan>
      <RowSpan>
        <ColSpan1><Span4>미리보기</Span4></ColSpan1>
      </RowSpan>
      <RowSpan box={true}>
        {campaignCreativeInfo.nativeMaterials !==undefined && campaignCreativeInfo.nativeMaterials.length !== 0 && campaignCreativeInfo.nativeMaterials.map((item, key) => {
          return (
            <PrevImage style={{backgroundImage: `url(${item.imagePath})`}} />
          )
        })}
      </RowSpan>
    </form>
  )
}

export function CampaignFour() {
  const {state} =useLocation()
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)
  const [campaignBasicInfo,setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [, setBannerSize] = useAtom(bannerSizeAtom)
  const [creativeType, setCreativeType] = useAtom(creativeTypeAtom)
  const [, setClickInducementType] = useAtom(clickInducementTypeAtom)
  const {register, handleSubmit, reset, formState: {errors}} = useFormContext()
  const [resistBool] =useState(state === null ? true:false)
  useEffect(() => {
    if(!resistBool){
      if(state.creativeType ==='BANNER' ){
        selCreativeBannerInfo(state.campaignId).then(response =>{
          console.log(response)
          setCampaignCreative({
            ...response,
            nativeMaterials:[]
          })
          setCampaignBasicInfo({
            campaignId: state.campaignId,
            productType: state.productType
          })
          reset(response)
        })
      }else if(state.creativeType ==='NATIVE'){
        selCreativeNativeInfo(state.campaignId).then(response =>{
          setCampaignCreative({
            ...response,
            materials:[]
          })
          setCampaignBasicInfo({
            campaignId: state.campaignId,
            productType: state.productType
          })
          reset(response)
        })
      }else if(state.creativeType ==='POP_UNDER') {
        selCreativePopUnderInfo(state.campaignId).then(response => {
          console.log(response)
          setCampaignCreative({
            ...response,
            materials: [],
            nativeMaterials: []
          })
          setCampaignBasicInfo({
            campaignId: state.campaignId,
            productType: state.productType
          })
          reset(response)
        })
      }
    }
    selEnumInfo('BANNER_SIZE').then(response => {
      setBannerSize(response.data)
    })
    selEnumInfo('CLICK_INDUCEMENT_TYPE').then(response => {
      setClickInducementType(response.data)
    })

    if (resistBool || (state !==null && state.productType==='BANNER')) {
      selEnumInfo('CREATIVE_TYPE_BANNER').then(response => {
        setCreativeType(response.data)
      })
    } else {
      selEnumInfo('CREATIVE_TYPE_POP_UNDER').then(response => {
        console.log(response.data)
        setCreativeType(response.data)
        setCampaignCreative({
          ...campaignCreativeInfo,
          creativeType: 'POP_UNDER'
        })
      })
    }
  }, [])
  const selCreativeGroup = (selectedCreateType) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      creativeType: selectedCreateType
    })
  }
  const handleChangeInputs = (e) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (data) => {
    console.log(campaignCreativeInfo)
    if(campaignCreativeInfo.creativeType ==='BANNER'){
      updateCampaignBanner({
        ...campaignCreativeInfo,
        campaignId:campaignBasicInfo.campaignId,
        name:campaignCreativeInfo.name !==undefined ? campaignCreativeInfo.name : creativeType.find(value => value.value === campaignCreativeInfo.creativeType).label+ '_' + campaignBasicInfo.pixelId.label+ '_' +campaignBasicInfo.productType+ '_' +campaignBasicInfo.goal.label+ '_' +moment().format('YYYYMMDDhhmmss')
      }).then(response => {
        if(response){
          alert("등록 완료")
        }
      })
    }else if(campaignCreativeInfo.creativeType ==='NATIVE'){
      updateCampaignNative({
        ...campaignCreativeInfo,
        campaignId:campaignBasicInfo.campaignId,
        name:campaignCreativeInfo.name !==undefined ? campaignCreativeInfo.name :  creativeType.find(value => value.value === campaignCreativeInfo.creativeType).label+ '_' + campaignBasicInfo.pixelId.label+ '_' +campaignBasicInfo.productType+ '_' +campaignBasicInfo.goal.label+ '_' +moment().format('YYYYMMDDhhmmss')
      }).then(response => {
        if(response){
          alert("등록 완료")
        }
      })
    }else if(campaignCreativeInfo.creativeType ==='POP_UNDER'){
      updateCampaignPopUnder({
        ...campaignCreativeInfo,
        campaignId:campaignBasicInfo.campaignId,
        name:campaignCreativeInfo.name !==undefined ? campaignCreativeInfo.name :  creativeType.find(value => value.value === campaignCreativeInfo.creativeType).label+ '_' + campaignBasicInfo.pixelId.label+ '_' +campaignBasicInfo.productType+ '_' +campaignBasicInfo.goal.label+ '_' +moment().format('YYYYMMDDhhmmss')
      }).then(response => {
        if(response){
          alert("등록 완료")
        }
      })
    }
    setStepCampaign({steps: 4})
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {campaignCreativeInfo !== null &&
        <Board>
          <BoardHeader>광고 그룹 설정</BoardHeader>
          <BoardSearchResult>
            <Span4>크리에이티브 그룹 선택</Span4>
            <RowSpan box={true} column={false}>
              {creativeType !== null && (resistBool || (state !==null && state.productType==='BANNER')) &&
                <ColSpan1 padding={'0'}>
                  <CampaignButton type={'button'}
                                  onClick={() => selCreativeGroup('BANNER')}
                                  className={campaignCreativeInfo.creativeType === 'BANNER' ? 'on' : null}
                  >
                    {creativeType.find(value => value.value === 'BANNER').label}
                  </CampaignButton>
                  <CampaignButton type={'button'}
                                  onClick={() => selCreativeGroup('NATIVE')}
                                  className={campaignCreativeInfo.creativeType === 'NATIVE' ? 'on' : null}
                  >
                    {creativeType.find(value => value.value === 'NATIVE').label}
                  </CampaignButton>
                </ColSpan1>
              }
              {creativeType !== null && campaignBasicInfo.productType ==='POP_UNDER' &&
                <ColSpan1 padding={'0'}>
                  <CampaignButton type={'button'}
                                  className={ 'on'}
                  >
                    {creativeType.find(value => value.value === 'POP_UNDER').label}
                  </CampaignButton>
                </ColSpan1>
              }
            </RowSpan>
            <RowSpan column={true}>
              <Span4>랜딩 url</Span4>
              <RowSpan box={true} column={false}>
                <ColSpan2>
                  <Span3>PC 랜딩 url</Span3>
                  <Input
                    type={'text'}
                    name={'pcLandingUrl'}
                    value={campaignCreativeInfo.pcLandingUrl}
                    {...register('pcLandingUrl', {
                      required: 'PC 랜딩 URL을 작성해주세요',
                      pattern:{
                        value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                        message: "http(s)://가 포함된 url 주소를 확인해주세요."
                      },
                      onChange: (e) => handleChangeInputs(e)
                    })}
                  />
                </ColSpan2>
                <HorizontalRule style={{height: 42}}/>
                <ColSpan2>
                  <Span4>MOBILE 랜딩 url</Span4>
                  <Input
                    type={'text'}
                    name={'mobLandingUrl'}
                    value={campaignCreativeInfo.mobLandingUrl}
                    {...register('mobLandingUrl', {
                      required: '모바일 랜딩 URL을 작성해주세요',
                      pattern:{
                        value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                        message: "http(s)://가 포함된 url 주소를 확인해주세요."
                      },
                      onChange: (e) => handleChangeInputs(e)
                    })}
                  />
                </ColSpan2>
              </RowSpan>
            </RowSpan>
            <ValidationGroup>
              <Validation>{errors.pcLandingUrl && errors.pcLandingUrl.message}</Validation>
              <Validation>{errors.mobLandingUrl && errors.mobLandingUrl.message}</Validation>
            </ValidationGroup>
            <RowSpan column={true}>
              <Span4>인식 코드</Span4>
              <RowSpan box={true} column={false}>
                <ColSpan2>
                  <Span3>PC 인식 코드</Span3>
                  <Input
                    type={'text'}
                    name={'pcReferralCode'}
                    value={campaignCreativeInfo.pcReferralCode}
                    {...register('pcReferralCode', {
                      required: 'PC 인식 코드를 작성해주세요',
                      onChange: (e) => handleChangeInputs(e)
                    })}
                  />
                </ColSpan2>
                <HorizontalRule style={{height: 42}}/>
                <ColSpan2>
                  <Span4 style={{letterSpacing: -1}}>MOBILE 인식 코드</Span4>
                  <Input
                    type={'text'}
                    name={'mobReferralCode'}
                    value={campaignCreativeInfo.mobReferralCode}
                    {...register('mobReferralCode', {
                      required: '모바일 인식 코드를 작성해주세요',
                      onChange: (e) => handleChangeInputs(e)
                    })}
                  />
                </ColSpan2>
              </RowSpan>
            </RowSpan>
            <ValidationGroup>
              <Validation>{errors.pcReferralCode && errors.pcReferralCode.message}</Validation>
              <Validation>{errors.mobReferralCode && errors.mobReferralCode.message}</Validation>
            </ValidationGroup>
            {campaignCreativeInfo.creativeType === 'BANNER' && (resistBool || (state !==null && state.productType==='BANNER')) &&
              <CampaignFourBanner register={register} errors={errors}/>
            }
            {campaignCreativeInfo.creativeType === 'NATIVE' && (resistBool || (state !==null && state.productType==='BANNER')) &&
              <CampaignFourNative register={register} errors={errors}/>
            }
          </BoardSearchResult>
        </Board>
      }
      <SubmitContainer>
        <CancelButton type={'button'} onClick={() => setStepCampaign({steps: 2})}>취소</CancelButton>
        <SubmitButton type={'submit'}>저장</SubmitButton>
      </SubmitContainer>
    </form>
  )
}