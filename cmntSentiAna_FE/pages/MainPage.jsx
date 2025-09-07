import React from 'react'
import { useState } from 'react';

const MainPage = ({ setIsMainPage, setUserURL }) => {
    const [inputText, setInputText] = useState('');
    return (
        <div className='flex w-screen h-screen justify-center items-center bg-gray-800'>
            <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto">
                <label
                    htmlFor="videoUrl"
                    className="text-base font-medium text-gray-700"
                >
                    Enter the YouTube video URL for comment analysis:
                </label>
                <textarea
                    id="videoUrl"
                    name="videoUrl"
                    rows="1"
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste YouTube video URL here..."
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-gray-800 placeholder-gray-400 overflow-x-auto whitespace-nowrap overflow-y-hidden hide-scrollbar"
                />

                <button
                    onClick={() => {setIsMainPage(false);
                        setUserURL(inputText);
                    }}
                    type="submit"
                    className="flex items-center justify-center mt-2 self-center px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    <p>Analyze Comments</p>
                </button>
            </div>
        </div>



    )
}

export default MainPage
