'use client';

import { FieldValues, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShopItem } from './Type.ts';
import Title from '@/shared/ui/Title';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Text from '@/shared/ui/Text';
import ADDRESS from '@/shared/constants/Address';
import CLASSIFICATION from '@/shared/constants/Classification';

const baseUrl = 'https://bootcamp-api.codeit.kr/api/3-2/the-julge';

interface EmptyProps {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: string;
  imageUrl: string;
  description: string;
}
interface CreateShopProps {
  initialValues: ShopItem | EmptyProps;
  shopId: string | null;
}

const CreateShop = ({ initialValues, shopId }: CreateShopProps) => {
  const {
    register,
    handleSubmit,
    reset,
    // getValues,
    formState: { isSubmitting, errors },
  } = useForm<FieldValues>({
    defaultValues: initialValues,
  });
  let uploadImage;
  const router = useRouter();
  // const reader = new FileReader();
  // imageRef.current = file;
  // reader.onload = (e: ProgressEvent<FileReader>) => {
  //   if (e.target?.result) {
  //     setImageUrl(e.target.result.toString());
  //   }
  // };
  // reader.readAsDataURL(file);
  // const handleChange = () => {
  //   const { imageUrl } = getValues();
  //   console.log(imageUrl[0].name);
  //   uploadImage = imageUrl[0].name;
  // };
  const url = shopId ? `${baseUrl}/shops/${shopId}` : `${baseUrl}/shops`;
  const method = shopId ? 'PUT' : 'POST';
  const requestInfo = async (data: FieldValues): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          ...data,
          imageUrl: data.imageUrl[0].name,
        }),
      });
      if (response.status === 200) {
        router.push('/shop/details');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reset(initialValues);
  }, []);
  return (
    <div className='flex flex-col items-center gap-2 px-[238px] py-[60px]'>
      <div className='flex flex-col items-center gap-8'>
        <div className='flex w-[964px] items-center justify-between'>
          <Title title='가게정보'>
            <div></div>
          </Title>
          <Image src={'/close-white.svg'} alt='close' width={32} height={32} />
        </div>
        {/* 여기서부터 폼 태그 */}
        <form
          onSubmit={handleSubmit(data => requestInfo(data))}
          // onSubmit={handleSubmit(data =>
          //   console.log({
          //     ...data,
          //     imageUrl: data.imageUrl[0].name,
          //   }),
          // )}
          className='flex w-[964px] flex-col gap-6'
        >
          <div className='flex w-[964px] items-start gap-5'>
            {/* 가게 이름 */}
            <div className='flex w-[472px] flex-shrink-0 flex-col items-start gap-2'>
              <label htmlFor='name'>가게 이름</label>
              <Input
                width='w-[100%]'
                className='border-[#CBC9CF)] border'
                id='name'
                type='text'
                placeholder='입력'
                {...register('name', {
                  required: '가게 이름 입력은 필수 입니다.',
                })}
              />
              {errors.name && <span>{errors.name.message?.toString()}</span>}
            </div>
            {/* 분류 */}
            <div className='flex w-[472px] flex-shrink-0 flex-col items-start gap-2'>
              <label htmlFor='category'>분류</label>
              <div className='relative w-[100%]'>
                <select
                  className='flex w-[100%] appearance-none items-start gap-2 self-stretch rounded-md bg-test-black bg-right bg-no-repeat px-4 py-5 pl-3 pr-10 text-white'
                  {...register('category')}
                >
                  {CLASSIFICATION.map(item => (
                    <option key={item.key}>{item.value}</option>
                  ))}
                </select>
                <svg
                  className='pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              {errors.category && (
                <span>{errors.category.message?.toString()}</span>
              )}
            </div>
          </div>
          <div className='flex w-[964px] items-start gap-5'>
            {/* 주소 */}
            <div className='flex w-[472px] flex-shrink-0 flex-col items-start gap-2'>
              <label htmlFor='address1'>주소</label>
              <div className='relative w-[100%]'>
                <select
                  className='flex w-[100%] appearance-none items-start gap-2 self-stretch rounded-md bg-test-black bg-right bg-no-repeat px-4 py-5 pl-3 pr-10 text-white'
                  {...register('address1')}
                >
                  {ADDRESS.map(item => (
                    <option key={item.key}>{item.value}</option>
                  ))}
                </select>
                <svg
                  className='pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              {errors.address1 && (
                <span>{errors.address1.message?.toString()}</span>
              )}
            </div>
            {/* 상세 주소 */}
            <div className='flex w-[472px] flex-shrink-0 flex-col items-start gap-2'>
              <label htmlFor='address2'>상세 주소</label>
              <Input
                width='w-full'
                id='address2'
                type='text'
                placeholder='입력'
                {...register('address2', {
                  required: '상세 주소는 필수 입력입니다.',
                })}
              />
              {errors.address2 && (
                <span>{errors.address2.message?.toString()}</span>
              )}
            </div>
          </div>
          {/* 시급 작성  */}
          <div className='flex w-[472px] flex-shrink-0 flex-col items-start gap-2'>
            <label htmlFor='originalHourlyPay'>기본 시급</label>
            <Input
              width='w-full'
              id='originalHourlyPay'
              type='text'
              {...register('originalHourlyPay', {
                required: '시급을 입력해주세요.',
              })}
            />
            {errors.originalHourlyPay && (
              <span>{errors.originalHourlyPay.message?.toString()}</span>
            )}
          </div>
          {/* 가게 이미지 추가하기  */}
          <div className='flex h-[400px] w-[472px] flex-col items-start gap-2'>
            <div>가게 이미지</div>
            <div className='h-full w-full'>
              <label htmlFor='imageUrl'>
                <div className='flex h-full flex-col items-center justify-center bg-test-black'>
                  <div className='flex w-full flex-col justify-center'>
                    <div className='mx-auto'>
                      <Input
                        type='image'
                        src={uploadImage || '/camera.svg'}
                        alt='camera'
                        className='fill'
                      />
                    </div>
                    <Text
                      as='p'
                      className='text-center font-bold leading-5 text-[#A4A1AA]'
                    >
                      이미지 추가하기
                    </Text>
                  </div>
                </div>
              </label>
            </div>
            <Input
              className='w-[100%]'
              id='imageUrl'
              type='file'
              {...register('imageUrl', {
                required: '이미지를 추가해주세요.',
              })}
              // onChange={handleChange}
            />
            {errors.imageUrl && (
              <span>{errors.imageUrl.message?.toString()}</span>
            )}
          </div>
          {/* 가게 상세 설명 작성 */}
          <div className='flex w-[964px] flex-col items-start gap-2'>
            <label htmlFor='description'>가게 설명</label>
            <textarea
              id='description'
              className='w-full place-content-center bg-test-black p-2.5'
              placeholder='입력'
              rows={8}
              cols={30}
              {...register('description', {
                required: '가게 이름 입력은 필수 입니다.',
              })}
            />
          </div>
          <div className='mx-auto my-0'>
            <Button
              size='medium'
              status={isSubmitting ? 'inactive' : 'active'}
              text={shopId ? '정보 수정하기' : '가게 등록하기'}
              disabled={isSubmitting}
              type='submit'
            />
            {initialValues && (
              <Button
                size='medium'
                status={isSubmitting ? 'inactive' : 'active'}
                text='취소하기'
                disabled={isSubmitting}
                type='button'
                onClick={() => router.push('/shop/details')}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
