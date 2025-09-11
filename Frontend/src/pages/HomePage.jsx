import React from "react";
import FeatureCard from "../components/FeatureCard";
// import { Link } from "lucide-react";
import { Link } from "react-router-dom";
import UploadPage from "./UploadPage";
import { useTranslation } from "react-i18next";

const FeatureData = (t) => [
  {
    title: t("home.feature1_title"),
    description: t("home.feature1_desc"),
    image: "/feature1.png",
    button: t("home.feature1_button"),
    link: "/upload",
  },
  {
    title: t("home.feature2_title"),
    description: t("home.feature2_desc"),
    image: "/feature2.png",
    button: t("home.feature2_button"),
    link: "/catalog",
  },
  {
    title: t("home.feature3_title"),
    description: t("home.feature3_desc"),
    image: "/feature3.png",
    button: t("home.feature3_button"),
    link: "/review",
  },
];

const HomePage = () => {
  const { t } = useTranslation("home");
  return (
    <div className="w-full max-w-7xl mx-auto bg-customBackground px-4 sm:px-6 lg:px-8">
      {/* hero section */}
      <div className="bg-customBackground  min-h-[calc(100vh-4rem)] w-full  grid grid-cols-1 md:grid-cols-2  gap-5 md:gap-10 ">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center md:items-start py-10">
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-semibold text-gray-800 mb-4">
            {t("home.hero_title")}
          </h1>
          <p className="text-gray-600 mb-6 text-sm text-center md:text-left">
            {t("home.hero_desc")}
          </p>
          <div className="flex gap-4">
            <Link
              to={"/upload"}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full transition"
            >
              {t("home.hero_start")}
            </Link>
            <Link
              to={"/catalog"}
              className="bg-gray-300 hover:bg-gray-400 text-green-700 px-6 py-2 rounded-full transition"
            >
              {t("home.hero_learn")}
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full h-full flex items-center justify-center sm:px-[30px] relative ">
          <div
            style={{
              background:
                "linear-gradient(90deg, #6A941E 3%, #A1BB52 35%, #B6CE60 74%, #AECA5B 100%)",
            }}
            className="hidden md:block absolute md:bottom-14 lg:bottom-3 md:left-12 lg:left-22 w-[80px] md:w-[100px] lg:w-[130px] aspect-[1/1] rounded-full shadow-lg"
          ></div>
          <div
            className="w-[410px] aspect-[1/1] rounded-md sm:rounded-full bg-white shadow-lg relative z-10"
            style={{
              background:
                "linear-gradient(90deg, #6A941E 3%, #A1BB52 35%, #B6CE60 74%, #AECA5B 100%)",
            }}
          >
            <img
              src="/lilyplant.png"
              className="w-full h-full object-cover"
              alt="plant"
            />
            {/* Decorative Circles */}
            <div
              style={{
                background:
                  "linear-gradient(90deg, #6A941E 3%, #A1BB52 35%, #B6CE60 74%, #AECA5B 100%)",
              }}
              className=" hidden sm:block absolute -top-5 left-8 w-9 h-9  rounded-full shadow-md"
            ></div>
            <div
              style={{
                background:
                  "linear-gradient(90deg, #6A941E 3%, #A1BB52 35%, #B6CE60 74%, #AECA5B 100%)",
              }}
              className="hidden sm:block absolute top-3 right-8 w-5 h-5  rounded-full shadow"
            ></div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="w-full py-10 md:py-20">
        <h1 className="text-xl md:text-3xl mb-8">
          {t("home.features_section")}
        </h1>
        <div className="flex flex-col gap-10">
          {FeatureData(t).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
