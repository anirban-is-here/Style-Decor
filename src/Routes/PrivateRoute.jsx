
import { Navigate } from "react-router";
import UseAuth from "../hooks/UseAuth";


export default function PrivateRoute({ children }) {
  const { user, loading } = UseAuth()

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
