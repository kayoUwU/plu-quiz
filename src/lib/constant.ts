import profilePic from "@/ui/image/kayou.webp";
import logoPic from "@/ui/image/banner.webp";
import { NavLink } from "@/entity/navLink";

export const AUTHOR = {
  link: "https://github.com/kayoUwU",
  name: "Kayou",
  icon: profilePic,
  projectLink: "https://github.com/kayoUwU/plu-quiz",
};

export const LOGO = logoPic;

export const BASE_PATH = process?.env?.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_BASE_URL = process?.env?.NEXT_PUBLIC_SITE_BASE_URL || "";

export const LINKS: NavLink[] = [
  {
    key: "quiz",
    name: "Quiz",
    href: "/quiz",
    description: "Quiz on PLU code.",
  },
  {
    key: "revision",
    name: "Revision",
    href: "/revision",
    description: "Learn about the PLU code.",
  },
  {
    key: "about",
    name: "About",
    href: "/about",
    description: "Explore about the project.",
  },
];
