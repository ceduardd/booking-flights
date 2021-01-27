const ErrorLabel = ({ children }) => {
  return (
    <div className="error-label">
      <i className="fas fa-exclamation-circle"></i> {children}
    </div>
  );
};

export default ErrorLabel;
