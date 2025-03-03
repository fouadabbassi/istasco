import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getProfileUser } from "../Redux/userAction";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, isLoggedIn, isAdmin } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const handleDispatch = async () => {
        dispatch(getProfileUser());
    };
    handleDispatch();
  }, [dispatch]);
    useEffect(() => {
      const checkAuth = async () => {
        console.log(isAdmin, isLoggedIn);
        if (isLoggedIn === false || isAdmin !== "admin") {
          navigate("/");
        }
      };

      checkAuth();
    }, [dispatch, isAdmin, isLoggedIn, navigate, userProfile]);
    

    return userProfile ? (
      userProfile["role"] === "admin" ? (
        <>
          <div>
            <Sidebar />
            <div style={{marginLeft:"260px"}}>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )
    ) : (null
    );
};
export default DashboardLayout;
