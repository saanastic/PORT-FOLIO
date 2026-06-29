import { useEffect } from "react";
import { useNavigationType, useLocation } from "react-router-dom";

const PAGE_META = {
  "/": {
    title: "PORT-FOLIO | Saanvi Arora",
    description: "Frontend developer & Web Intern. BTech '29.",
  },
};

export function usePageMeta() {
  const action = useNavigationType();
  const { pathname } = useLocation();

  useEffect(() => {
    if (action !== "POP") window.scrollTo(0, 0);
  }, [action, pathname]);

  useEffect(() => {
    const meta = PAGE_META[pathname];
    if (meta?.title) document.title = meta.title;
    if (meta?.description) {
      const tag = document.querySelector('head > meta[name="description"]');
      if (tag) tag.content = meta.description;
    }
  }, [pathname]);
}