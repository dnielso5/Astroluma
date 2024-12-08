import React from 'react';
import { motion } from 'framer-motion';
import ImageView from '../Misc/ImageView'
import PropTypes from 'prop-types';

const SingleInstalledApp = (props) => {

    return (
        <div role="button" className="relative cursor-pointer" onClick={() => props.handleAppRemove(props.app)}>
            <motion.div whileHover={{ scale: 1.03 }} className="relative border-2 border-internalCardBorder bg-internalCardBg text-internalCardText pt-10 pb-10 rounded-xl shadow-md h-80" style={{ overflow: 'hidden' }} >
                <div className='flex items-center justify-center p-8'>
                    <ImageView alt={props.app.integrationName} parent="apps" src={`${props.app.appId}/${props.app.appIcon}`} height="80px" width="80px" defaultSrc="/apps.png" errorSrc="/apps.png" />
                </div>
                <div className='flex items-center justify-center text-center overflow-hidden !min-h-20 !max-h-20'>{props.app.integrationName}</div>
            </motion.div>
        </div>
    );
};

SingleInstalledApp.propTypes = {
    app: PropTypes.object,
    handleAppRemove: PropTypes.func
};

const MemoizedComponent = React.memo(SingleInstalledApp);
export default MemoizedComponent;