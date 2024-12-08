import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ClickOutside = ({
  children,
  exceptionRef,
  onClick,
  className,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside =
          wrapperRef.current?.contains(event.target) ||
          exceptionRef.current === event.target ||
          exceptionRef.current?.contains(event.target);
      } else {
        clickedInside = wrapperRef.current?.contains(event.target);
      }

      if (!clickedInside) {
        if (event.target.id === "btnAuth") {
          event.stopPropagation();
          return;
        }
        onClick();
      }
    };

    document.addEventListener('mousedown', handleClickListener);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={`${className || ''}`}>
      {children}
    </div>
  );
};

ClickOutside.displayName = 'ClickOutside';

ClickOutside.propTypes = {
  children: PropTypes.node.isRequired,
  exceptionRef: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const MemoizedComponent = React.memo(ClickOutside);
export default MemoizedComponent;