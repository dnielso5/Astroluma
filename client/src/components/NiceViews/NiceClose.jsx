import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const NiceClose = ({ onClick = null }) => {

    return (
        <motion.div whileHover={{ scale: 1.1 }} style={{ display: 'inline-flex' }}>
            <button onClick={onClick} type="button" className="text-modalCloseButtonColor hover:text-modalCloseButtonHoverColor bg-transparent hover:bg-modalCloseButtonHoverBg rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
        </motion.div>
    )
}

NiceClose.propTypes = {
    onClick: PropTypes.func
}

const MemoizedComponent = React.memo(NiceClose);
export default MemoizedComponent;
