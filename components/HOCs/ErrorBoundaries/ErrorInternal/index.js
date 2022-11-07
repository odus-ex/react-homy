import React from "react";
class ErrorInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log("A 500 error: ", { error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Beep, bop, beep.... we are not feeling well.</h2>
          <hr />
          <h4>Try refreshing the page</h4>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorInternal;
