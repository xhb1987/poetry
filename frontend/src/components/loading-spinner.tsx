interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  message = "載入中...",
}) => {
  const getSpinnerStyle = () => {
    const baseSize =
      size === "small" ? "16px" : size === "large" ? "48px" : "32px";
    return {
      width: baseSize,
      height: baseSize,
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-xl) 0",
      }}
    >
      <div className="loading" style={getSpinnerStyle()} />
      {message && (
        <p
          className="text-muted chinese-text"
          style={{ marginTop: "var(--spacing-sm)" }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
