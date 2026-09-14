import { Card, CardHeader, CardBody } from '../Card'

const Dashboard = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-gray-600 font-semibold">Total Feedback</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-blue-600">{metrics?.totalFeedback || 0}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-gray-600 font-semibold">Positive</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-green-600">{metrics?.positive || 0}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-gray-600 font-semibold">Negative</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-red-600">{metrics?.negative || 0}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-gray-600 font-semibold">Neutral</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-gray-600">{metrics?.neutral || 0}</p>
        </CardBody>
      </Card>
    </div>
  )
}

export default Dashboard
