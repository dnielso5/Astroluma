import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '/avatar.png';
import { FaChevronRight } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { IoSettingsSharp } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import { colorThemeState, loginState, userDataState } from '../../atoms';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userData = useRecoilValue(userDataState);
    const setLoginState = useSetRecoilState(loginState);
    const navigate = useNavigate();

    const setColorTheme = useSetRecoilState(colorThemeState);

    const doLogout = (e) => {
        setDropdownOpen(false);
        e.preventDefault();
        setLoginState(null);
        setColorTheme("dark");
        window.location.reload();
    }

    const goToSettings = () => {
        setDropdownOpen(false);
        navigate("/manage");
    }

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <Link
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                to="#"
            >
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-headerText">
                        {userData?.fullName}
                    </span>
                    <span className="block text-xs">{userData?.username}</span>
                </span>

                <span className="h-12 w-12 rounded-full">
                    <img src={UserOne} alt="User" />
                </span>

                <FaChevronRight />

            </Link>

            {dropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-b-lg bg-headerBg shadow-default"
                >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5">

                        <motion.li
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div
                                role="button"
                                onClick={goToSettings}
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base cursor-pointer text-headerText hover:text-headerHoverText"
                            >
                                <IoSettingsSharp />
                                Settings
                            </div>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div
                                role="button"
                                onClick={doLogout}
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base cursor-pointer text-headerText hover:text-headerHoverText"
                            >
                                <RiLogoutCircleLine />
                                Logout
                            </div>
                        </motion.li>
                    </ul>
                </motion.div>
            )}
        </ClickOutside>
    );
};


const MemoizedComponent = React.memo(DropdownUser);
export default MemoizedComponent;
