

const PlaceCard = ({ place }) => {
  return (
    <div className="border p-4 rounded shadow-md max-w-sm">
      <img src={place.imageUrl} alt={place.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{place.title}</h2>
      <p className="text-gray-700 mt-1">{place.description}</p>
    </div>
  );
};

export default PlaceCard;
