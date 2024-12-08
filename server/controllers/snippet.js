const Listing = require("../models/Listing");
const Snippet = require("../models/Snippet");

exports.saveSnippet = async (req, res) => {
    const userId = req.user?._id; // Get user ID from the authenticated user
    const { listingId, snippetCode, snippetTitle, snippetId, language, snippetFilename } = req.body; // Destructure request body

    // Validate that snippetTitle exists
    if (!snippetTitle) {
        return res.status(400).json({
            error: true,
            message: "Invalid data. Snippet title is required."
        });
    }

    try {
        let snippet;

        // If snippetId is provided, update the existing snippet
        if (snippetId) {
            snippet = await Snippet.findOne({
                _id: snippetId,
                userId // Ensure the snippet belongs to the current user
            });

            // If snippet is not found, return 404
            if (!snippet) {
                return res.status(404).json({
                    error: true,
                    message: "Snippet not found."
                });
            }

            // Update the snippet fields
            snippet.snippetLanguage = language;
            snippet.snippetTitle = snippetTitle;

            // Save the updated snippet
            await snippet.save();

            return res.status(200).json({
                error: false,
                message: snippet
            });

        } else {
            // Create a new snippet if snippetId is not provided
            snippet = new Snippet({
                parent: listingId, // Set the listing ID as the parent
                snippetLanguage: language,
                snippetTitle,
                userId, // Set the user ID from the request
                snippetItems: [{
                    snippetCode, // Add code to snippetItems array
                    snippetLanguage: language,
                    snippetFilename
                }]
            });

            // Save the new snippet
            await snippet.save();

            return res.status(200).json({
                error: false,
                message: snippet
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: true,
            message: "Error saving snippet."
        });
    }
};

const getBreadcrumb = async(listingId, userId) => {
    try {
        // Find the listing with the given listingId and userId
        const listing = await Listing.findOne({
            _id: listingId,
            userId
        });

        if (!listing) {
            return [];
        }

        const breadcrumb = [];

        let currentListing = listing;

        while (currentListing.parent) { 
            // Fetch parent listing
            const parentListing = await Listing.findOne({
                _id: currentListing.parentId,
                userId
            });

            if (parentListing) {
                breadcrumb.push({
                    id: parentListing._id,
                    listingName: parentListing.listingName,
                    depth: breadcrumb.length + 1
                });

                currentListing = parentListing;
            } else {
                break;
            }
        }

        breadcrumb.reverse();

        return breadcrumb;
    } catch (error) {
        console.error('Error fetching breadcrumb:', error);
        return [];
    }
}

exports.listSnippet = async (req, res) => {
    const userId = req.user?._id; // Get user ID from the authenticated user
    let snippetId = req.params.snippetId;
    const query = req.params.query;

    if (snippetId === "undefined") snippetId = null;

    const page = Number(req.params.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    // Prepare the base filter object for Snippet
    const snippetFilter = {
        userId
    };

    if (snippetId) {
        snippetFilter.parent = snippetId
    }

    if (query) {
        snippetFilter.$or = [
            { snippetTitle: { $regex: query, $options: 'i' } },
            { 'snippetItems.snippetCode': { $regex: query, $options: 'i' } } 
        ];
    }

    try {
        // Fetch the snippet for the breadcrumb if necessary
        const snippet = snippetId ? await Listing.findOne({ _id: snippetId, userId }) : null;

        // Fetch snippets
        const snippets = await Snippet.find(snippetFilter)
            .populate('parent') 
            .skip(offset)
            .limit(limit)
            .sort({ updatedAt: -1 }); 

        // Count total snippets
        const totalItems = await Snippet.countDocuments(snippetFilter);

        // Fetch breadcrumb data if necessary (assuming getBreadcrumb is a helper function you have)
        const breadcrumb = snippetId ? await getBreadcrumb(snippetId, userId) : null;

        // Create the response object
        const totalPages = Math.ceil(totalItems / limit);
        const dataToReturn = {
            snippet, // Snippet for breadcrumb
            snippets, // List of snippets
            totalItems,
            totalPages,
            breadcrumb, // Breadcrumb data
            currentPage: page
        };

        return res.status(200).json({
            error: false,
            message: dataToReturn
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: true,
            message: "Error fetching snippet list."
        });
    }
};

exports.listFilesInSnippet = async (req, res) => {
    const snippetId = req.params.snippetId;
    const userId = req.user?._id;

    if (!snippetId) {
        return res.status(400).json({
            error: true,
            message: "Invalid data."
        });
    }

    try {
        // Find the snippet by its ID and userId
        const snippet = await Snippet.findOne({
            _id: snippetId,
            userId
        });

        if (!snippet) {
            return res.status(404).json({
                error: true,
                message: "Snippet not found."
            });
        }

        // Find all snippetItems that belong to the snippet (parent field) and the userId
        const snippetItems = snippet.snippetItems;

        return res.status(200).json({
            error: false,
            message: {
                snippet,
                snippetItems
            }
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: true,
            message: "Error fetching snippet items."
        });
    }
};

exports.saveCodeToSnippet = async (req, res) => {
    const snippetId = req.params.snippetId;
    const userId = req.user?._id;
    const { snippetCode, snippetFilename, language, codeId } = req.body;

    if (!snippetId || !snippetCode || !language) {
        return res.status(400).json({
            error: true,
            message: "Invalid data."
        });
    }

    try {
        // Find the snippet by snippetId and userId
        const snippet = await Snippet.findOne({
            _id: snippetId,
            userId
        });

        if (!snippet) {
            return res.status(404).json({
                error: true,
                message: "Snippet not found."
            });
        }

        if (codeId) {
            // Update existing snippet item
            const snippetItem = snippet.snippetItems.id(codeId); 

            if (!snippetItem) {
                return res.status(404).json({
                    error: true,
                    message: "Snippet item not found."
                });
            }

            // Update the fields
            snippetItem.snippetCode = snippetCode;
            snippetItem.snippetFilename = snippetFilename;
            snippetItem.snippetLanguage = language;

            await snippet.save(); // Save the changes to the parent snippet document

            return res.status(200).json({
                error: false,
                message: snippetItem
            });
        } else {
            // Add a new snippet item
            snippet.snippetItems.push({
                snippetCode,
                snippetFilename,
                snippetLanguage: language
            });

            await snippet.save(); // Save the parent snippet document with the new snippet item

            return res.status(200).json({
                error: false,
                message: snippet
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: true,
            message: "Error saving snippet item."
        });
    }
};

exports.deleteSnippet = async (req, res) => {
    const snippetId = req.params.snippetId;
    const userId = req.user?._id;

    if (!snippetId) {
        return res.status(400).json({
            error: true,
            message: "Invalid data."
        });
    }

    try {
        // Find the snippet by ID and userId
        const snippet = await Snippet.findOne({
            _id: snippetId,
            userId
        });

        if (!snippet) {
            return res.status(404).json({
                error: true,
                message: "Snippet not found."
            });
        }

        // Delete the snippet
        await Snippet.deleteOne({ _id: snippet._id });

        return res.status(200).json({
            error: false,
            message: "Snippet deleted."
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: true,
            message: "Error deleting snippet."
        });
    }
};

exports.deleteCodeFromSnippet = async (req, res) => {
    const snippetId = req.params.snippetId;
    const codeId = req.params.codeId;
    const userId = req.user?._id;

    if (!snippetId || !codeId) {
        return res.status(400).json({
            error: true,
            message: "Invalid data."
        });
    }

    try {
        // Find the snippet item by codeId and userId
        const snippetItem = await Snippet.findOne({
            _id: snippetId,
            userId
        });

        if (!snippetItem) {
            return res.status(404).json({
                error: true,
                message: "Snippet item not found."
            });
        }

        // Snippet found, now remove snippetItem whose _id is codeId
        snippetItem.snippetItems.pull(codeId);

        await snippetItem.save(); // Save the changes to the parent snippet document

        return res.status(200).json({
            error: false,
            message: "Snippet item deleted."
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: true,
            message: "Error deleting snippet item."
        });
    }
};