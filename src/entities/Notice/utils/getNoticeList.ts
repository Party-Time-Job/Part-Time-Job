import { Dispatch, SetStateAction } from 'react';
import { AllNotice } from '@/entities/Post/types';
import { getMethod } from '@/shared/api/RequestMethod';
import convertDate from '@/features/Sort/utils/convertDate';

const getNoticeList = async (
  setNoticeItemList: Dispatch<SetStateAction<AllNotice>>,
  offsetNumber: number,
  sortCategory: string,
  category?: string,
  searchValue?: string,
  filterCondition?: { address?: string[]; date?: string; pay?: string },
) => {
  let url = `https://bootcamp-api.codeit.kr/api/3-2/the-julge/notices?offset=${offsetNumber}&limit=6`;

  if (category === 'search') {
    url += `&keyword=${searchValue}`;
    const response = await getMethod<AllNotice>(url);
    setNoticeItemList(response);
    return;
  }
  if (category === 'filter') {
    const addressQuery = filterCondition?.address
      ? filterCondition.address
          .map(address => `&address=${encodeURIComponent(address)}`)
          .join('&')
      : '';
    const dateQuery: string = filterCondition?.date
      ? `&startsAtGte=${encodeURIComponent(convertDate(filterCondition.date))}`
      : '';
    url = url + addressQuery + dateQuery;
    if (searchValue) {
      url += `&keyword=${searchValue}`;
    }
    const response = await getMethod<AllNotice>(url);
    setNoticeItemList(response);
    return;
  }

  const response = await getMethod<AllNotice>(`${url}&sort=${sortCategory}`);
  setNoticeItemList(response);
};
export default getNoticeList;
