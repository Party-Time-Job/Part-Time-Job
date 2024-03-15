import { Dispatch, SetStateAction } from 'react';
import { FilterForm } from '@/entities/Notice/NoticeList';
import { Notice } from '@/entities/Post/types';

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const filterNotice = (
  noticeItemList: Notice[],
  filterCondition: FilterForm,
  setItemList: Dispatch<SetStateAction<Notice[]>>,
) => {
  const addressCondition = filterCondition.address;
  const dateCondition = filterCondition.date || '';
  const payCondition = filterCondition.pay
    ? parseInt(filterCondition.pay, 10)
    : undefined;

  if (addressCondition?.length === 0 && !dateCondition && !payCondition) {
    setItemList(noticeItemList);
    return;
  }

  const filteredNotice = noticeItemList.filter(notice => {
    let addressMatch = true; // 초기값을 true로 설정

    if (addressCondition && addressCondition.length > 0) {
      addressMatch = addressCondition.includes(notice.item.shop.item.address1);
    }

    const dateMatch =
      !dateCondition || dateCondition === formatDate(notice.item.startsAt);

    const payMatch =
      payCondition === undefined || payCondition <= notice.item.hourlyPay;

    return addressMatch && dateMatch && payMatch;
  });

  setItemList(filteredNotice);
};

export default filterNotice;
