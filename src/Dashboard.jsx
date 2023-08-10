import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      {/* Links to Movies and TV here. */}
      {/* <Movies /> */}
      <div className="text-4xl hover:">
        <a
          onClick={() => {
            navigate("/movies");
          }}
        >
          Movies
        </a>
      </div>
      <div className="text-4xl">
        <a
          onClick={() => {
            navigate("/tv");
          }}
        >
          Tv shows
        </a>
      </div>
    </>
  );
}

export default Dashboard;
