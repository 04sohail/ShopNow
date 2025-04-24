import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="body-font">
      <div className="container px-5 py-8 mx-auto flex justify-center align-center">
        <div className="flex items-center">
          <ShoppingBag className="h-8 w-8 ml-10 mr-1" />
          <h4 className="font-bold">ShopNow</h4>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 ShopNow —
            <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@sohail</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;