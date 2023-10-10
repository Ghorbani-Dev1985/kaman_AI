import { IoBulbOutline } from "react-icons/io5";

const TopFilter = ({children}) => {
    return (
      <section className="flex flex-col md:flex-row w-full items-center justify-between rounded-lg bg-white dark:bg-navy-800 mb-4 lg:h-24">
        {children}
        <div className="flex flex-col md:flex-row items-center">
            <IoBulbOutline className="text-lg text-navy-50 dark:text-white" />
            <p className="text-navy-500 dark:text-white ml-2">راهنما</p>
          </div>
      </section>
    );
  };

  export default TopFilter;