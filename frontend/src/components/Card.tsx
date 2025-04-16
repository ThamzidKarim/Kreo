type CardProps = {
  title: string;
  imageUrl: string;
};

const Card = ({ title, imageUrl }: CardProps) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg cursor-pointer">
      <img src={imageUrl} alt={title} className="w-[250px] h-[250px] object-cover rounded-lg" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
