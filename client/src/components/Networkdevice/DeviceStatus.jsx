import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DeviceStatus = ({ status, instantFetch, loading, motionId }) => {
    // Determine the color based on the status prop
    let colorClass = status ? 'bg-green-500' : 'bg-red-500';

    if (loading) {
        colorClass = 'fadeYellowAmber';
    }

    return (
        <motion.div
            layoutId={motionId}
            onClick={(e) => instantFetch(e)}
            className={`w-4 h-4 rounded-full ${colorClass}`} />

    );
};

DeviceStatus.propTypes = {
    status: PropTypes.bool.isRequired,
    instantFetch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    motionId: PropTypes.string
}

const MemoizedComponent = React.memo(DeviceStatus);
export default MemoizedComponent;