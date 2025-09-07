require("dotenv").config();
const axios = require("axios");
const { google } = require("googleapis");

const youtube = google.youtube({
    version: "v3",
    auth: process.env.youTubeAPIKEY
});

exports.mainPage = async (req, res) => {
    const videoId = "izPATSdGxng";

    try {
        const response = await youtube.commentThreads.list({
            part: "snippet",
            videoId: videoId,
            maxResults: 100,
        });

        const comments = response.data.items;
        let toBeSentBack = [];
        for(let i=0; i<comments.length; i++){
            toBeSentBack.push({comment : comments[i]['snippet']['topLevelComment']['snippet']['textOriginal'] || 'nada' })
        }
        res.status(200).json({
            success: true,
            comments: comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).json({
            success: false,
            message: `Can't fetch comments.`,
        });
    }

}