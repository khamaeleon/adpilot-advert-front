import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton,
  ColSpan1,
  ColSpan100,
  ColSpan2,
  ColSpan4,
  Input,
  RowSpan,
  selectStyle,
  Span3,
  Span4,
  SubmitButton,
  SubmitContainer, ValidationScript
} from "../../../assets/GlobalStyles";
import {
  AdverInfo, ArrowButton,
  CampaignButton,
  CategoryItem, CreateImage,
  DeleteIcon,
  FolderButton,
  ImageUploadCard, PrevButton, PrevFrame,
  PrevImage250, PrevImage728, PrevTitle250, PrevTitle728,
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
import {Controller, useFormContext} from "react-hook-form";
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
import {toast} from "react-toastify";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useResetAtom} from "jotai/utils";
import {dateFormat, multiAxiosCall, toDay} from "../../../common/StringUtils";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const RegistryBannerItem = (props) => {
  const {size, onImageError, label} = props;
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)

  const handleDeleteImage = (imagePath) => {
    confirmAlert({
      title: '알림',
      message: '해당 이미지를 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setCampaignCreative({
              ...campaignCreativeInfo,
              materials: campaignCreativeInfo.materials.map(value => {
                if (value.bannerSize === size.bannerSize) {
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
        },{
          label: '취소',
        }
      ]
    });
  }
  const onDrop = (pictureFiles) => {
    if (pictureFiles.length !== 0) {
      const data = new FormData()
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
        return null
      })
      uploadBannerImages(data, size.bannerSize).then(response => {
        if (response) {
          setCampaignCreative({
            ...campaignCreativeInfo,
            materials: campaignCreativeInfo.materials.map(value => {
              if (value.bannerSize === size.bannerSize) {
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
    }
  }
  return (
    <RowSpan style={{width: '49%', paddingLeft: 0}}>
      <ColSpan4>
        <Span4 style={{whiteSpace: 'nowrap'}}>{label}</Span4>
        <RowSpan box={true} style={{justifyContent: 'flex-start'}}>
          {campaignCreativeInfo.materials.find(value => value.bannerSize === size.bannerSize).images.map((item, key) => {
            return (
              <ColSpan100 padding={'0'} key={key}>
                <ImageUploadCard>
                  <DeleteIcon onClick={() => handleDeleteImage(item.imagePath)}/>
                  <div className={'img'} style={{backgroundImage: `url(${item.thumbnailPath})`}}></div>
                </ImageUploadCard>
              </ColSpan100>
            )
          })}
          {campaignCreativeInfo.materials.find(value => value.bannerSize === size.bannerSize).images.length < 5 &&
              <ColSpan100 padding={'0'}>
                <ImageUploading
                    multiple
                    acceptType={["jpg", "gif", "png"]}
                    onChange={onDrop}
                    maxFileSize={10485760}
                    maxNumber={5}
                    onError={(e) => onImageError(e,'image')}
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
  const {control, errors, setError, register, onImageError} = props
  const [clickInducementType] = useAtom(clickInducementTypeAtom)
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)
  const [bannerSize] = useAtom(bannerSizeAtom)
  const [fold, setFold] = useState(true)

  const handleDeleteLogoImage = (imagePath) => {
    confirmAlert({
      title: '알림',
      message: '해당 이미지를 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setCampaignCreative({
              ...campaignCreativeInfo,
              logoPaths: campaignCreativeInfo.logoPaths.filter(item =>item.imagePath !==imagePath )
            })
          }
        },{
          label: '취소',
        }
      ]
    });

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
      setError('materials', '')
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
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
        return null
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
        alert("최대 5개까지 등록 가능합니다.")
      }
    }
  }

  return (
    <>
      <RowSpan validation column={true}>
        <Span4>광고 소재</Span4>
        <div style={{marginTop: 15}}>
          <SelectCategory style={{padding: 20, borderRadius: '5px 5px 0 0'}}>
            {bannerSize !== null && bannerSize?.map((item, key) => {
              return (
                <CategoryItem key={key} onClick={(e) => handleAddCreative(e)} id={item.value}
                              active={campaignCreativeInfo.materials.find(value => value.bannerSize === item.value)}>{item.label}</CategoryItem>
              )
            })}
          </SelectCategory>
          <Controller
              name="materials"
              control={control}
              rules={{
                required: {
                  value: campaignCreativeInfo.materials !== undefined && campaignCreativeInfo.materials.length === 0,
                  message: '광고 소재를 등록해 주세요.'
                }
              }}
              render={({field}) => (
                <ResistBanner {...field}>
                  <p style={{color: '#ccc'}}>사이즈별 소재는 최소 1개 이상, 최대 5개까지 등록 가능합니다.</p>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {campaignCreativeInfo.materials !== undefined && campaignCreativeInfo.materials.map((item, key) => {
                      let label = bannerSize.find(value => value.value === item.bannerSize).label
                      return (
                        <RegistryBannerItem key={key} size={item} label={label} onImageError={onImageError}/>
                      )
                    })}
                  </div>
                </ResistBanner>
                  )}
              />
            {errors.materials && <Validation>{errors.materials?.message}</Validation>}
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
              <span>광고 타이틀<p><small style={{color: '#ccc'}}>최대 15자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'title1'}
                  maxLength={15}
                  value={campaignCreativeInfo.title1 || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo?.title1 !== null ? campaignCreativeInfo.title1?.length : 0}</p>
              </div>
            </Row>
            <Row>
              <span>광고 제목1<p><small style={{color: '#ccc'}}>최대 15자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'title2'}
                  maxLength={15}
                  value={campaignCreativeInfo.title2 || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo?.title2 !== null ? campaignCreativeInfo.title2?.length : 0}</p>
              </div>
            </Row>
            <Row>
              <span>광고 제목2<p><small style={{color: '#ccc'}}>최대 15자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'title3'}
                  maxLength={15}
                  value={campaignCreativeInfo.title3 || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo.title3 !== null ? campaignCreativeInfo.title3?.length : 0}</p>
              </div>
            </Row>
            <Row>
              <span>긴 광고 제목<p><small style={{color: '#ccc'}}>최대 40자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'titleLong'}
                  maxLength={40}
                  value={campaignCreativeInfo.titleLong || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo.titleLong !== null ? campaignCreativeInfo.titleLong?.length : 0}</p>
              </div>
            </Row>
            <Row>
              <span>클릭 유도 문안</span>
              <Select options={clickInducementType}
                      placeholder={'유도 문안 선택'}
                      value={campaignCreativeInfo.clickInducementType !== undefined ?
                        clickInducementType?.find(value => value.value === campaignCreativeInfo.clickInducementType) : ''}
                      onChange={handleClickInducementType}
                      width={145}
                      styles={selectStyle}
                      isSearchable={false}
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
                      <ImageUploadCard>
                        <DeleteIcon onClick={() => handleDeleteLogoImage(item.imagePath)}/>
                        <div className={'img'} style={{backgroundImage: `url(${item.imagePath})`}}></div>
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
                      maxFileSize={1048576}
                      maxNumber={5}
                      onError={(e) => onImageError(e,'logo')}
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
              <span>서비스 명<p><small style={{color: '#ccc'}}>최대 20자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'serviceName'}
                  maxLength={20}
                  value={campaignCreativeInfo.serviceName || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo.serviceName !== null ? campaignCreativeInfo.serviceName?.length : 0}</p>
              </div>
            </Row>
            <Row>
              <span>광고 설명<p><small style={{color: '#ccc'}}>최대 30자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'description'}
                  maxLength={30}
                  value={campaignCreativeInfo.description || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo.description !== null ? campaignCreativeInfo.description?.length : 0}</p>
              </div>
            </Row>
          </ColSpan2>
        </RowBody>
      </RowSpan>
      <RowSpan column={true}>
        <Row>
          <Span4>크리에이티브명</Span4>
          <input
            type={'text'}
            maxLength={25}
            name={'name'}
            value={campaignCreativeInfo?.name}
            style={{width: '100%'}}
            {...register('name', {
              required: '크리에이티브명을 입력해주세요',
              onChange: (e)=>handleChangeInputs(e)
            })}
          />
        </Row>
        <Row><Span4></Span4>{errors?.name && <ValidationScript style={{position:'unset'}}>{errors.name.message}</ValidationScript>}</Row>
      </RowSpan>
    </>
  )
}

function CampaignFourNative(props) {
  const {control, errors, register, onImageError} = props
  const [clickInducementType] = useAtom(clickInducementTypeAtom)
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)

  const PreviewNativeBanner = () => {
    const [active250, setActive250] = useState(0);
    const [active728, setActive728] = useState(0);
    const max = campaignCreativeInfo.nativeMaterials?.length -1;
    return campaignCreativeInfo.nativeMaterials?.length !== 0 && (
        <RowSpan column={true}>
          <Span4>미리보기</Span4>
          <RowSpan box={true} style={{justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            <span>250*250 소재</span>
            <Row style={{justifyContent: 'center'}}>
              <ColSpan1>{active250 !== 0 && <ArrowButton next={true} onClick={()=>{setActive250(active250-1)}}/>}</ColSpan1>
              <PrevFrame width={250} height={250}>
                <PrevImage250 style={{backgroundImage: `url(${campaignCreativeInfo.nativeMaterials[active250]?.imagePath})`}} />
                <PrevTitle250><p className={'line-clamp_2'}>{campaignCreativeInfo.title1}</p></PrevTitle250>
              </PrevFrame>
              <ColSpan1>{active250 !== max && <ArrowButton next={false} onClick={()=>{setActive250(active250+1)}}/>}</ColSpan1>
            </Row>
          </RowSpan>
          <RowSpan box={true} style={{justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            <span>728*90 소재</span>
            <Row style={{justifyContent: 'center'}}>
              <ColSpan1>{active728 !== 0 &&  <ArrowButton next={true} onClick={()=>{setActive728(active728-1)}}/>}</ColSpan1>
              <PrevFrame width={728} height={90}>
                <PrevImage728 style={{backgroundImage: `url(${campaignCreativeInfo.nativeMaterials[active728]?.imagePath})`}}/>
                <PrevTitle728><p className={'ellipsis'}>{campaignCreativeInfo.title1}</p></PrevTitle728>
                {campaignCreativeInfo.clickInducementType !== undefined && <PrevButton>{clickInducementType.find(d => d.value === campaignCreativeInfo.clickInducementType)?.label}</PrevButton>}
              </PrevFrame>
              <ColSpan1>{active728 !== max && <ArrowButton next={false} onClick={()=>{setActive728(active728+1)}}/>}</ColSpan1>
            </Row>
          </RowSpan>
        </RowSpan>
    )
  }

  const handleDeleteLogoImage = (imagePath) => {
    confirmAlert({
      title: '알림',
      message: '해당 이미지를 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setCampaignCreative({
              ...campaignCreativeInfo,
              logoPaths: campaignCreativeInfo.logoPaths.filter(item =>item.imagePath !==imagePath )
            })
          }
        },{
          label: '취소',
        }
      ]
    });

  }

  const handleChangeInputs = (e) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleDeleteNativeImage = (imagePath) => {
    confirmAlert({
      title: '알림',
      message: '해당 이미지를 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setCampaignCreative({
              ...campaignCreativeInfo,
              nativeMaterials: campaignCreativeInfo.nativeMaterials.filter(item =>item.imagePath !==imagePath )
            })
          }
        },{
          label: '취소',
        }
      ]
    });
  }
  const onNativeDrop = (pictureFiles) => {
    if (pictureFiles.length !== 0) {
      const data = new FormData()
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
        return null
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
      pictureFiles.map((item ,index)=>{
        data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
        return null
      })
      uploadLogoImages(data).then(response => {
        if (response) {
          setCampaignCreative({
            ...campaignCreativeInfo,
            logoPaths: campaignCreativeInfo.logoPaths.concat(response)
          })
        }
      })
    }
  }
  return (
    <>
      <RowSpan column={true}>
        <Span4>광고 소재</Span4>
        <RowSpan box={true} column={true} style={{width: '100%', padding: '20px 30px', backgroundColor: '#fff'}}>
            <Row>
              <span>이미지<p><small style={{color: '#ccc'}}>최대 5개 까지 등록</small></p><p><small style={{color: '#ccc'}}>(600*300 사이즈 권장)</small></p></span>
                <Controller
                    name="nativeMaterials"
                    control={control}
                    rules={{
                      required: {
                        value: campaignCreativeInfo.nativeMaterials.length === 0,
                        message: '광고 소재를 등록해 주세요.'
                      }
                    }}
                    render={({field}) => (
                        <RowSpan box={true} {...field} style={{marginTop: 0, gap: 10, width: '80%', justifyContent: 'flex-start'}}>
                          {campaignCreativeInfo.nativeMaterials.length !== 0 && campaignCreativeInfo.nativeMaterials.map((item, key) => {
                            return (
                                <ColSpan100 padding={'0'} key={key}>
                                  <ImageUploadCard>
                                    <DeleteIcon onClick={() => handleDeleteNativeImage(item.imagePath)}/>
                                    <div className={'img'} style={{backgroundImage: `url(${item.imagePath})`}}></div>
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
                                    onError={(e)=> onImageError(e,'image')}
                                >
                                  {({onImageUpload}) => (
                                      <CreateImage onClick={onImageUpload}/>
                                  )}
                                </ImageUploading>
                              </ColSpan100>
                          }
                          {errors.nativeMaterials && <Validation>{errors.nativeMaterials?.message}</Validation>}
                          </RowSpan>
                    )}
                />
            </Row>
        </RowSpan>
      </RowSpan>
      <RowSpan column={true}>
        <Span4>소재 상세 설정</Span4>
        <RowSpan box={true} column={true} style={{width: '100%', padding: '20px 30px', backgroundColor: '#fff'}}>
          <Row>
            <span>광고 타이틀<p><small style={{color: '#ccc'}}>최대 15자까지 등록</small></p></span>
            <div className={'txtCont'}>
              <input
                type={'text'}
                maxLength={15}
                name={'title1'}
                value={campaignCreativeInfo.title1 || ""}
                {...register('title1', {
                  required: '광고 타이틀을 입력해주세요',
                  onChange: (e)=>handleChangeInputs(e)
                })}
              />
              <p>{campaignCreativeInfo.title1 !== null ? campaignCreativeInfo.title1?.length : 0}</p>
            </div>
            {errors.title1 && <ValidationScript style={{position:'unset', paddingLeft: 10}}>{errors.title1.message}</ValidationScript>}
          </Row>
          <Row>
            <span>광고 제목1<small>(선택)</small><p><small style={{color: '#ccc'}}>최대 15자까지 등록</small></p></span>
            <div className={'txtCont'}>
              <input
                type={'text'}
                name={'title2'}
                maxLength={15}
                value={campaignCreativeInfo.title2 || ""}
                onChange={handleChangeInputs}
              />
              <p>{campaignCreativeInfo.title2 !== null ? campaignCreativeInfo.title2?.length : 0}</p>
            </div>
          </Row>
          <Row>
            <span>광고 제목2<small>(선택)</small><p><small style={{color: '#ccc'}}>최대 15자까지 등록</small></p></span>
            <div className={'txtCont'}>
              <input
                type={'text'}
                name={'title3'}
                maxLength={15}
                value={campaignCreativeInfo.title3 || ""}
                onChange={handleChangeInputs}
              />
              <p>{campaignCreativeInfo.title3 !== null ? campaignCreativeInfo.title3?.length : 0}</p>
            </div>
          </Row>
          <Row>
            <span>긴 광고 제목<small>(선택)</small><p><small style={{color: '#ccc'}}>최대 40자까지 등록</small></p></span>
            <div className={'txtCont'}>
              <input
                type={'text'}
                name={'titleLong'}
                maxLength={40}
                value={campaignCreativeInfo.titleLong || ""}
                onChange={handleChangeInputs}
              />
              <p>{campaignCreativeInfo.titleLong !== null ? campaignCreativeInfo.titleLong?.length : 0}</p>
            </div>
          </Row>
          <Row>
            <span>클릭 유도 문안<small>(선택)</small></span>
            <Select options={clickInducementType}
                    placeholder={'유도 문안 선택'}
                    value={campaignCreativeInfo.clickInducementType !== undefined ?
                      clickInducementType.find(value => value.value === campaignCreativeInfo.clickInducementType) : ''}
                    onChange={handleClickInducementType}
                    width={145}
                    styles={selectStyle}
                    isSearchable={false}
            />
          </Row>
        </RowSpan>
      </RowSpan>
      <RowSpan column={true}>
        <Span4>서비스 (회사) 정보</Span4>
        <RowSpan box={true} column={true} style={{width: '100%', padding: '20px 30px', backgroundColor: '#fff'}}>
          <Row>
            <span>서비스 명<p><small style={{color: '#ccc'}}>최대 20자까지 등록</small></p></span>
            <div className={'txtCont'}>
              <input
                type={'text'}
                maxLength={20}
                name={'serviceName'}
                value={campaignCreativeInfo?.serviceName || ""}
                {...register('serviceName', {
                  required: '서비스명을 입력해주세요',
                  onChange: (e)=>handleChangeInputs(e)
                })}
              />
              <p>{campaignCreativeInfo?.serviceName !== null ? campaignCreativeInfo.serviceName?.length : 0}</p>
            </div>
            {errors?.serviceName && <ValidationScript style={{position:'unset', paddingLeft: 10}}>{errors.serviceName.message}</ValidationScript>}
          </Row>
          <Row>
            <Span4>로고이미지<small>(선택)</small><p><small style={{color: '#ccc'}}>최대 5개 까지 등록</small></p></Span4>
            <RowSpan box={true} style={{marginTop: 0, gap: 10, width: '80%', justifyContent: 'flex-start'}}>
              {campaignCreativeInfo.logoPaths.length !== 0 && campaignCreativeInfo.logoPaths.map((item, key) => {
                return (
                  <ColSpan100 padding={'0'} key={key}>
                    <ImageUploadCard>
                      <DeleteIcon onClick={() => handleDeleteLogoImage(item.imagePath)}/>
                      <div className={'img'} style={{backgroundImage: `url(${item.imagePath})`}}></div>
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
                    maxFileSize={1048576}
                    maxNumber={5}
                    onError={(e) => onImageError(e,'logo')}
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
              <span>광고 설명<small>(선택)</small><p><small style={{color: '#ccc'}}>최대 30자까지 등록</small></p></span>
              <div className={'txtCont'}>
                <input
                  type={'text'}
                  name={'description'}
                  maxLength={30}
                  value={campaignCreativeInfo.description || ""}
                  onChange={handleChangeInputs}
                />
                <p>{campaignCreativeInfo?.description !== null ? campaignCreativeInfo.description?.length : 0}</p>
              </div>
            </Row>
          </Row>
        </RowSpan>
      </RowSpan>
      <PreviewNativeBanner />
      <RowSpan column={true}>
        <Row>
          <Span4>크리에이티브명</Span4>
          <input
            type={'text'}
            maxLength={25}
            name={'name'}
            value={campaignCreativeInfo?.name}
            style={{width: '100%'}}
            {...register('name', {
              required: '크리에이티브명을 입력해주세요',
              onChange: (e)=>handleChangeInputs(e)
            })}
          />
        </Row>
        <Row><Span4></Span4>{errors?.name && <ValidationScript style={{position:'unset'}}>{errors.name.message}</ValidationScript>}</Row>
      </RowSpan>
    </>
  )
}

export function CampaignFour() {
  const {state} =useLocation()
  const navigate = useNavigate()
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignCreativeInfo, setCampaignCreative] = useAtom(campaignCreativeAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [, setBannerSize] = useAtom(bannerSizeAtom)
  const [creativeType, setCreativeType] = useAtom(creativeTypeAtom)
  const [, setClickInducementType] = useAtom(clickInducementTypeAtom)
  const {control, register, handleSubmit, reset, setError, setValue, formState: {errors}} = useFormContext()
  const [resistBool] =useState(state === null)
  const resetInfo = useResetAtom(campaignCreativeAtom)

  useEffect(() => {
    if(!resistBool){
      if(state.creativeType ==='BANNER' ){
        selCreativeBannerInfo(state.campaignId).then(response =>{
          setCampaignCreative({
            ...response,
            nativeMaterials:[]
          })
          setCampaignBasicInfo({
            ...campaignBasicInfo,
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
            ...campaignBasicInfo,
            campaignId: state.campaignId,
            productType: state.productType
          })
          reset(response)
        })
      }else if(state.creativeType ==='POP_UNDER') {
        selCreativePopUnderInfo(state.campaignId).then(response => {
          setCampaignCreative({
            ...response,
            materials: [],
            nativeMaterials: []
          })
          setCampaignBasicInfo({
            ...campaignBasicInfo,
            campaignId: state.campaignId,
            productType: state.productType
          })
          reset(response)
        })
      }
    }else{
      let time = dateFormat(toDay(), 'YYMMDDHHmm');
      let creativeType = campaignCreativeAtom.init.creativeType !== "POP_UNDER" ? (campaignCreativeAtom.init.creativeType !== 'BANNER' ? 'NATIVE' : 'FIX') : 'POP_UNDER'
      let name = campaignBasicInfo.productType !== 'BANNER' ? '_PU_' : '_BA_'
      setCampaignCreative({
        ...campaignCreativeAtom.init,
        name: creativeType+name+time,
        creativeType: campaignBasicInfo.productType
      })
      setValue('name', creativeType+name+time)
    }
    selEnumInfo('BANNER_SIZE').then(response => {
      setBannerSize(response.data)
    })
    selEnumInfo('CLICK_INDUCEMENT_TYPE').then(response => {
      setClickInducementType(response.data)
    })

    if ((resistBool && campaignBasicInfo.productType ==='BANNER')|| (state !==null && state.productType==='BANNER')) {
      selEnumInfo('CREATIVE_TYPE_BANNER').then(response => {
        setCreativeType(response.data)
      })
    } else {
      selEnumInfo('CREATIVE_TYPE_POP_UNDER').then(response => {
        setCreativeType(response.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const selCreativeGroup = (selectedCreateType) => {
    let time = dateFormat(toDay(), 'YYMMDDHHmm');
    let creativeType = selectedCreateType !== "POP_UNDER" ? (selectedCreateType !== 'BANNER' ? 'NATIVE' : 'FIX') : 'POP_UNDER'
    let name = campaignBasicInfo.productType !== 'BANNER' ? '_PU_' : '_BA_'
    setCampaignCreative({
      ...campaignCreativeInfo,
      creativeType: selectedCreateType,
      name: creativeType+name+time
    })
    setValue('name', creativeType+name+time)
  }
  const handleChangeInputs = (e) => {
    setCampaignCreative({
      ...campaignCreativeInfo,
      [e.target.name]: e.target.value
    })
  }

  const onImageError = (errors, type) => {
    if (errors.maxFileSize) {
      toast.warning('저장 가능한 이미지 사이즈는 '+ (type ==='logo'?'1MB':'10MB')+'입니다.')
    } else if (errors.maxNumber) {
      toast.warning('이미지는 5개 까지만 등록 가능합니다.')
    } else if (errors.acceptType) {
      toast.warning('"jpg", "gif", "png"의 형식만 등록 가능합니다.')
    }
  }

  const onSubmitToast = (response) => {
    if(response[0]) {
      if (state !== null) {
        toast.success("수정되었습니다.",{autoClose:100, delay:0})
        toast.onChange(payload => {
          if (payload.status === "removed" && payload.type === toast.TYPE.SUCCESS) {
            navigate('/board/dashboard')
            resetInfo()
          }
        })
      } else {
        setStepCampaign({steps: 4})
      }
    } else state !== null ? toast.error('수정이 실패하였습니다.') : toast.error('등록이 실패하였습니다.')
  }
  const onSubmit = () => {
    const materialsImages = campaignCreativeInfo.materials.find(obj => obj.images.length === 0) ? true : false;

    if(campaignCreativeInfo.creativeType === 'BANNER' && ((campaignCreativeInfo.materials.length !== 0 && materialsImages) || campaignCreativeInfo.materials.length === 0)) {// 고정 배너 체크

      setError('materials', { type: 'required', message: campaignCreativeInfo.materials.length !== 0 ? '사이즈별 소재는 최소 1개 이상 등록해 주세요.' : '광고 소재를 등록해 주세요.'})

    } else if (campaignCreativeInfo.creativeType === 'NATIVE' && campaignCreativeInfo.nativeMaterials.length === 0) { // 네이티브 배너 체크
      setError('nativeMaterials', { type: 'required', message: '광고 소재를 등록해 주세요.' })
    } else {
      let param = {
        ...campaignCreativeInfo,
        campaignId: campaignBasicInfo.campaignId,
        name: campaignCreativeInfo.name
      };
      console.log(param)
      let updateFunc;
      switch(campaignCreativeInfo.creativeType){
        case "BANNER": updateFunc = updateCampaignBanner(param); break;
        case "NATIVE": updateFunc = updateCampaignNative(param); break;
        case "POP_UNDER": updateFunc = updateCampaignPopUnder(param); break;
        default : updateFunc = updateCampaignBanner(param);break;
      }
      multiAxiosCall([updateFunc], onSubmitToast)
    }
  }
  const onError = (e) => {console.log(e)}
  const params = useParams()
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {campaignCreativeInfo !== null &&
        <>
          {(params.id !== "manageCreativeDetail" && state !== null) && <AdverInfo><span>광고주 정보</span><p></p><span>{state?.adverInfo}</span></AdverInfo>}
          <Board>
            <BoardHeader>크리에이티브 그룹 설정</BoardHeader>
            <BoardSearchResult>
              <Span4>크리에이티브 그룹 선택</Span4>
              <RowSpan box={true} column={false}>
                {creativeType !== null && ((resistBool && campaignBasicInfo.productType==='BANNER')|| (state !==null && state.productType==='BANNER')) &&
                  <ColSpan1 padding={'0'}>
                    <CampaignButton type={'button'}
                                    onClick={() => selCreativeGroup('BANNER')}
                                    className={campaignCreativeInfo.creativeType === 'BANNER' ? 'on' : null}
                    >
                      {creativeType.find(value => value.value === 'BANNER')?.label}
                    </CampaignButton>
                    <CampaignButton type={'button'}
                                    onClick={() => selCreativeGroup('NATIVE')}
                                    className={campaignCreativeInfo.creativeType === 'NATIVE' ? 'on' : null}
                    >
                      {creativeType.find(value => value.value === 'NATIVE')?.label}
                    </CampaignButton>
                  </ColSpan1>
                }
                {creativeType !== null && campaignBasicInfo.productType ==='POP_UNDER' &&
                  <ColSpan1 padding={'0'}>
                    <CampaignButton type={'button'}
                                    className={'on'}
                    >
                      {creativeType.find(value => value.value === 'POP_UNDER')?.label}
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
              {campaignCreativeInfo.creativeType === 'BANNER' && ((resistBool && campaignBasicInfo.productType==='BANNER') || (state !== null && state.productType==='BANNER')) &&
                <CampaignFourBanner control={control} errors={errors} setError={setError} register={register} onImageError={onImageError} />
              }
              {campaignCreativeInfo.creativeType === 'NATIVE' && ((resistBool && campaignBasicInfo.productType==='BANNER') || (state !== null && state.productType==='BANNER')) &&
                <CampaignFourNative control={control} errors={errors} setError={setError} register={register} onImageError={onImageError}/>
              }

            </BoardSearchResult>
          </Board>
        </>
      }
      <SubmitContainer>
        <CancelButton type={'button'} onClick={() => state !== null ? window.history.back() : setStepCampaign({steps: 2})}>{state !== null ? '목록' : '이전'}</CancelButton>
        <SubmitButton type={'submit'}>{state !== null ? '수정' : '저장'}</SubmitButton>
      </SubmitContainer>
    </form>
  )
}