import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect } from "react";
import { useState } from "react";

const CommentPieChart = ({ allSeparatedComments }) => {
    const mapHeadings = {Appreciation: "Appreciation/Fan", Hate: 'Hate/Toxic', Constructivecriticism: "Contstructive Criticism", Spam: "Spam/Promo", Fancomments: "Fan Comments", Question: "Question/Inquiry", Randomunrelatedcomments: "Unrelated Comments", Sarcasm:"Sarcasm"}


  const [data, setData] = useState([]);
 // console.log("manwtf")
  useEffect((()=>{
    //console.log('here',allSeparatedComments);
    if (!allSeparatedComments) return; 
    let total = 0;

    for (const comments of Object.values(allSeparatedComments)) {
        total += comments.length;
    }
    
    const tData = Object.entries(allSeparatedComments).map(([key, comments], index) => ({
    id: index,
    value: (comments.length / total) * 100,
    label: mapHeadings[key],
    count: comments.length,
  }));
    // for(let i=0; i<Object.values(mapHeadings).length; i++){
    //     tData[Object.values(mapHeadings)[i]] = tData[Object.values(mapHeadings)[i]];    
    // }
    //console.log("tdata = ", tData, "sepC = ", allSeparatedComments);
    setData(tData);
  }), [allSeparatedComments])
  

  return (
    <div>
      <PieChart
        series={[
          {
            data,
            innerRadius: 50,
            outerRadius: 140,
            paddingAngle: 4,
            cornerRadius: 3,
          },
        ]}
        height={300}
        width={300}
      />
    </div>
  );
};

export default CommentPieChart;
