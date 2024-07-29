import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import geocoder from '~/lib/geocoder';

export type SortType = 'newest' | 'nearest';
export interface AddressInfoType {
  address: string;
  lat: number;
  lng: number;
}
export type CommonState = {
  recentSearchKeywordList: string[];
  addressInfo: AddressInfoType;
  sort: SortType;
};

const initialState: CommonState = {
  recentSearchKeywordList: [],
  addressInfo: { address: '서울시 중구 세종대로 110', lat: 37.5665, lng: 126.978 },
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

const setAddress = async (address: string) => {
  const status = get();

  const addressItem = await geocoder(address);

  let addressLat = Number(addressItem.y);
  let addressLng = Number(addressItem.x);

  const addressInfo: CommonState['addressInfo'] = { address, lat: addressLat, lng: addressLng };

  set({ ...status, addressInfo });
};

const resetAddress = () => {
  const status = get();
  set({ ...status, addressInfo: initialState.addressInfo });
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
