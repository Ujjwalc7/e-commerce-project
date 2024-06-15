import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/dashboard/Dashboard"

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}
export default AdminRoutes