// Router
import { useNavigate } from "react-router-dom";
// Images
import dashPic from "./images/2.jpg";
// Components
import UpcomingEpisodes from "./components/UpcomingEpisodes";

function Dashboard() {
  return (
    <div
      style={{ backgroundImage: `url(${dashPic})` }}
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
    >
      <div className="flex flex-col items-center mb-20">
        <div className="flex items-center space-x-4 xl:space-x-60 mb-2">
          <NavigationBox label="Movies" route="/movies" />
          <NavigationBox label="TV Shows" route="/tv" />
        </div>
        <UpcomingEpisodes />
      </div>
    </div>
  );
}
// Props to navigate to route
const NavigationBox = ({ label, route }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[11rem] xl:w-[18rem] h-[5rem] mt-20 border-2 border-green-400 bg-[#424B54] text-3xl font-bold text-white xl:text-3xl hover:bg-slate-500 flex items-center justify-center hover:cursor-pointer"
      onClick={() => navigate(route)}
    >
      {label}
    </div>
  );
};

export default Dashboard;
