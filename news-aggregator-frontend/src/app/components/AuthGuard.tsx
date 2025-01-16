import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store.ts";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}