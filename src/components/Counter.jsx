import { useEffect, useState } from "react";

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 30);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 30);

    return () => clearInterval(counter);
  }, [target]);

  return (
    <span className="text-4xl md:text-5xl font-extrabold text-indigo-600 group-hover:scale-110 transition-transform">
      {count}
      {suffix}
    </span>
  );
};
export default Counter;
