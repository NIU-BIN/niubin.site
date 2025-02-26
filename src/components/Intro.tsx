"use client";

import Image from "next/image";
import { LINKS } from "@/lib";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Intro = () => {
  const textFrameRate = 3000;

  return (
    <section
      className="w-full h-[60vh] flex items-center justify-center gap-[110px]"
      id="home"
    >
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <h2 className="text-6xl font-bold">Hey there! 👋</h2>
          <h2 className="text-6xl font-bold my-4">
            <span>I'm</span>
            <span className=" ml-6 text-blue-500">NIU BIN</span>
          </h2>
          {/* <h4 className="text-3xl font-bold text-wrap w-[640px]">{t("occupation2")}</h4> */}

          <h3 className="text-3xl font-bold text-wrap w-[640px]">
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                textFrameRate,
                "Hope to become a Full Stack Developer",
                textFrameRate,
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h3>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <ul className="flex items-center gap-2 mt-5">
            {LINKS.map((item) => {
              return (
                <li
                  key={item.name}
                  className="h-10 w-12 flex items-center justify-center rounded-md object-cover border-white shadow-xl bg-slate-50 cursor-pointer"
                >
                  <Image
                    src={item.iconURL}
                    alt={item.name}
                    width="24"
                    height="24"
                    quality="95"
                    priority={true}
                  />
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <Image
          src="/image/avatar.jpg"
          alt="developer-image"
          width="280"
          height="280"
          quality="95"
          priority={true}
          className="h-52 w-52 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
        />
      </motion.div>
    </section>
  );
};

export default Intro;
