import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody } from '../components/Card'
import Dashboard from '../components/Dashboard/MetricsCard'
import SentimentChart from '../components/Charts/SentimentChart'
import { analyticsService } from '../services'

const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticsService.getDashboardData()
        setData(response.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
      </div>

      <Dashboard metrics={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart data={data} />
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Recent Feedback</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {data?.recentFeedback?.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded">
                  <p className="font-medium">{item.content.substring(0, 50)}...</p>
                  <p className="text-sm text-gray-600">Sentiment: {item.sentiment}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
