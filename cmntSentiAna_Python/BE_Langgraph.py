from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
import json


load_dotenv()

# Now you can access the key like this
groq_key = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    api_key=groq_key,
    model="deepseek-r1-distill-llama-70b",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

def bekarTool():
    """Get weather for a given city."""
    return "Sorry I cant answer"

prompt = (
            "You are an expert comment classification model."
            "You will be given a series of YouTube comments, each prefixed by the keyword `num` followed by a number."
            "For example: num1 <comment>, num2 <comment>, and so on."
            "Each `numX` prefix indicates the start of a new comment."
            "Each comment must be classified with one or more of the following labels: "
            " - Hate"
            " - Constructive criticism"
            " - Appreciation"
            " - Spam"
            " - Question"
            " - Sarcasm"
            " - Random unrelated comments"
            "Return the result as an array of arrays, where each sub-array contains the list of labels of the corresponding number of the comment."
            "For each comment, return exactly one array of appropriate classification labels in the same order as the input."
            "If you are given 50 comments, your output **MUST** be an array of 50 sub-arrays."
            "NOTE: Do **NOT** skip or merge any comments."
            "NOTE: Every comment should be classified **INDEPENDENTLY.**"
            "Be as accurate and specific as possible. A comment can belong to more than one category."
            "Only return the array. Do not explain anything else."
            "Example:"
            "Comments:"
            "num1 This video sucks. Total waste of time. num2 Love the energy! Pure nostalgia. num3 Subscribe to my channel for free gift cards! num4 How did you make this animation? num5 LMAO this is so dramatic."
            "Expected Output:"
            "[['Hate'], ['Appreciation', 'Fan comments'], ['Spam'], ['Question'], ['Sarcasm']]"
        )
agent = create_react_agent(
            model=llm,
            prompt=prompt,
            tools=[bekarTool]
        )
def classifyWithLLM(allComments):

    lengthAllComments = len(allComments)
    commentsPerLoop = 15
    totalLoops = (lengthAllComments + commentsPerLoop - 1)//commentsPerLoop
    batchNo = 1
    permaIndexforRead = 0
    permaIndexforWrite = 0



    for loop in range(totalLoops):
        contentSentToLLM = ""
        while permaIndexforRead < lengthAllComments:
            if permaIndexforRead//commentsPerLoop == batchNo or permaIndexforRead == lengthAllComments:
                batchNo += 1
                break
            contentSentToLLM += f"num{permaIndexforRead % commentsPerLoop+1} {allComments[permaIndexforRead]['comment']} "
            permaIndexforRead += 1
        response = agent.invoke({"messages": [{"role": "user", "content": contentSentToLLM}]})


        #writeBackloop
        stringByLLM = response["messages"][-1].content
        stringByLLM = ''.join(stringByLLM.split())
        #print(contentSentToLLM)
        #print(stringByLLM)
        tempIndex = 0
        while tempIndex < len(stringByLLM):
            while True:
                if (tempIndex >= len(stringByLLM) or stringByLLM[tempIndex] != '['):
                    break
                tempIndex += 1
            s = ""
            while True:
                if(tempIndex >= len(stringByLLM) or stringByLLM[tempIndex] == ']'):
                    break
                s += stringByLLM[tempIndex]
                tempIndex += 1
            #print(permaIndexforWrite, s)
            allComments[permaIndexforWrite]["classification"] = s
            permaIndexforWrite += 1
            while True:
                if(tempIndex >= len(stringByLLM) or stringByLLM[tempIndex] != ']'):
                    break
                tempIndex += 1
            tempIndex += 1

    return allComments