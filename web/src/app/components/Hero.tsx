"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
          <p className="pb-2">Kris designs. He codes. He runs a studio too.</p>
          <p className="pb-2">
            Ex-software (full-stack) @
            <Link
              href="https://fidelity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mx-1"
            >
              Fidelity Investments
            </Link>
            &
            <Link
              href="https://cyclio.webflow.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ml-1"
            >
              cyclio
            </Link>
            .
          </p>
          <p className="pb-2">
            Currently leading
            <Link
              href="https://designatyale.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ml-1"
            >
              Design at Yale
            </Link>
            .
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
