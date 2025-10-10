import PlacesSection from "../components/home/PlacesSection";
import CountriesSection from "../components/home/CountriesSection";
import RequireSection from "../components/require/RequireSection";
// import ToursCard from "../components/tours/ToursCard";
import Video from "../components/home/Videos";
import ToursSection from "../components/tours/ToursSection";

export default function Home() {


  return (
    <div className="overflow-x-hidden">
      <PlacesSection />
      <CountriesSection />
      <ToursSection />
      <Video />
      <RequireSection />
    </div>
  );
}
