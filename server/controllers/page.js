const Page = require('../models/Page');

exports.savePage = async (req, res) => {
    const loggedinuser = req.user;
    const { pageId, pageTitle, pageContent, publish } = req.body;

    if (!pageTitle) {
        return res.status(400).json({
            error: true,
            message: "Page title must not be empty."
        });
    }

    try {
        if (!pageId) {
            // Create a new page
            const page = new Page({
                pageTitle,
                pageContent,
                isPublished: publish,
                userId: loggedinuser?._id
            });
            await page.save();
            return res.status(200).json({
                error: false,
                message: "Page created successfully."
            });
        } else {
            // Update an existing page
            const result = await Page.updateOne(
                { _id: pageId, userId: loggedinuser?._id },
                { pageTitle, pageContent, isPublished: publish }
            );
            
            if (result.nModified === 0) {
                return res.status(400).json({
                    error: true,
                    message: "Page not found or no changes made."
                });
            }

            return res.status(200).json({
                error: false,
                message: "Page updated successfully."
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error in adding or updating page."
        });
    }
}

exports.pageList = async (req, res) => {
    const loggedinuser = req.user;
    const active = req.params.active;

    const query = { userId: loggedinuser?._id };
    if (active) {
        query.isPublished = true;
    }

    try {
        const pages = await Page.find(query).select('-pageContent');
        return res.status(200).json({
            error: false,
            message: pages
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error fetching pages."
        });
    }
}

exports.pageInfo = async (req, res) => {
    const loggedinuser = req.user;
    const pageId = req.params.pageId;
    const active = req.params.active;

    const query = {
        _id: pageId,
        userId: loggedinuser?._id,
        ...(active && { isPublished: true }) // Add isPublished: true if active is truthy
    };

    try {
        const page = await Page.findOne(query);
        if (!page) {
            return res.status(400).json({
                error: true,
                message: "Page not found."
            });
        }
        return res.status(200).json({
            error: false,
            message: page
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error fetching page information."
        });
    }
}

exports.deletePage = async (req, res) => {
    const loggedinuser = req.user;
    const pageId = req.params.pageId;

    try {
        const result = await Page.deleteOne({
            _id: pageId,
            userId: loggedinuser?._id
        });

        if (result.deletedCount === 0) {
            return res.status(400).json({
                error: true,
                message: "Page not found."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Page deleted successfully."
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error in deleting page."
        });
    }
}

exports.managePage = async (req, res) => {
    const loggedinuser = req.user;
    const pageId = req.params.pageId;
    const action = req.params.action;

    if (!pageId) {
        return res.status(400).json({
            error: true,
            message: "Page id not supplied."
        });
    }

    try {
        const result = await Page.updateOne(
            { _id: pageId, userId: loggedinuser?._id },
            { isPublished: action === "publish" ? true : false }
        );

        if (result.nModified === 0) {
            return res.status(400).json({
                error: true,
                message: "Page not found or no changes made."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Page status changed successfully."
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error in changing page status."
        });
    }
}
