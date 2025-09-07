from flask import Flask, request, jsonify
from flask_cors import CORS
from BE_YTFetch import fetch_comments
from BE_Langgraph import classifyWithLLM

app = Flask(__name__)
CORS(app)

@app.route("/analyse", methods=["POST"])
def home():
    data = request.get_json()
    video_id = data.get("videoID")
    try:
        fResponse = fetch_comments(video_id)
        #print(str(fResponse))
        limit = 20
        resToBeSent = []
        for i in fResponse:
            if limit == 0:
                break
            resToBeSent.append({"comment": i["comment"], "likeCount": i["likeCount"]})
            limit -= 1
        xResponse = fResponse
        absFresponse = classifyWithLLM(resToBeSent)
        return jsonify({
            "success": True,
            "content": absFresponse,
            "allComments": fResponse
        })
    except Exception as e:
        return jsonify({"success": False, "message": "msg i sent" + str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
