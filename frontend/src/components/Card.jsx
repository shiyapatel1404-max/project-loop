const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }) => (
  <div className="mb-4 pb-4 border-b">{children}</div>
)

const CardBody = ({ children }) => (
  <div>{children}</div>
)

const CardFooter = ({ children }) => (
  <div className="mt-4 pt-4 border-t">{children}</div>
)

export { Card, CardHeader, CardBody, CardFooter }
