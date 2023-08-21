import { useNavigate } from "react-router-dom";
import dashPic from "./images/dashboard.jpg";

function Dashboard() {
  return (
    <div
      style={{ backgroundImage: `url(${dashPic})` }}
      className="w-full h-screen bg-cover bg-center flex items-start justify-center pt-20 xl:pt-96"
    >
      <div className="flex items-center space-x-4 xl:space-x-48">
        <NavigationBox label="Movies" route="/movies" />
        <NavigationBox label="TV Shows" route="/tv" />
      </div>
    </div>
  );
}

const NavigationBox = ({ label, route }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[9rem] xl:w-[21rem] h-[5rem] rounded-lg bg-white xl:text-3xl hover:bg-slate-200 flex items-center justify-center hover:cursor-pointer"
      onClick={() => navigate(route)}
    >
      {label}
    </div>
  );
};

export default Dashboard;
