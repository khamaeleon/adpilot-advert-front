
import {Link} from "react-router-dom";
import React from "react";
import {
  Icon,
  SwitchComponent
} from "../../components/table";
import {atom} from "jotai/index";
import {
  convertInventoryExamination,
  convertInventoryPublish
} from "../../services/InventoryAxios";
import SelectBox from "../../components/common/SelectBox";

export const mediaResistInfo = {
  siteName: '',
  inventoryName: '',
  mediaUrl: '',
  deviceType: '',
  category1: {
    key: "",
    value: "",
    label: ""
  },
  category2: {
    key: "",
    value: "",
    label: "",
    mediaCategory1: {
      key: "",
      value: "",
      label: ""
    },
  },
  description: '',
  agentTypes: [],
  id: '',
  productType: {id: "", value: "", label: ""},
  exposedMinuteLimit: '',
  bannerSize: {key:'', value:'', label:''},
  calculationId: '',
  calculationEtc: '',
  calculationType: '',
  calculationValue: 0,
  contractStartDate: new Date(),
  noExposedConfigType: "",
  noExposedConfigValue: '',
  allowEvents: [],
  inventoryType:{id: '', value: '', label: '', productType: {id: "", value: "", label: ""}},
  examinationStatus: "CONFIRMING"
}

export const mediaSearchInfo = []

export const mediaCategoryOneDepthInfo = []

export const adPreviewSize = []

export const inventoryType = []
export const exposedLimitType = [
  {value: -1, label: '무제한'},
  {value: 1, label: '1분'},
  {value: 5, label: '5분'},
  {value: 10, label: '10분'},
  {value: 15, label: '15분'},
]
export const calculationAllType = [
  {id: "0", value: "ALL", label: "전체"},
  {id: "1", value: "CPC", label: "CPC"},
  {id: "2", value: "CPM", label: "CPM"},
  {id: "3", value: "RS", label: "RS"},
  {id: "4", value: "GT", label: "GT"}
]

export const columnData = [

  {
    name: 'id',
    header: 'ID',
    defaultVisible: false
  },
  {
    name: 'publish',
    header: '게재 상태',
    width: 90,
    showColumnMenuTool: false, // 설정메뉴표시
    sortable: false,
    render: ({value, cellProps}) => {
      return (
          <SwitchComponent value={value} cellProps={cellProps} eventClick={()=>convertInventoryPublish(cellProps.data.inventoryId, !value)}/>
      );
    }
  },
  {
    name: 'siteName',
    header: '매체명',
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '아이디',
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 220, //가변 사이즈
    resizeable: true, //리사이징
    textEllipsis: false, // ... 표시
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return(
          <Link to={"/board/media2/detail"} state={cellProps.data.inventoryId}>{value}</Link>
      )
    }
  },
  {
    name: 'inventoryId',
    header: '지면 코드',
    textAlign: 'center',
    width: 80,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'productType',
    header: '광고 상품',
    textAlign: 'center',
    width: 100,
    resizeable: false,
    sortable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return productTypeInfo.find(type => type.value === value.value).label;
    }
  },
  {
    name: 'deviceType',
    header: '디바이스',
    textAlign: 'center',
    defaultWidth: 100,
    showColumnMenuTool: false,
    render: ({value}) => {
      return deviceTypeInfo.find(type => type.value === value).label;
    }
  },
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value}) => {
      return value!= null ? value.value.replace('IMG','') : '' ;
    }
  },
  {
    name: 'calculation',
    header: '정산 방식',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ( { value, cellProps } ) => {
      return value.calculationType + "("+cellProps.data.calculation.calculationValue+")"
    }
  },
  {
    name: 'siteUrl',
    header: '사이트',
    textAlign: 'center',
    defaultWidth: 100,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <Icon icon={'url'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'script',
    header: '스크립트',
    textAlign: 'center',
    defaultWidth: 100,
    render: ({value, cellProps}) => {
      return <Icon icon={'script'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'examinationStatus',
    header: '심사상태',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({ value, cellProps }) => {
      return <SelectBox options={confirmAllType} value={value} onSelect={(item)=>convertInventoryExamination(cellProps.data.inventoryId, item)} cellProps={cellProps}/>
    }
  }
]


export const mediaSearchResult = atom([]);

export const mediaAcceptYn = [
  {id: "1", value: "on", label: "게재중"},
  {id: "2", value: "off", label: "중지"},
]

export const productTypeInfo = [
  {id:"0", value: "ALL", label: "전체"},
  {id:'1', value: 'BANNER', label: '배너'},
  {id:'2', value: 'POP_UNDER', label: '팝언더'}
]

export const deviceTypeInfo = [
  {id:"0", value: "ALL", label: "전체"},
  {id:'1', value: 'PC', label: 'PC'},
  {id:'2', value: 'MOBILE', label: 'MOBILE'},
  {id:'3', value: 'RESPONSIVE_WEB', label: '반응형웹'}
]

export const searchMediaTypeAll = [
  {id:"0", value: "ALL", label: "전체"},
  {id:"1", value: "SITE_NAME", label:"매체명"},
  {id:"2", value: "USER_ID", label:"아이디"},
  {id:"3", value: "INVENTORY_NAME", label:"지면명"},
  {id:"4", value: "INVENTORY_ID", label:"지면코드"},
]

export const searchInfo = {
  searchKeywordType: {id: "", value: "", label: ""},
  keyword: '',
  calculationType: {id: "", value: "", label: ""},
  agentTypes: [],
  deviceType: {id:"", value: "", label:""},
  productType: {id:"", value: "", label:""}
}

export const confirmAllType = [
  {value: 'CONFIRMING', label: '심사 중'},
  {value: 'APPROVED', label: '심사 승인'},
  {value: 'REJECTED', label: '심사 반려'}
]

export const agentTypeInfo = [
  {id:"1", value: "WEB", label: "PC 웹"},
  {id:"2", value: "WEB_APP", label: "PC 어플리케이션"},
  {id:"3", value: "MOBILE_WEB", label: "모바일 웹"},
  {id:"4", value: "MOBILE_NATIVE_APP", label: "모바일 어플리케이션"}
]

