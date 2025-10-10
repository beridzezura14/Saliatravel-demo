import React from "react";

export default function CountryCard({ country }) {
  return (
    <div
      className="relative h-[400px] rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, #000, #1b8c99)`,
      }}
    >
      {/* სურვილისამებრ სურათი */}
      {country.image && (
        <img
          src={country.image}
          alt={country.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-all duration-500"
        />
      )}

      {/* სათაური ცენტრში */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-2xl font-caps text-white text-center drop-shadow-lg tracking-wide">
          {country.title}
        </h3>
      </div>
    </div>
  );
}
