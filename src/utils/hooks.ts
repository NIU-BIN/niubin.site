"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInViewObserver = (name: String, threshold = 0.75) => {
  const { ref, inView } = useInView({
    threshold,
  });

  useEffect(() => {
    console.log(name, "出现");
  }, [inView]);

  return {
    ref,
  };
};
