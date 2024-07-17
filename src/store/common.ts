import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CommonState = {
  recentSearchKeywordList: string[];
};

const initialState: CommonState = {
  recentSearchKeywordList: [],
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
  set(initialState);
};

export const commonActions = {
  addRecentSearchKeyword,
  deleteRecentSearchKeyword,
  deleteRecentSearchKeywordAll,
};

export const useCommonStore = create(
  persist(() => initialState, {
    name: 'OJAJAE/COMMON',
    storage: createJSONStorage(() => localStorage),
  }),
);

const set = useCommonStore.setState;
const get = useCommonStore.getState;
