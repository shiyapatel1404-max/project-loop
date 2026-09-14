import { useState, useEffect } from 'react'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { Card, CardHeader, CardBody } from './Card'

const SentimentChart = ({ data }) => {
  if (!data || !data.sentimentDistribution) return <div>Loading...</div>

  const chartData = {
    labels: data.sentimentDistribution.map((item) => item.sentiment),
    datasets: [
      {
        label: 'Sentiment Count',
        data: data.sentimentDistribution.map((item) => item.count),
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(107, 114, 128, 0.5)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold">Sentiment Distribution</h3>
      </CardHeader>
      <CardBody>
        <Bar data={chartData} />
      </CardBody>
    </Card>
  )
}

export default SentimentChart
