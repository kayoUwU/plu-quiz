import Image from "next/image";
import Link from "next/link";

import { AUTHOR, LOGO, LINKS } from "@/lib/constant";
import DescriptionButton from "@/components/descriptionButton";

export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl bg-gray-500/50 lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4">
          Welcome to PLU code quiz!
        </p>
        <div className="fixed bottom-0 left-0 flex md:h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href={AUTHOR.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            By {AUTHOR.name}{" "}
            <Image
              src={AUTHOR.icon}
              alt={`author: ${AUTHOR.name}`}
              width={50}
              height={50}
              className="dark:invert"
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#ffffff70]"
          src={LOGO}
          alt="website Logo"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-fullfunction lg:mb-0 lg:grid-cols-4 lg:text-left">
        {LINKS.map((item) => (
          <DescriptionButton
            key={item.key}
            title={item.name}
            description={item.description}
            renderElement={(className: string, children: JSX.Element) => (
              <Link key={item.key} href={item.href} className={className}>
                {children}
              </Link>
            )}
          />
        ))}

        <DescriptionButton
          title="PLU code search"
          description="Review PLU Code Specifications."
          renderElement={(className: string, children: JSX.Element) => (
            <a
            href="https://www.ifpsglobal.com/plu-codes-search"
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
              {children}
            </a>
          )}
        />
      </div>
    </main>
  );
}
