/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * PromptCard component that displays a prompt in a card format.
*/

const PromptCard = ({ prompt }: {prompt: string}) => {
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-black hover:shadow-lg cursor-pointer p-4 w-[500px] h-[500px] flex flex-col justify-center items-center">
            <p className="text-sm text-center text-white">{prompt}</p>
         </div>
  );
};

export default PromptCard;