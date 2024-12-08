import React from 'react';
import PropTypes from 'prop-types';

const SelectList = ({listItems, selected, onChange}) => {
    return (
        <select 
            value={selected} 
            onChange={onChange} 
            className="cursor-pointer border text-xs bg-inputBg border-inputBorder text-inputText rounded-full py-2 px-4 pl-4 focus:outline-none w-full md:w-auto"
        >
            {listItems.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

SelectList.propTypes = {
    listItems: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const MemoizedComponent = React.memo(SelectList);
export default MemoizedComponent;
