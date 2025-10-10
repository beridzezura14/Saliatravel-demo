import { useEffect, useState } from "react";
import API from "../../api/api";
import ToursCard from "./ToursCard";
import bus from "../../assets/img/bus.png";

function ToursSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/tours")
      .then((res) => {
        setTours(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-[90%] mx-auto mt-24 mb-20">
      <div className="border-b-[2px] border-primary mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-caps pb-0">ტურები</h1>
        <img src={bus} alt="bus" className="w-30" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[250px] lg:h-[300px] bg-gray-300 rounded animate-pulse"
              ></div>
            ))
          : tours.map((t) => <ToursCard key={t._id} tour={t} />)}
      </div>
    </div>
  );
}

export default ToursSection;
