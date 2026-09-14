export const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
)

export const PrimaryButton = (props) => (
  <Button {...props} className={`bg-blue-600 text-white hover:bg-blue-700 ${props.className}`} />
)

export const SecondaryButton = (props) => (
  <Button {...props} className={`bg-gray-200 text-gray-800 hover:bg-gray-300 ${props.className}`} />
)

export const DangerButton = (props) => (
  <Button {...props} className={`bg-red-600 text-white hover:bg-red-700 ${props.className}`} />
)
