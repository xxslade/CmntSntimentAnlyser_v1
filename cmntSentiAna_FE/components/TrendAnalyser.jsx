import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

const TrendAnalyser = () => {
    return (
        <div>
            <div className="bg-gray-200 p-6 rounded-l shadow-md  w-full max-w-3xl mx-auto mt-9">
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        { data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'Line A' },
                        { data: [3, 4, 1, 6, 2, 3], label: 'Line B' },
                        { data: [1, 3, 4, 2, 4, 6], label: 'Line C' },
                    ]}
                    height={290}
                    width={650}
                />
            </div>
        </div>
    )
}

export default TrendAnalyser
