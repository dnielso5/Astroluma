import React from 'react';
import PropTypes from 'prop-types';

const WelcomeUser = ({ name }) => {

    return (
        <div className="flex items-center space-x-4 mb-4">
            <img className="h-16 w-16 rounded-full" src="/avatar.png" alt="User avatar" />
            <div>
                <h2 className="text-2xl sm:text-3xl text-welcomeText">Welcome Back</h2>
                <p className="text-xs sm:text-sm text-welcomeUsernameText">{name}</p>
            </div>
        </div>
    );
};

WelcomeUser.propTypes = {
    name: PropTypes.string
};

const MemoizedComponent = React.memo(WelcomeUser);
export default MemoizedComponent;