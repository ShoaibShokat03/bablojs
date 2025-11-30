import { useState, useEffect } from "../../_modules/hooks.js";
import { Div, H1, P, Button, Code, Pre } from "../../_modules/html.js";
import { logger } from "../../_modules/logger.js";
import { router } from "../../_modules/router.js";

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire app
 * 
 * @param {Object} props - Component props
 * @param {Function|Object} props.children - Child components to render
 * @param {Function|Object} [props.fallback] - Custom fallback UI
 * @param {Function} [props.onError] - Error handler callback
 * @returns {Object} Virtual DOM node
 */
export default function ErrorBoundary({ children, fallback, onError }) {
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    // Global error handler
    const handleError = (event) => {
      const errorObj = event.error || event;
      setError(errorObj);
      setErrorInfo({
        message: errorObj.message,
        stack: errorObj.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
      
      logger.error("ErrorBoundary caught error:", errorObj);
      
      if (onError) {
        onError(errorObj, errorInfo);
      }
      
      // Prevent default error handling
      event.preventDefault();
    };

    // Unhandled promise rejection handler
    const handleRejection = (event) => {
      const errorObj = event.reason || new Error("Unhandled Promise Rejection");
      setError(errorObj);
      setErrorInfo({
        message: errorObj.message || "Unhandled Promise Rejection",
        stack: errorObj.stack,
      });
      
      logger.error("ErrorBoundary caught promise rejection:", errorObj);
      
      if (onError) {
        onError(errorObj, errorInfo);
      }
      
      // Prevent default error handling
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // Reset error state
  const resetError = () => {
    setError(null);
    setErrorInfo(null);
  };

  // If there's an error, show fallback UI
  if (error) {
    if (fallback) {
      return typeof fallback === "function" 
        ? fallback({ error, errorInfo, resetError })
        : fallback;
    }

    // Default fallback UI
    return Div(
      {
        style: {
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
        },
      },
      Div(
        {
          style: {
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        },
        // Error Icon
        Div(
          {
            style: {
              fontSize: "4rem",
              textAlign: "center",
              marginBottom: "1rem",
            },
          },
          "⚠️"
        ),
        H1(
          {
            style: {
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "#dc3545",
              textAlign: "center",
            },
          },
          "Something went wrong"
        ),
        P(
          {
            style: {
              fontSize: "1rem",
              color: "#6c757d",
              marginBottom: "1.5rem",
              textAlign: "center",
            },
          },
          "An unexpected error occurred. Please try again or contact support if the problem persists."
        ),
        // Error Details (collapsible)
        Div(
          {
            style: {
              marginBottom: "1.5rem",
            },
          },
          P(
            {
              style: {
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#495057",
              },
            },
            "Error Details:"
          ),
          Pre(
            {
              style: {
                backgroundColor: "#f8f9fa",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.75rem",
                maxHeight: "200px",
                border: "1px solid #dee2e6",
              },
            },
            Code(
              {},
              errorInfo?.message || error.message || "Unknown error"
            )
          )
        ),
        // Action Buttons
        Div(
          {
            style: {
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            },
          },
          Button(
            {
              onclick: resetError,
              style: {
                padding: "0.75rem 1.5rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
              },
            },
            "Try Again"
          ),
          Button(
            {
              onclick: () => router.go("/"),
              style: {
                padding: "0.75rem 1.5rem",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
              },
            },
            "Go Home"
          )
        )
      )
    );
  }

  // Render children normally if no error
  return typeof children === "function" ? children() : children;
}

