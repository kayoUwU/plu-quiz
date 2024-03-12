import profilePic from "@/ui/image/kayou.webp";
import { NavLink } from "@/entity/navLink";

export const AUTHOR = {
  link: "https://github.com/kayoUwU",
  name: "Kayou",
  icon: profilePic,
  projectLink: "https://github.com/kayoUwU/plu-quiz",
};

export const BASE_PATH = process?.env?.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_BASE_URL = process?.env?.NEXT_PUBLIC_SITE_BASE_URL || "";
export const IMAGE_PATH_PREFIX = (process?.env?.NEXT_PUBLIC_IMAGE_PATH_PREFIX||"").concat("/plu_img/");

export const WEB_ICON = BASE_PATH.concat('/favicon.ico');
export const LOGO = BASE_PATH.concat('/icon_720.webp');

export const INDEX_PAGE = '/home';
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
