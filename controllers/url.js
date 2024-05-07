const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
    try {
        const body = req.body;
        console.log(req.user);
        if (!body.url) return res.status(400).json({ message: "URL is required" });
        const shortId = shortid();
        await URL.create({
            shortId,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id
        });

        return res.render("home", { id: shortId })
        // return res.json({ id: shortId });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const handleRedirectUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamps: Date.now()
                    }
                }
            }
        );
        res.redirect(entry.redirectUrl);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const handleAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOne({ shortId });
        if (!entry) return res.status(404).json({ message: "URL not found" });
        let count = entry.visitHistory.length;
        return res.json({ totalClicks: count, visitHistory: entry.visitHistory });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleAnalytics,
};
