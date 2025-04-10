"use client";

import Image from "next/image";
import React from "react";
import { useContent } from "../context/ContentContext";

export default function Bio() {
  const { contentType } = useContent();

  const content52 = (
    <>
      <Image
        className="mb-8"
        src="/52-logo.svg"
        alt="52 logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8 text-sm sm:text-base text-foreground justify-between">
        <div className="w-full md:w-1/3">
          <p>
            A site dedicated to my efforts to become a person of habit and
            someone who has traditions for themselves.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <p>
            A home for the excitement I always have for brand new projects.{" "}
          </p>
        </div>
        <div className="w-full md:w-1/3 md:text-right">
          <p>An archive of my weekly creations for the next 52.</p>
        </div>
      </div>
    </>
  );

  const contentProduct = (
    <>
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8 text-sm sm:text-base text-foreground justify-between">
        <div className="w-full">
          <p className="pb-4">
            Kris designs. He codes. He manages a studio too.
          </p>
          <p className="pb-4">
            Ex-software (full-stack engineering) @ Fidelity Investments &
            cyclio.
          </p>
          <p className="pb-4">
            Current co-president for Yale&apos;s design studio (DAY).
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
