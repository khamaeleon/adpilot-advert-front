import {atom} from "jotai/index";

export const proceedsAtom = atom({
  todayAmount: 1000000,
  yesterdayAmount: 9000000,
  last7daysAmount: 1000000,
  thisMonthAmount: 1000000,
})

export const thisMonthAtom = atom({
  requestCount: 10000,
  exposureCount: 10000,
  clickCount: 10000,
})

export const lastMonthAtom = atom({
  proceedsAmount: 10000,
  requestCount: 100000,
  exposureCount: 10000,
  clickCount: 1000
})

export const proceedShareAtom = atom([])

export const proceedPeriodAtom = atom([])