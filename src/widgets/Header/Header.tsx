const Header = () => {
  return (
    <header className='fixed flex h-24 w-full items-center justify-center bg-white md:h-16'>
      <div className='fixed flex justify-between md:w-[744px] md:px-9 lg:w-[1440px] lg:px-56'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center lg:gap-10'>
          <div className='flex justify-between'>
            <h5>로고입니다</h5>
            <div className='flex items-center gap-3 md:hidden lg:gap-10'>
              <h5>로그인</h5>
              <h5>회원가입</h5>
              <div>알림아이콘</div>
            </div>
          </div>
          <input
            placeholder='가게 이름으로 찾아보세요'
            className='h-10 w-[344px] rounded-md bg-gray-300 p-2 lg:w-[450px]'
          />
        </div>
        <div className='hidden items-center gap-3 md:flex lg:gap-10'>
          <h5>로그인</h5>
          <h5>회원가입</h5>
          <div>알림아이콘</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
