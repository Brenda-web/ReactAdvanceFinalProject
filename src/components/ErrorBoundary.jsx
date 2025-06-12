import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();
  return <div>{error.message}</div>;
};

export default ErrorBoundary;
