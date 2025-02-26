import { motion } from "framer-motion";
import { aboutMe } from "@/lib";

export default function About() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.35 }}
      className="mt-16 scroll-mt-16  max-w-[48rem]"
      id="about"
    >
      <h2 className="text-3xl text-center">关于我</h2>
      <p className="mt-14 text-lg indent-10 leading-loose">{aboutMe}</p>
    </motion.section>
  );
}
