
const Card = ({ title, imageUrl }) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg cursor-pointer">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
