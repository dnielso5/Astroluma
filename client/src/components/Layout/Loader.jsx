import React from 'react';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../atoms';
import { motion, AnimatePresence } from 'framer-motion';
import NiceLoader from '../NiceViews/NiceLoader';
import PropTypes from 'prop-types';

const Loader = ({ children }) => {
    const loading = useRecoilValue(loadingState);

    return (
        <>
            {children}
            {
                loading && (
                    <AnimatePresence>
                        <motion.div
                            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-bodyOverlayBg bg-opacity-70 z-999999"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <div className="loader-overlay">
                                <NiceLoader className='text-loaderColor' />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </>
    );
};


Loader.propTypes = {
    children: PropTypes.node
};

const MemoizedComponent = React.memo(Loader);
export default MemoizedComponent;

