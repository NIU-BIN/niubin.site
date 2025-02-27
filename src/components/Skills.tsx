"use client";

import { SkillsData } from "@/lib";
import { useInViewObserver } from "@/utils/hooks";
import { animate, motion } from "framer-motion";

const Skills = () => {
  const { ref } = useInViewObserver("skills");

  const variants = {
    initial: {
      y: 80,
      opacity: 0,
    },
    animate: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.03,
      },
    }),
  };

  return (
    <section
      className="mx-auto scroll-mt-16 max-w-[56rem]"
      id="skills"
      ref={ref}
    >
      <h2 className="text-3xl text-center">Skills</h2>
      <ul className="mt-12 flex flex-wrap justify-center gap-4">
        {SkillsData.map((item, index) => {
          return (
            <motion.li
              className="px-5 py-[10px] text-lg rounded-md bg-white shadow-sm dark:bg-neutral-600 dark:text-slate-200"
              key={item}
              whileInView="animate"
              custom={index}
              variants={variants}
              initial="initial"
              viewport={{
                once: true,
              }}
            >
              {item}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};

export default Skills;
