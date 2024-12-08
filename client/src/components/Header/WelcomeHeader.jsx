import React from 'react';
import WelcomeUser from '../Misc/WelcomeUser';
import WeatherWidget from './WeatherWidget';
import PropTypes from 'prop-types';

const WelcomeHeader = ({name}) => {
    return (
        <div className="flex flex-row space-x-4">
            <div className="w-full md:block">
                <div className="flex flex-col md:flex-row items-center justify-between space-x-4">
                    <div className="flex justify-between items-center w-full">
                        <WelcomeUser name={name} />
                        
                        <WeatherWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

WelcomeHeader.propTypes = {
    name: PropTypes.string
};

const MemoizedComponent = React.memo(WelcomeHeader);
export default MemoizedComponent;