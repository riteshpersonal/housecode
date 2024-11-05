import React from "react";
import SingleProperty from "./SingleProperty";
import Link from "next/link";

const PropertyListing = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl text-center uppercase font-heading">
          Featured Listing
        </h2>
        <div className="mt-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SingleProperty />
            <SingleProperty />
            <SingleProperty />
            <SingleProperty />
            <SingleProperty />
            <SingleProperty />
           
          </div>
          <div className="mt-6 text-center">
              <Link href={"/find-property"} className="py-3 font-medium text-white rounded-full bg-purple-500 px-7 focus:outline-none">
                View All
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyListing;
