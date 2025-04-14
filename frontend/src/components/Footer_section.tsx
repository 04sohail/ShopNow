

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex justify-center align-center">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <img src="/logo.webp" className='h-13 ' />
        </a>
        <div className="flex items-center">
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 Online Shopping —
            <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@sohail</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;