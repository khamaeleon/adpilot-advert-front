import {atom} from "jotai/index";

export const selectedIcon = {
  dashboard: "/assets/images/aside/gmd_menu_01_on@3x.png",
  campaign:'/assets/images/aside/gmd_menu_02_on@3x.png',
  notice:'/assets/images/aside/gmd_menu_03_on@3x.png',
  reports:'/assets/images/aside/gmd_menu_04_on@3x.png',
  settings:'/assets/images/aside/gmd_menu_05_on@3x.png',
  platform:'/assets/images/aside/gmd_menu_06_on@3x.png'
}

const advertiser = '나이키'
export const menuList = [
  {
    name: "dashboard",
    header: "대시보드",
    include: ["dashboard"],
    child: []
  },
  {
    name: "campaign",
    header: "광고관리",
    include: ["campaign", "manageCreative", 'manageCreativeDetail', 'bannerCreative','audioCreative'],
    child:[
      {
        name: "campaign",
        header: "캠페인 생성",
      },
      {
        name: "manageCreative",
        header: "크리에이티브 관리",
        detail: "manageCreativeDetail"
      },
      //{
      //  name: 'bannerCreative',
      //  header: '배너 크리에이터'
      //},
      {
        name: 'audioCreative',
        header: '오디오 크리에이터'
      }
    ]
  },
  {
    name: "reports",
    header: "보고서",
    include: ['reports','customReports'],
    child: [
      {
        name: "reports",
        header: "보고서 생성"
      },
      {
        name: "customReports",
        header: `${advertiser} 일별 보고서`
      }
    ]
  },
  // {
  //   name: "notice",
  //   header: "고객센터",
  //   include: ['notice','noticeDetail','inquiry', 'inquiryDetail'],
  //   child: [
  //     {
  //       name: "notice",
  //       header: "공지사항",
  //       detail: "noticeDetail"
  //     },
  //     {
  //       name: "inquiry",
  //       header: "1:1문의",
  //       detail: 'inquiryDetail'
  //     }
  //   ]
  // },
  {
    name: "settings",
    header: "설정",
    include: ["settings","settingsDetail","budgetEvent","budgetEventDetail","budgetTime","budgetTimeDetail","budgetTimeList"],
    child:[
      {
        name: "settings",
        header: "단가 관리",
        detail: "settingsDetail"
      },
      {
        name: "budgetEvent",
        header: "예산 관리",
        detail: "budgetEventDetail"
      },
      {
        name: "budgetTime",
        header: "시간별 예산 관리",
        detail: "budgetTimeList",
        detail2: "budgetTimeDetail"
      }
    ]
  },
  {
    name: "platform",
    header: "플랫폼 관리",
    include: ["platform",'platformDetail',"categoryManage","productManage",'historyCampaignManage','historyPriceManage','historyEventManage','historyTimeManage','historyCampaignDetail','historyPriceDetail','historyEventDetail','historyTimeDetail','conversionManage','paymentManage','advertisingPayments'],
    child:[
      {
        name: "platform",
        header: "사용자 관리",
        detail: "platformDetail"
      },
      {
        name: "categoryManage",
        header: "광고주 카테고리 관리"
      },
     // {
     //   name: "productManage",
     //   header: "상품 수집 관리"
     // },
    //  {
    //    name: "conversionManage",
    //    header: "전환 관리"
    //  },
     // {
     //   name: "historyCampaignManage",
     //   header: "캠페인 이력 관리",
     //   detail: 'historyCampaignDetail'
     // },
     // {
     //   name: "historyPriceManage",
     //   header: "이벤트 단가 이력 관리",
     //   detail: 'historyPriceDetail'
     // },
     // {
     //   name: "historyEventManage",
     //   header: "이벤트 예산 이력 관리",
     //   detail: 'historyEventDetail'
     // },
     // {
     //   name: "historyTimeManage",
     //   header: "시간별 예산 이력 관리",
     //   detail: 'historyTimeDetail'
     // },
    //  {
    //    name: "paymentManage",
    //    header: "결제 관리"
    //  },
    //  {
    //    name: "advertisingPayments", //Advertising cost payment management
    //    header: "광고비 지급 관리"
    //  }
    ]
  },
]

export const narrowStyle = {
  li: {
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 15
  },
  icon: {
    backgroundImage: "-webkit-image-set(url('/assets/images/logos/logo_w.png') 1x, url('/assets/images/logos/logo_w@2x.png') 2x,url('/assets/images/logos/logo_w@3x.png') 3x)",
    width: 45,
    backgroundPosition: 'center'
  },
  button: {
    transform: "rotate(180deg)"
  }
}
export const widenStyle = {
  li:{
    marginLeft: 0,
    marginRight: 0,
  },
  icon: {
    backgroundImage: "url(/assets/images/logos/logo_inline_w@3x.png)",
    width: 148,
  },
}

export const reportsInfoAtom = atom({id:null, groupBy: null})
