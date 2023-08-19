const Input = ({ Label , value , onChange , id , InputName }) => {
  return (

<div className="relative w-full mb-3">
<textarea
        value={value}
        onChange={onChange}
        id={id}
        name={InputName}
        autoComplete="off" 
        rows={5}
        className="block font-[IRANSans] px-2.5 pb-2.5 pt-4 w-full text-sm text-navy-500 bg-transparent dark:bg-navy-700 rounded-lg border-1 border-navy-300 appearance-none dark:text-white dark:border-navy-600 dark:focus:border-navy-500 focus:outline-none focus:ring-0 focus:border-navy-600 peer" placeholder=" "></textarea>
<label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-navy-700 px-2 peer-focus:px-2 peer-focus:text-navy-600 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1">{Label}</label>
</div>

  );
};

export default Input;
