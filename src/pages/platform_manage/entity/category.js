import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";

export const topLevelCategoryListAtom = atom([])
export const categoryListAtom = atom([])

export const selectCategoryAtom = atom('')
export const createCategoryAtom = atomWithReset({
  category: {
    name: '',
    level: 1,
  },
  subCategory: {
    name: '',
    level: 2,
    parentCode: null
  }
})