import LogoLink from '@/features/LogoLink/LogoLink';
import HeaderNavigation from './ui/HeaderNavigation';
import HeaderInput from './ui/HeaderInput';

const Header = () => {
  return (
    <header className='z-10 h-24 w-full md:h-16'>
      <div className='fixed z-10 flex h-24 w-full items-center justify-center bg-black md:h-16'>
        <div className='fixed z-10 flex items-center justify-between md:w-[800px] md:px-9 lg:w-[1440px] lg:px-56'>
          <div className='flex flex-col gap-2 md:hidden md:flex-row md:items-center'>
            <div className='flex justify-between'>
              <LogoLink />
              <div className='flex items-center gap-5 font-bold md:hidden'>
                <HeaderNavigation />
              </div>
            </div>
            <HeaderInput />
          </div>

          <div className='hidden w-full md:flex md:items-center md:justify-between'>
            <div className='flex'>
              <LogoLink />
            </div>
            <div className='flex'>
              <HeaderInput />
            </div>
            <div className='hidden items-center gap-3 font-bold md:flex md:gap-10 lg:gap-10'>
              <HeaderNavigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
