import React from "react";
import { motion } from "framer-motion";
import NiceClose from "./NiceClose";
import PropTypes from "prop-types";

const NiceModal = ({ show = false, title = "", body, footer, closeModal = null }) => {

    return (
        show && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-bodyOverlayBg bg-opacity-70" style={{ zIndex: 99999 }}
        >
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-modalBg w-full max-w-md max-h-full rounded-lg shadow-lg m-4"
            >
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-modelBorder">
                    <h3 className="text-lg text-modalTitleText">
                        {title}
                    </h3>
                    {closeModal && <NiceClose onClick={closeModal} />}
                </div>
                <div className='p-4 text-modalBodyText'>
                    {body}
                    {
                        footer && <div className="flex justify-end mt-4">
                            {footer}
                        </div>
                    }
                </div>
            </motion.div>
        </motion.div>
    )
}

NiceModal.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.node,
    footer: PropTypes.node,
    closeModal: PropTypes.func
}

const MemoizedComponent = React.memo(NiceModal);
export default MemoizedComponent;