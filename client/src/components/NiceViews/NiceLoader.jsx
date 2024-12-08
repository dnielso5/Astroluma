import React from "react";
import PropTypes from "prop-types";

const NiceLoader = ({className = "text-loaderColor"}) => {

    return (
        <div
            className={`inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] ${className} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role="status">
            <span
                className="sr-only !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    )
}

NiceLoader.propTypes = {
    className: PropTypes.string
}

const MemoizedComponent = React.memo(NiceLoader);
export default MemoizedComponent;