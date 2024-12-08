import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaRegCopy, FaDownload, FaTrash, FaEdit } from "react-icons/fa";
import languagesList from "../../utils/LanguageList";
import useSecurityCheck from "../../hooks/useSecurityCheck";
import makeToast from "../../utils/ToastUtils";

// Define the shape of the snippet prop
const snippetPropType = PropTypes.shape({
    snippetLanguage: PropTypes.string.isRequired,
    snippetCode: PropTypes.string.isRequired,
    snippetFilename: PropTypes.string,
    mimeType: PropTypes.string
});

const SingleCodeItem = ({ snippet, editCodeFile, deleteCodeFile }) => {
    const [selectedLanguage, setSelectedLanguage] = React.useState(
        languagesList.find(lang => lang.languageValue === snippet.snippetLanguage)
    );

    const isSecure = useSecurityCheck();

    useEffect(() => {
        setSelectedLanguage(languagesList.find(lang => lang.languageValue === snippet.snippetLanguage));
    }, [snippet.snippetLanguage]);

    const handleCopy = () => {
        if (isSecure && navigator.clipboard) {
            navigator.clipboard.writeText(snippet.snippetCode).then(() => {
                makeToast('success', 'Copied to clipboard.');
            }).catch(err => {
                makeToast('error', `Failed to copy: ${err}`);
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = snippet.snippetCode;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                makeToast('success', 'Copied to clipboard.');
            } catch (err) {
                makeToast('error', `Failed to copy: ${err}`);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([snippet.snippetCode], { type: snippet.mimeType || 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${snippet.snippetFilename || "Snippet"}${selectedLanguage?.languageExtension ? `.${selectedLanguage.languageExtension}` : ''}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2 p-2 flex-row">
                <div className="text-left mb-2 md:mb-0">
                    <span className="">{snippet.snippetFilename || selectedLanguage?.languageName}</span>
                </div>
                <div className="flex justify-end space-x-4">
                    {snippet.snippetLanguage !== "disptext" && (
                        <>
                            <button
                                onClick={handleCopy}
                                className="text-snippedIconColor hover:text-snippedIconHoverColor transition duration-300 ease-in-out"
                                data-hover="copy"
                                data-tap="copying"
                            >
                                <FaRegCopy />
                            </button>
                            <button
                                onClick={handleDownload}
                                className="text-snippedIconColor hover:text-snippedIconHoverColor transition duration-300 ease-in-out"
                                data-hover="download"
                                data-tap="downloading"
                            >
                                <FaDownload />
                            </button>
                        </>
                    )}
                    <button
                        onClick={editCodeFile}
                        className="text-snippedIconColor hover:text-snippedIconHoverColor ml-2 transition duration-300 ease-in-out"
                        data-hover="edit"
                        data-tap="editing"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={deleteCodeFile}
                        className="text-snippedIconColor hover:text-snippedIconHoverColor ml-2 transition duration-300 ease-in-out"
                        data-hover="delete"
                        data-tap="deleting"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            <div className="codeviewer">
                {snippet.snippetLanguage === "disptext" ? (
                    snippet.snippetCode
                ) : (
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={selectedLanguage?.languageValue}
                    >
                        {snippet.snippetCode}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
};

SingleCodeItem.propTypes = {
    snippet: snippetPropType.isRequired,
    editCodeFile: PropTypes.func.isRequired,
    deleteCodeFile: PropTypes.func.isRequired
};

const MemoizedComponent = React.memo(SingleCodeItem);
export default MemoizedComponent;