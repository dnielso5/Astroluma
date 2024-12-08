const Icon = require("../models/Icon");

exports.uploadImage = async (req, res) => {
    const uploadedFile = req.localUrl;
    const userId = req.user?._id;

    if (!uploadedFile || !userId) {
        return res.status(400).json({
            error: true,
            message: "Image upload failed."
        });
    }

    try {
        const icon = new Icon({
            iconPath: uploadedFile,
            userId
        });

        await icon.save();

        return res.status(200).json({
            error: false,
            message: "Image uploaded successfully.",
            data: icon
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: true,
            message: "Image upload failed."
        });
    }
}

exports.listImages = async (req, res) => {
    const userId = req.user?._id;

    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const icons = await Icon.find({
            $or: [{ userId }, { userId: null }]
        })
        .sort({ _id: -1 }) // Sort by id in descending order
        .skip(skip)
        .limit(limit);

        return res.status(200).json({
            error: false,
            message: "Icons retrieved successfully.",
            data: icons
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: true,
            message: "Failed to retrieve icons."
        });
    }
}
