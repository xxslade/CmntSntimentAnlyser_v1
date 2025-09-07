import React from 'react'
import CommentPieChart from '../components/CommentPieChart'
import Tabs from '../components/Tabs'
import KeyWordHeatMap from '../components/KeyWordHeatMap'
import AISummary from '../components/AISummary'
import TrendAnalyser from '../components/TrendAnalyser'
import { useState } from 'react'
import { useEffect } from 'react'
import LoadingPage from './LoadingPage'

function getYouTubeVideoID(url) {
    const regex =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const AnalysisPage = ({ userURL}) => {
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allSeparatedComments, setAllSeparatedComments] = useState({
        
    });

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            const videoID = getYouTubeVideoID(userURL);
            //console.log(videoID);
            try {
                const res = await fetch('http://127.0.0.1:5000/analyse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ videoID })
                });

                const data = await res.json();
                //console.log("data = ",data);
                const tSComments = allSeparatedComments;
                data.content.forEach(item => {
                    let temp = item.classification
                        .split(',')
                        .map(label => label.trim().replace(/^['"]|['"]$/g, ""));
                    for (let i=0; i<temp.length; i++){
                         if (!tSComments[temp[i]]) {
                            tSComments[temp[i]] = []; // dynamically add new label
                        }
                        tSComments[temp[i]].push({comment: item.comment, likesCount: item.likeCount});
                    }
                    //console.log(item.classification);
                });
                //console.log(tSComments);
                // for(let i = 0; i<data.length; i++){
                //     console.log(data[i]["classification"]);
                // }
                setAllComments(data)
                setAllSeparatedComments(tSComments);
                
            }
            catch (err) {
                console.error('POST error: part which i have added', err);
                // setAllComments({ error: err.message });
            }
            finally {
                setLoading(false)
                //console.log("here");
                
            }
        }
        fetchComments();
    }, [])

    const toBeReturned = (<>
            <div className="bg-gray-100 shadow-2xl p-10 w-full gap-10 h-full flex flex-col items-center">
                <div className='flex gap-20'>
                    <div className='ml-22'>
                        <CommentPieChart allSeparatedComments={allSeparatedComments}/>

                    </div>
                    <div className='pl-15'>
                        <Tabs allSeparatedComments={allSeparatedComments} />
                    </div>
                </div>
                <div className='flex gap-3 w-full'>
                    <KeyWordHeatMap maxComments = {allComments["allComments"]}/>
                    <TrendAnalyser />

                </div>
                <div className='w-full'>
                    <AISummary />
                </div>
            </div>
            <div>

            </div>
        </>)

    return (
        <>
            {loading ? <LoadingPage />:toBeReturned}
        </>
    )
}

export default AnalysisPage
