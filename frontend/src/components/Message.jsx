const Message = () => {
  return (
    <div className="w-full h-[110px] flex justify-between items-center px-2">
      <div className="flex flex-[0.5]">
        <img
          src="https://picsum.photos/200"
          alt="profile"
          className="w-[60px] h-[60px] rounded-full"
        />
      </div>
      <div
        className="ml-0 w-[80%] h-[100%] flex flex-col justify-evenly border-b-2 border-gray-400 flex-[2]
        xs:ml-4
      "
      >
        <div className="flex justify-between">
          <p className="text-lg font-bold">John Doe</p>
          <p className="text-sm">July 8, 12:00 PM</p>
        </div>
        <p className="text-sm line-clamp-2 xs:line-clamp-3 sm:line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti ipsa harum quas, commodi minima voluptatem cupiditate exercitationem architecto dolore veniam velit reiciendis quae, ducimus autem repellendus quasi tempora illum!
        </p>
      </div>
    </div>
  );
};

export default Message;
