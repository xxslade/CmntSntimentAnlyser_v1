import googleapiclient.discovery
import os
from dotenv import load_dotenv

load_dotenv()

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = os.getenv("youTubeAPI")

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)

def fetch_comments(video_id):
    req = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=200
    )
    response = req.execute()
    print('success')

    return [{
        "comment": item["snippet"]["topLevelComment"]["snippet"]["textOriginal"],
        "likeCount": item["snippet"]["topLevelComment"]["snippet"]["likeCount"]
    } for item in response["items"]]
