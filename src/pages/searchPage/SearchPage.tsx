import { getMethod } from '@/shared/api/RequestMethod';
import { AllNotice } from '@/entities/Post/types';
import NoticeList from '@/entities/Notice/NoticeList';
import getSearchList from './getSearchList.ts';
// result.items.item.shop.item.name
const SearchPage = async ({ keyword }: { keyword: string }) => {
  const noticeItemList = await getMethod<AllNotice>(
    'https://bootcamp-api.codeit.kr/api/3-2/the-julge/notices',
  );
  const searchResult = getSearchList(noticeItemList.items, keyword);
  return (
    <div className='flex flex-col items-center justify-center'>
      <NoticeList
        noticeItemList={searchResult}
        category='search'
        searchValue={keyword}
      />
    </div>
  );
};

export default SearchPage;
