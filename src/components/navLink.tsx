"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

import { NavLink } from "@/entity/navLink";
import {AUTHOR, LOGO} from '@/lib/constant';

const links: NavLink[] = [
  { key: "quiz", name: "quiz", href: "/quiz" },
];

const MAIN_COLOR = 'bg-orange-500';
const MAIN_SHADOW_COLOR = 'shadow-orange-500/50'
const FOCUS_COLOR = 'bg-orange-700';
const SECOND_COLOR = 'bg-orange-900';
const ICON_STYLE = `relative flex rounded-full text-white ring-2 ring-black hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 hover:${FOCUS_COLOR}`;

export default function NavLinks() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onClickMenu = useCallback(() => {
    setIsMenuOpen((item) => !item);
  }, []);

  return (
    <nav className={`${MAIN_COLOR} shadow-md ${MAIN_SHADOW_COLOR}`}>
      <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              className={`relative inline-flex items-center justify-center rounded-md p-2 text-white hover:${FOCUS_COLOR} hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              onClick={onClickMenu}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <div className="block h-6 w-6 font-bond text-xl" aria-hidden="true">
                  ˄
                </div>
              ) : (
                <div className="block h-6 w-6 font-bond text-xl" aria-hidden="true">
                  ˅
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link className="flex flex-shrink-0 items-center" href={'/'}>
              <Image
                className="h-8 w-auto"
                src={LOGO}
                alt="PLU Quiz"
                priority
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map((link) => {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                        pathname === link.href
                          ? SECOND_COLOR
                          : `hover:${FOCUS_COLOR}`
                      }`}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a
              className={ICON_STYLE}
              href={AUTHOR.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View Git</span>
              <p className="h-8 w-8 font-bold text-center p-1">Git</p>
            </a>

            <div className="relative ml-3">
              <div>
                <a className={ICON_STYLE}
                  href={AUTHOR.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open {AUTHOR.name} website</span>
                  <Image
                    className="h-8 w-8 rounded-full dark:invert"
                    src={AUTHOR.icon}
                    alt={AUTHOR.name}
                    priority
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium text-white ${
                    pathname === link.href
                      ? SECOND_COLOR
                      : `hover:${FOCUS_COLOR}`
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
