import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NiceLink = ({ label = "Go Back", color = "blue", to = "/", className = "" }) => {

    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{
                scale: 1.03,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                }
            }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex' }}>
            <Link
                to={to}
                className={`bg-${color} py-2 px-4 rounded-full m-1 text-xs ${className}`}
            >
                {label}
            </Link>
        </motion.div>
    )
}

NiceLink.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string
}

const MemoizedComponent = React.memo(NiceLink);
export default MemoizedComponent;