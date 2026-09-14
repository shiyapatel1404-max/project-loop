import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '../components/Card'
import { feedbackService } from '../services'
import { PrimaryButton } from '../components/Button'

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ sentiment: '', status: '' })

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await feedbackService.listFeedback(filters)
        setFeedback(response.data.feedback)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeedback()
  }, [filters])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Feedback</h1>
        <PrimaryButton onClick={() => window.location.href = '/feedback/new'}>
          Add Feedback
        </PrimaryButton>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <select
              value={filters.sentiment}
              onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{item.content}</p>
                      <p className="text-sm text-gray-600 mt-2">Source: {item.source}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default FeedbackPage
