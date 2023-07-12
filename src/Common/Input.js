const Input = ({ inputType ,  Label , value , onChange , id , InputName }) => {
  return (

<div className="relative w-full mb-3">
<input type={inputType}
        value={value}
        onChange={onChange}
        id={id}
        name={InputName}
        autoComplete="off" 
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-0 focus:border-navy-600 peer" placeholder=" " />
<label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-navy-600 peer-focus:dark:text-navy-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1">{Label}</label>
</div>

  );
};

export default Input;
