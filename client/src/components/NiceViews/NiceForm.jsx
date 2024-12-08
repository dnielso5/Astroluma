import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const NiceForm = ({ onSubmit, children }) => {
    const containerRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;
            if (containerRef.current?.contains(activeElement)) {
                onSubmit();
            }
        }
    };

    return (
        <div role="button" ref={containerRef} onKeyDown={handleKeyDown}>
            {children}
        </div>
    );
};

NiceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const MemoizedComponent = React.memo(NiceForm);
export default MemoizedComponent;
