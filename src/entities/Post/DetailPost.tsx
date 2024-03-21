'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import formatDateTime from '@/entities/Post/utils/formatDateTime';
import addWorkHours from '@/entities/Post/utils/getFinishTime';
import { Notice, User } from './types.ts';
import saveSeenNotice from '../Notice/utils/saveSeenNotice.ts';
import formatHourlyPay from './utils/formatHourlyPay.ts';
import Modal from '@/features/Modal/Modal.tsx';
import ClosedNoticeImage from '@/shared/ui/ClosedNoticeImage.tsx';

interface Props {
  notice: Notice;
  userInfo: User | undefined;
  shopId: string;
  noticeId: string;
  isApplied: boolean;
  token: string;
  applicationId: string;
  isOutDatedNotice: boolean;
}

const DetailPost = ({
  notice,
  userInfo,
  shopId,
  noticeId,
  isApplied,
  token,
  applicationId,
  isOutDatedNotice,
}: Props) => {
  const userType = userInfo?.item.type;
  const disableButton =
    userType === 'employer' || isOutDatedNotice
      ? 'opacity-50 cursor-not-allowed bg-[#A4A1AA]'
      : '';

  const [isToggle, setIsToggle] = useState(false);
  const [modalCategory, setModalCategory] = useState('');

  const handleToggle = () => {
    setIsToggle(prev => !prev);
  };

  const handleCancelToggle = () => {
    setModalCategory('cancel');
    setIsToggle(prev => !prev);
  };

  const comparePriceRate = Math.round(
    (notice.item.hourlyPay / notice.item.shop.item.originalHourlyPay) * 100 -
      100,
  );
  const finishTime = addWorkHours(notice.item.startsAt, notice.item.workhour);

  const applyNotice = async () => {
    const response = await fetch(
      `https://bootcamp-api.codeit.kr/api/3-2/the-julge/shops/${shopId}/notices/${noticeId}/applications`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 201) {
      setModalCategory('success');
      setIsToggle(true);
    }
  };

  const cancelNotice = async () => {
    const response = await fetch(
      `https://bootcamp-api.codeit.kr/api/3-2/the-julge/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'canceled' }),
      },
    );

    if (response.status === 200) {
      setModalCategory('canceled');
      setIsToggle(true);
    }
  };

  const handleApplyClick = () => {
    if (!token) {
      setModalCategory('noLogin');
      setIsToggle(true);
      return;
    }

    if (
      !userInfo?.item.address ||
      !userInfo?.item.bio ||
      !userInfo?.item.name ||
      !userInfo?.item.phone
    ) {
      setModalCategory('noProfile');
      setIsToggle(true);
      return;
    }

    applyNotice();
  };

  const cancelClick = () => {
    cancelNotice();
  };

  useEffect(() => {
    document.documentElement.style.scrollbarGutter = 'stable';

    if (isToggle) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isToggle]);

  useEffect(() => {
    saveSeenNotice(notice);
  }, []);

  return (
    <div className='inline-flex flex-col items-start gap-3 rounded-xl border border-solid border-pt-gray20 bg-white p-5 md:gap-5 md:p-[24px] lg:flex-row lg:justify-between'>
      <div className='relative flex h-auto max-h-[250px] w-full items-center justify-center overflow-hidden rounded-[12px] md:max-h-[361px] lg:h-[308px] lg:w-[509px]'>
        {isOutDatedNotice ? <ClosedNoticeImage text='지난 공고' /> : null}
        <Image
          priority
          width={0}
          height={0}
          sizes='100vw'
          src={notice.item.shop.item.imageUrl}
          alt='preview-image'
          className='rounded-xl'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className='flex w-full flex-col items-start gap-6 lg:mt-4 lg:h-[292px] lg:w-[346px] lg:justify-between'>
        <div className='flex flex-col gap-2 md:gap-3'>
          <div className='flex flex-col items-start gap-2'>
            <span className='text-[14px] font-bold text-pt-green30 md:text-[16px]'>
              시급
            </span>
            <div className='flex items-center gap-1 md:gap-2'>
              <span className='text-[24px] font-bold leading-5 md:text-[28px]'>
                {formatHourlyPay(notice.item.hourlyPay)}원
              </span>
              <div className='item-center flex gap-[2px] rounded-[20px] bg-pt-green40 px-2 py-1 md:p-[10px]'>
                <span className='text-[12px] leading-4 text-white md:text-[14px] md:leading-[20px]'>
                  기존 시급보다 {comparePriceRate}%
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  className='h-4 w-4 fill-pt-green40 md:h-5 md:w-5 md:fill-white'
                >
                  <path
                    d='M12.5001 16.6668H7.50013V10.0001H3.4668L10.0001 3.4668L16.5335 10.0001H12.5001V16.6668Z'
                    className='h-4 w-4 fill-white md:h-5 md:w-5'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start gap-2 md:gap-3'>
            <div className='flex items-start gap-1.5 self-stretch  md:items-center'>
              <Image
                src={'/clock-icon.svg'}
                alt='icon'
                width={20}
                height={20}
                className='h-4 w-4 md:h-5 md:w-5'
              />
              <span className='text-xs text-pt-gray40 md:text-[16px] md:leading-[22px]'>
                {formatDateTime(notice.item.startsAt)}~{finishTime} (
                {notice.item.workhour}시간)
              </span>
            </div>
            <div className='flex items-start gap-1.5'>
              <Image
                src={'/location-icon.svg'}
                alt='icon'
                width={20}
                height={20}
                className='h-4 w-4 md:h-5 md:w-5'
              />
              <span className='text-xs text-pt-gray40 md:text-[16px] md:leading-[22px]'>
                {notice.item.shop.item.address1}
              </span>
            </div>
          </div>
          <div className='h-full'>
            <p className='text-[14px] leading-[22px] md:text-[16px] md:leading-[26px]'>
              {notice.item.shop.item.description}
            </p>
          </div>
        </div>
        {isApplied ? (
          <button
            className='flex w-full justify-center self-stretch rounded-[6px] bg-pt-primary py-[10px] text-[14px] text-white md:py-[14px] md:text-[16px] md:leading-[20px]'
            onClick={handleCancelToggle}
          >
            취소하기
          </button>
        ) : (
          <button
            className={`flex w-full justify-center self-stretch rounded-[6px] bg-pt-primary py-[10px] text-[14px] text-white md:py-[14px] md:text-[16px] md:leading-[20px] ${disableButton}`}
            onClick={handleApplyClick}
            disabled={userType === 'employer' || isOutDatedNotice}
          >
            {userType === 'employer' || isOutDatedNotice
              ? '신청 불가'
              : '신청 하기'}
          </button>
        )}
      </div>
      {isToggle ? (
        <Modal
          handleToggle={handleToggle}
          category={modalCategory}
          cancelClick={cancelClick}
        />
      ) : null}
    </div>
  );
};

export default DetailPost;
