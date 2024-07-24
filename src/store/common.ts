import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SortType = 'newest' | 'nearest';
export type CommonState = {
  recentSearchKeywordList: string[];
  address: string;
  sort: SortType;
};

const initialState: CommonState = {
  recentSearchKeywordList: [],
  address: '서울시 중구 세종대로 110',
  sort: 'newest',
};

const addRecentSearchKeyword = (keyword: string) => {
  const status = get();
  const recentSearchKeywordList = [keyword, ...status.recentSearchKeywordList];
  set({ ...status, recentSearchKeywordList });
};

const deleteRecentSearchKeyword = (keywordIdx: number) => {
  const status = get();
  const recentSearchKeywordList = [...status.recentSearchKeywordList];
  recentSearchKeywordList.splice(keywordIdx, 1);
  set({ ...status, recentSearchKeywordList });
};

const deleteRecentSearchKeywordAll = () => {
  const status = get();
  set({ ...status, recentSearchKeywordList: initialState.recentSearchKeywordList });
};

const setAddress = (address: string) => {
  const status = get();
  set({ ...status, address });
};

const resetAddress = () => {
  const status = get();
  set({ ...status, address: initialState.address });
};

const setSort = (sort: SortType) => {
  const status = get();
  set({ ...status, sort });
};

export const commonActions = {
  addRecentSearchKeyword,
  deleteRecentSearchKeyword,
  deleteRecentSearchKeywordAll,
  setAddress,
  resetAddress,
  setSort,
};

export const useCommonStore = create(
  persist(() => initialState, {
    name: 'OJAJAE/COMMON',
    storage: createJSONStorage(() => localStorage),
  }),
);

const set = useCommonStore.setState;
const get = useCommonStore.getState;
