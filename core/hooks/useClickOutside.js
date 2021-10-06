import { useEffect } from "react";

export const useClickOutside = (id, onClickOutside) => {
  useEffect(() => {
    const closeMenuOutsideMenu = (e) => {
      const container = document.getElementById(id);
      if (container.contains(e.target)) {
        return;
      }
      document.removeEventListener("click", closeMenuOutsideMenu);
      onClickOutside();
    };

    document.addEventListener("click", closeMenuOutsideMenu);

    return () => document.removeEventListener("click", closeMenuOutsideMenu);
  }, [id]);

  return null;
};
