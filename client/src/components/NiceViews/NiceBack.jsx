import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NiceButton from "./NiceButton";
import PropTypes from "prop-types";

const NiceBack = ({ label = "Go Back" }) => {

    const navigate = useNavigate();

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
            <NiceButton
                label={label}
                className="min-w-[100px] bg-buttonDanger text-buttonText"
                onClick={() => navigate(-1)}
            />
        </motion.div>
    )
}

NiceBack.propTypes = {
    label: PropTypes.string
}

const MemoizedComponent = React.memo(NiceBack);
export default MemoizedComponent;