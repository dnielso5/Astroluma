import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { IoCheckmarkCircle } from "react-icons/io5";
const SingleThemeItem = ({ theme, onSelect, isCurrentTheme }) => {

  const onThemeSelection = useCallback(() => {
    onSelect(theme);
  }, [onSelect, theme]);

  return (
    <div role="button" className={`${theme.value} relative cursor-pointer`} onClick={onThemeSelection}>
      <motion.div whileHover={{ scale: 1.03 }} className="relative border-2 border-sidebarBg bg-bodyBg text-bodyText rounded-xl shadow-md h-80" style={{ overflow: 'hidden' }}>
        <div className="h-full flex">
          <div className="w-4/12 bg-sidebarBg text-sidebarText" />
          <div className="w-8/12 bg-bodyBg text-bodyText">
            <div className="bg-headerBg text-headerText h-10" />
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
              <div className="border-2 border-itemCardBorder bg-itemCardBg text-itemCardText h-10 rounded-md" />
            </div>
          </div>
        </div>
        {
          isCurrentTheme && <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
            <IoCheckmarkCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Current</span>
          </div>
        }
      </motion.div>
      <div className='flex items-center justify-center text-center overflow-hidden !min-h-20 !max-h-20'>{theme.label}</div>
    </div>
  );
};

SingleThemeItem.displayName = 'SingleThemeItem';

SingleThemeItem.propTypes = {
  theme: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isCurrentTheme: PropTypes.bool.isRequired,
};


const MemoizedComponent = React.memo(SingleThemeItem);
export default MemoizedComponent;
