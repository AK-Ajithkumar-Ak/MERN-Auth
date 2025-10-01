import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here or send to a logging service
    console.log("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger mt-5">
          <h4>Something went wrong.</h4>
          <p>{this.state.error?.name || "An unexpected error occurred."}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// let obj = new ErrorBoundary()
// obj.componentDidCatch(new Error("Test error"), { componentStack: "Test stack" });