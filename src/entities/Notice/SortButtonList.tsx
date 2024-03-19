import SortButton from '@/features/Sort/SortButton';
import { AllNotice } from '../Post/types.ts';

interface Props {
  updateItemList: (sortedList: AllNotice) => void;
  updateSortCategory: (sortCategory: string) => void;
  handleToggleSort: () => void;
  searchValue?: string;
}

/**
 * @param {Object} props - SortButtonList 컴포넌트의 props
 * @param {Function} props.updateItemList - 정렬된 공고 목록을 업데이트하는 콜백함수
 * @param {Function} props.updateSortCategory - 공고 정렬 방식 표기를 업데이트 하는 콜백함수
 * @param {Function} props.handleToggleSort - 공고 정렬 방식 선택 버튼들의 토글 상태를 업데이트 하는 콜백함수
 * @returns 공고 정렬 버튼 리스트
 */
const SortButtonList = ({
  updateItemList,
  updateSortCategory,
  handleToggleSort,
  searchValue,
}: Props) => {
  return (
    <div className='absolute top-10 z-10 flex flex-col items-start gap-[8px] rounded-[6px] border-[1px] border-solid border-pt-gray30 bg-white py-[12px]'>
      <div className='flex flex-col items-center gap-[8px] self-stretch'>
        <SortButton
          sortCategory='time'
          updateItemList={updateItemList}
          updateSortCategory={updateSortCategory}
          handleToggleSort={handleToggleSort}
          searchValue={searchValue}
        />
        <hr className='w-[105px]' />
        <SortButton
          sortCategory='pay'
          updateItemList={updateItemList}
          updateSortCategory={updateSortCategory}
          handleToggleSort={handleToggleSort}
          searchValue={searchValue}
        />
        <hr className='w-[105px]' />
        <SortButton
          sortCategory='hour'
          updateItemList={updateItemList}
          updateSortCategory={updateSortCategory}
          handleToggleSort={handleToggleSort}
          searchValue={searchValue}
        />
        <hr className='w-[105px]' />
        <SortButton
          sortCategory='shop'
          updateItemList={updateItemList}
          updateSortCategory={updateSortCategory}
          handleToggleSort={handleToggleSort}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default SortButtonList;
