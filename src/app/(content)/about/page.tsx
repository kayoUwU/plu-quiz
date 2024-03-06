import { memo } from "react";
import { Metadata } from "next";

import DescriptionBlock from "@/components/descriptionBlock";

const TITLE = "About";

export const metadata: Metadata = {
  title: TITLE,
};

const AboutPage = function Page() {
  return (
    <dl>
      <DescriptionBlock term="About Project">
        This project is use for studying PLU (Price look-up) codes, which are a
        system of numbers that uniquely identify bulk produce sold in retail
        locations, through quiz. By knowing the PLU codes, we can check the
        prices of fruits and vegetables by using their PLU codes.
      </DescriptionBlock>

      <DescriptionBlock term="Pages">
        <ul>
          <li>
            <strong>Quiz</strong>: Type the PLU codes by looking at the images of fruits and
            vegetables.
          </li>
          <li><strong>Revision</strong>: Study the PLU codes</li>
        </ul>
      </DescriptionBlock>

      <DescriptionBlock term="Tech Stack">
        <ul className="list-disc list-inside">
          <li>React web applications with Next.js</li>
          <li>Tailwind CSS</li>
          <li>CI/CD with github action</li>
          <li>Scripting with Python </li>
        </ul>
      </DescriptionBlock>
    </dl>
  );
};

export default memo(AboutPage);
