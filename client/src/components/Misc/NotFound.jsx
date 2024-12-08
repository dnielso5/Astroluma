import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <div className="bg-noListingCardBg p-8 rounded-xl shadow-md w-96 border border-noListingCardBorder text-noListingCardText">
        <h2 className="text-3xl mb-4 text-center">
          Oops! Page Not Found
        </h2>
        <p className="text-center">
          It seems like the page you are looking for does not exist.
        </p>
        <img
          src="/not-found.png" // You can replace this with your custom image or an appropriate icon
          alt="Not Found"
          className="mt-4 mx-auto"
        />
        <p className="mt-8 text-center">
          <Link to="/" className="bg-buttonGeneric text-buttonText py-2 px-4 rounded-full mt-8">Go to Homepage</Link>
        </p>
      </div>
    </div>
  );
}


const MemoizedComponent = React.memo(NotFound);
export default MemoizedComponent;
