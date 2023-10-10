import { IoBulbOutline } from "react-icons/io5";

const TopInfoBar = () => {
    return ( 
        <section className="mb-4 flex w-full items-center justify-end rounded-lg bg-white dark:bg-navy-800 lg:h-24 p-3">
        <div className="flex flex-col items-center md:flex-row">
          <IoBulbOutline className="text-lg text-navy-500 dark:text-white" />
          <p className="ml-2 text-navy-500 dark:text-white">راهنما</p>
        </div>
      </section>
     );
}
 
export default TopInfoBar;