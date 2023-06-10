import { useEffect, useState } from "react";

function useInitials(name) {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const getInitials = () => {
      const words = name.split(" ");

      if (words.length >= 2) {
        const initials = words
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join("");

        setInitials(initials);
      } else if (words.length === 1) {
        setInitials(words[0].charAt(0).toUpperCase());
      } else {
        setInitials("");
      }
    };

    getInitials();
  }, [name]);

  return initials;
}

export default useInitials;
