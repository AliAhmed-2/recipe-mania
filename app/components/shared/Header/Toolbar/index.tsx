import { Link, useNavigate } from '@remix-run/react';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '~/components';
import { User } from '~/interfaces';
import { CgProfile } from 'react-icons/cg';

import { RiLogoutCircleLine } from 'react-icons/ri';
import { useRef, useState } from 'react';

export const Toolbar = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const onLogout = () => {
    formRef.current?.submit();
  };

  if (user) {
    return (
      <div
        data-testid="user-profile"
        className="flex-center relative gap-2"
        onClick={() => setMenuOpened(!menuOpened)}
      >
        <div className="cursor-pointer rounded-full border-2 border-primary-500 p-1">
          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <img
              src="/images/default-profile-pic.png"
              alt=""
              className="absolute left-0 top-0 bg-cover"
            />
          </div>
        </div>
        <div className="flex-center cursor-pointer gap-4">
          <div className="flex flex-col">
            <p className="text-sm font-medium opacity-75">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-[#9E634E] opacity-60">Recipier</p>
          </div>
          <IoIosArrowDown
            color="#9E634E"
            className={`transition duration-300 ${menuOpened ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>

        {/* Profile Dropdown */}
        {menuOpened ? (
          <div
            data-testid="profile-dropdown"
            className="absolute -bottom-24 z-50 mx-4 ml-12 w-full border border-primary-200 bg-white px-1 py-1 shadow-lg"
          >
            <ul className="flex flex-col gap-1">
              <Link
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm hover:bg-primary-50"
                to={'/profile'}
                prefetch="render"
              >
                <CgProfile
                  fontSize={16}
                  opacity={0.8}
                />
                Profile
              </Link>
              {/* Separator */}
              <div className="h-[1px] w-full bg-primary-300"></div>
              <form
                className="w-full"
                method="post"
                action="/actions/logout"
                ref={formRef}
              >
                <button
                  className="flex w-full cursor-pointer items-center gap-2 px-2 py-2 text-sm hover:bg-primary-50"
                  onClick={onLogout}
                >
                  <RiLogoutCircleLine
                    fontSize={16}
                    opacity={0.8}
                  />
                  Logout
                </button>
              </form>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Button
        type="secondary"
        buttonText={'Login'}
        onClick={() => navigate('/login')}
      />
      <Button
        type="primary"
        buttonText={'Signup'}
        onClick={() => navigate('/signup')}
      />
    </div>
  );
};
