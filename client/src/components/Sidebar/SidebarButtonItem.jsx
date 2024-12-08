import React from 'react';
import PropTypes from 'prop-types';

const SidebarButtonItem = React.memo(({ icon, text, clickHandler, active, id }) => {
  return (
    <li>
      <div
        role="button"
        onClick={clickHandler}
        id={id}
        className={`cursor-pointer text-sm group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out rounded-full ${active ? 'text-sidebarItemSelectedText bg-sidebarItemSelectedBg hover:text-sidebarItemSelectedHoverText hover:bg-sidebarItemSelectedHoverBg' : 'bg-sidebarItemUnSelectedBg hover:bg-sidebarItemHoverBg text-sidebarItemUnSelectedText hover:text-sidebarItemHoverText'
          }`}>
        {icon}
        {text}
      </div>
    </li>
  );
});

SidebarButtonItem.displayName = 'SidebarButtonItem';

SidebarButtonItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  clickHandler: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.string
};

export default SidebarButtonItem;