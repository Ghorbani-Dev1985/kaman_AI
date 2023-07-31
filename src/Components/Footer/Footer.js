
const Footer = () => {

  return (
    <div className="z-[5] mx-auto flex w-full items-center justify-center p-8 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px]">
    <p className="mb-6 text-center text-sm text-gray-600 md:text-base lg:mb-0 font-[IRANSans]">
      © کلیه حقوق مادی و معنوی متعلق به آژانس دیجیتال مارکتینگ کمان می باشد. {1900 + new Date().getYear()}
    </p>
  </div>
  );
};

export default Footer;
