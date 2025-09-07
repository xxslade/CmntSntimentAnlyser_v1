
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
def classifyWithLLM(allComments):
    #print("hi")
    totalLoops = len(allComments)//20
    batchNo = 1
    i = 0
    indexLast = 0

    for loop in range(totalLoops):
        contentToBeSent = []
        while(True):
            if(i == len(allComments) or i//totalLoops == batchNo):
                batchNo += 1
                break
            contentToBeSent.append(allComments[i]["comment"])
            i += 1

        prompt_header = (
            "You are an expert comment classification model."
            "You will be given a series of YouTube comments, each prefixed by the keyword `num` followed by a number."
            "For example: num1 <comment>, num2 <comment>, and so on."
            "Each `numX` prefix indicates the start of a new comment."
            "Each comment must be classified with one or more of the following labels:"
            " - Hate"
            " - Constructive feedback"
            " - Appreciation"
            " - Spam"
            " - Question"
            " - Sarcasm"
            " - Fan comments"
            " - Random unrelated comments"
            "Return the result as an array of arrays, where each sub-array contains the list of labels of the corresponding number of the comment."
            "For each comment, return exactly one array of appropriate classification labels in the same order as the input."
            "If you are given 50 comments, your output **MUST** be an array of 50 subarrays."
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
            prompt=prompt_header,
            tools=[bekarTool]
        )
        prompt_body = ""
        for idx, comment in enumerate(contentToBeSent, start=1):
            prompt_body += f"num{idx} {comment[idx-1]} "

        response = agent.invoke({
            "messages": [
                {"role": "user", "content": prompt_body}
            ]
        })
        #for item in response["messages"]:
        print(len(response["messages"][-1].content))
        # print(response["messages"][-1].content)
        index = 1
        content = response["messages"][-1].content

        while index < len(content):
            # Skip until we find a '['
            if content[index] != '[':
                index += 1
                continue

            index += 2  # Skip the opening '['
            s = ""
            while index < len(content) and content[index] != ']':
                s += content[index]
                index += 1

            if index < len(content) and content[index] == ']':
                # Reached the closing ']'
                allComments[indexLast]['classification'] = s.strip()
                indexLast += 1

            index += 1  # Move past ']'
        #print(response)
        print(indexLast)
    return allComments
# prompt_header = ("You are an expert comment classification model."
#                  "Each comment must be classified with one or more of the following labels:"
#                 " - Hate"
#                 " - Constructive feedback"
#                 " - Appreciation"
#                 " - Spam"
#                 " - Question"
#                 " - Sarcasm"
#                 " - Fan comments"
#                 " - Random unrelated comments"
#                  "Be as accurate and specific as possible. A comment can belong to more than one category. Use a comma to separate the labels if needed."
#                  "Example1:"
#                  "This video sucks. Total waste of time."
#                  "Expected Output:"
#                  "Hate"
#                  "Example2:"
#                  "Love the energy! Pure nostalgia."
#                  "Expected Output:"
#                  "Fan Comments, Appreciation"
#                  )

# agent = create_react_agent(
#         model=llm,
#         prompt=prompt_header,
#         tools=[bekarTool]
#     )
# def classifyWithLLM(allComments):
#     for comment in allComments:
#         resp = agent.invoke({
#         "messages": [
#             {"role": "user", "content": comment["comment"]}
#             ]
#         })
#         comment["classification"] = resp["messages"][-1].content
#
#     return allComments
