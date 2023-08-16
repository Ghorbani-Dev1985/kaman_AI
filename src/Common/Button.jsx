const Button = ({children , ButtonText , onClick}) => {
    return (
      <section className="flex w-full items-center justify-center md:justify-end">
      <button
        onClick={onClick}
        className="btns flex w-full items-center justify-center md:w-auto">
       {children}
        <span className="mr-2">{ButtonText}</span>
      </button>
    </section>
    );
  };

  export default Button;