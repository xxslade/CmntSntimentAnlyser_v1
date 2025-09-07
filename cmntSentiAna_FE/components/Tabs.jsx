import React, { useState } from 'react';

const Tabs = ({allSeparatedComments}) => {
    const headings = ['Appreciation', 'Hate', 'Constructivecriticism', 'Spam', 'Sarcasm', 'Question', 'Randomunrelatedcomments'];
    const [showTab, setShowTab] = useState('Appreciation');
    const mapHeadings = {Appreciation: "Appreciation/Fan", Hate: 'Hate/Toxic', Constructivecriticism: "Contstructive Criticism", Spam: "Spam/Promo", Fancomments: "Fan Comments", Question: "Question/Inquiry", Randomunrelatedcomments: "Unrelated Comments", Sarcasm:"Sarcasm"}

    return (
        <div>
            <div className="flex gap-2 p-2 bg-gray-300  h-850px] w-[680px]">
                {headings.map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            setShowTab(item)
                            //console.log("showTab =", showTab);
                           //console.log(Object.keys(allSeparatedComments));
                        }}
                        className={`text-xs py-2 px-2 rounded-md font-semibold 
            ${showTab === item ? 'bg-blue-400 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        {mapHeadings[item]}
                    </button>
                ))}
            </div>
            <div className="flex flex-col bg-gray-300 h-[250px] w-[680px] py-1 px-2 gap-2 overflow-y-auto">
            {allSeparatedComments[showTab]?.map((commentObj, index) => (
                <div key={index} className="bg-white p-2 rounded-md shadow-md">
                <p className="text-xs font-semibold text-gray-900 break-words">
                    {commentObj.comment}
                </p>
                <p className="text-xs text-gray-600 mt-1">Likes: {commentObj.likesCount}</p>
                </div>
            ))}
            </div>



        </div>


    );
};

export default Tabs;
