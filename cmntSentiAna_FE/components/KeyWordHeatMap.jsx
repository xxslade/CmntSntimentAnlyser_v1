import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import sw from 'stopwords-en';



const KeyWordHeatMap = ({maxComments}) => {
    const [dataXAxis, setDataXAxis] = useState(['Keyword A', 'Keyword B', 'Keyword C', 'Keyword D','Keyword E','Keyword F'])
    const [dataYAxis, setDataYAxis] = useState([4, 3, 5, 6, 7, 5]);


    const freqMap = new Map();
    // const stopWords = new Set([
    //     'a', 'an', 'the', 'this', 'that', 'these', 'those',
    //     'in', 'on', 'at', 'by', 'with', 'about', 'against', 'between', 'into',
    //     'through', 'during', 'before', 'after', 'above', 'below', 'under', 'over',
    //     'to', 'from', 'of', 'for', 'as',

    //     'i', 'me', 'my', 'myself', 'you', 'your', 'yours', 'he', 'him', 'his',
    //     'she', 'her', 'they', 'them', 'their', 'it', 'its', 'we', 'us', 'our',

    //     'and', 'or', 'but', 'so', 'yet', 'nor',

    //     'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
    //     'have', 'has', 'had', 'do', 'does', 'did',
    //     'will', 'would', 'shall', 'should', 'can', 'could', 'might', 'must',

    //     'very', 'really', 'just', 'too', 'also', 'even', 'only', 'still', 'not',
    // ]);
    const stopWords = new Set(sw);

    useEffect(() => {
        if(maxComments==null){
            return;
        }
        
        //console.log("maxComments = ", maxComments)
        for (let i = 0; i < maxComments.length; i++) {
            maxComments[i]["comment"].split(/\s+/).forEach(word => {
                const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                if (!stopWords.has(cleanWord) && cleanWord.length > 1) {
                    freqMap[cleanWord] = (freqMap[cleanWord] || 0) + 1;
                }
            });
        }
        const sortedWords = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
        let size = Math.min(6, sortedWords.length)
        let tempXAxis = [0,0,0,0,0,0];
        let tempYAxis = [0,0,0,0,0,0];
        for(let i=0; i<size; i++){
            tempXAxis[i] = sortedWords[i][0];
            tempYAxis[i] = sortedWords[i][1];
        }
        setDataXAxis(tempXAxis);
        setDataYAxis(tempYAxis);
        console.log("dataXAxis = ", tempXAxis);
        console.log("dataYAxis = ", tempYAxis);

    }, [maxComments]);

    return (
        <div className="flex justify-center items-center w-full mt-8">
            <div className="bg-gray-200 p-6 rounded-l shadow-md w-full max-w-2xl">
                <h2 className="text-black text-xl font-semibold mb-4 text-center">
                    Keyword Heat Map
                </h2>
                <BarChart
                    xAxis={[{ data: dataXAxis }]}
                    series={[
                        {
                            data: dataYAxis,
                            barWidth: 40, 
                            color: '#3b82f6',
                        },
                    ]}
                    height={290}
                    width={650}
                />

            </div>
        </div>

    )
}

export default KeyWordHeatMap
