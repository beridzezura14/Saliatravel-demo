import React, { useEffect, useState } from "react";
import API from "../api/api";
import contactCover from "../assets/zanzibar.jpg";
import address from "../assets/pin.png";
import tell from "../assets/telephone.png";
import mail from "../assets/mail.png";


export default function Contact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await API.get("/contacts");
        if (res.data.length > 0) setContact(res.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  // 🕓 ჩატვირთვისას იგივე ზომის skeleton UI
  if (loading) {
    return (
      <div className="max-w-[90%] m-auto py-32 animate-pulse">
        <div className="h-10 w-60 bg-gray-300 rounded mb-10 mx-auto"></div>

        <div
          className="relative bg-cover bg-center mb-8 rounded-lg shadow-lg flex flex-col lg:flex-row justify-between items-center lg:items-start py-8 px-4 lg:p-8 text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${contactCover})`,
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="my-6 lg:w-[50%] flex flex-col gap-4">
            <div className="h-10 bg-gray-400 rounded w-3/4"></div>
            <div className="h-20 bg-gray-400 rounded w-[90%]"></div>
          </div>

          <div className="w-full lg:w-[45%] bg-white py-10 lg:py-16 px-6 xl:px-10 rounded-lg text-black flex flex-col gap-4">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8 font-caps">
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>

        <div className="w-full h-[300px] bg-gray-200 rounded"></div>
      </div>
    );
  }

  // 🚀 მთავარი გვერდი (ჩატვირთვის შემდეგ)
  return (
    <div className="max-w-[90%] m-auto py-32">
      <h1 className="text-3xl mb-10 md:text-4xl lg:text-5xl font-caps text-[#22afb9] text-center">
        საკონტაქტო
      </h1>

      <div
        className="bg-cover bg-center mb-8 rounded-lg shadow-lg flex flex-col lg:flex-row justify-between items-center lg:items-start py-8 px-4 lg:p-8 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${contactCover})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 my-6 lg:w-[50%]">
          <h2 className="text-3xl lg:text-4xl font-caps">სად ვიმოგზაურო?</h2>
          <p className="mt-4 xl:w-[600px]">
            როცა გაგიჩნდება ეს კითხვა, ჩვენი ექსპერტები დაგეხმარებიან თქვენი
            მოგზაურობის დაგეგმვაში.
          </p>
        </div>

        <form className="relative z-10 flex flex-col gap-4 mt-4 w-full lg:w-[45%] bg-white py-10 lg:py-16 px-6 xl:px-10 rounded-lg text-black shadow-lg">
          <h3 className="font-caps text-2xl text-primary">მოგვწერეთ</h3>
          <input
            className="border outline-none focus:border-black px-4 py-2 rounded-md border-primary transition-all duration-200"
            type="text"
            placeholder="სახელი*"
            required
          />
          <input
            className="border outline-none focus:border-black px-4 py-2 rounded-md border-primary transition-all duration-200"
            type="email"
            placeholder="Email*"
            required
          />
          <input
            className="border outline-none focus:border-black px-4 py-2 rounded-md border-primary transition-all duration-200"
            type="text"
            placeholder="ნომერი"
            required
          />
          <textarea
            className="h-24 border outline-none focus:border-black px-4 py-2 rounded-md border-primary transition-all duration-200"
            placeholder="თემა*"
            required
          ></textarea>
          <button
            type="submit"
            className="w-[120px] border border-primary py-2 pt-[10px] font-caps rounded-md hover:bg-primary hover:text-white transition-all"
          >
            გაგზავნა
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-12">

        <div className="flex items-center gap-4 p-4 border border-primary rounded hover:shadow-lg transition">
          <div className="p-4 bg-primary rounded-full">
            <img src={address} className="w-[30px] [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(4%)_saturate(7299%)_hue-rotate(16deg)_brightness(122%)_contrast(105%)]" alt="address icon" />
          </div>

          <div>
            <h3 className="text-xl text-primary font-caps mb-2">მისამართი</h3>
            <p className="text-[18px] text-black">{contact.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border border-primary rounded hover:shadow-lg transition">
          <div className="p-4 bg-primary rounded-full">
            <img src={tell} className="w-[30px] [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(4%)_saturate(7299%)_hue-rotate(16deg)_brightness(122%)_contrast(105%)]" alt="address icon" />
          </div>

          <div>
            <h3 className="text-xl text-primary mb-2 font-caps">ტელეფონი</h3>
            <p className="text-[18px] text-black">{contact.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border border-primary rounded hover:shadow-lg transition">
          <div className="p-4 bg-primary rounded-full">
            <img src={mail} className="w-[30px] [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(4%)_saturate(7299%)_hue-rotate(16deg)_brightness(122%)_contrast(105%)]" alt="address icon" />
          </div>

          <div>
            <h3 className="text-xl text-primary mb-2 font-caps">მეილი</h3>
            <p className="text-[18px] text-black">{contact.email}</p>
          </div>
        </div>
        
      </div>

      <div className="mt-4 w-full h-[300px]">
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: contact.mapEmbed }}
        />
      </div>
    </div>
  );
}
