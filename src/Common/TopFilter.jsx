import { IoBulbOutline } from "react-icons/io5";

const TopFilter = ({children}) => {
    return (
      <section className="flex w-full items-center justify-between rounded-lg bg-white mb-4 h-24">
        {children}
        <div className="flex flex-col md:flex-row items-center">
            <IoBulbOutline className="text-lg text-navy-500" />
            <p className="text-navy-500 ml-2">راهنما</p>
          </div>
      </section>
    );
  };

  export default TopFilter;