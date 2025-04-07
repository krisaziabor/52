"use client";

import Image from "next/image";
import React from "react";
import { useContent } from "../context/ContentContext";

export default function Bio() {
  const { contentType } = useContent();

  const content52 = (
    <>
      <Image
        className=""
        src="/52-logo.svg"
        alt="52 logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col w-full sm:w-1/2 gap-4 text-sm sm:text-base text-foreground">
        <p>
          A site dedicated to my efforts to become a person of habit and someone
          who has traditions for themselves.
        </p>
        <p>A home for the excitement I always have for brand new projects. </p>
        <p>An archive of my weekly creations for the next 52.</p>
      </div>
    </>
  );

  const contentProduct = (
    <>
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8 text-sm sm:text-base text-foreground">
        <div className="w-full md:w-1/3">
          <p>Any ambition to create a timeless work renders it lifeless.</p>
        </div>
        <div className="w-full md:w-1/3">
          <p>
            Its cycle of mortality and rebirth will always be the most
            beautiful.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <p className="pb-4">
            Product showcases a collection of my proudest work from the past few
            years, while 52 is a project I started in March to create something
            design-adjacent every week for a year.
          </p>
          <p className="pb-4">
            I previously interned at Fidelity Investments and cyclio as a
            full-stack software engineer.
          </p>
          <p className="pb-4">
            Currently, I design and engineer products for Design at Yale, a
            studio where I currently serve as co-president.
          </p>
          <p>
            I craft these case studies to reflect (yap) and return. Thank you
            for looking through :)
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      {contentType === "52" ? content52 : contentProduct}
    </div>
  );
}
