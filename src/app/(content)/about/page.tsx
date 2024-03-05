import { memo } from "react"
import { Metadata } from "next";

const TITLE = 'About';

export const metadata: Metadata = {
  title: TITLE,
};

const AboutPage = function Page() {
    return (
        <>
        </>
    );
}

export default memo(AboutPage);