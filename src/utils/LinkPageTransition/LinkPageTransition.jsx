"use client";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { TransitionContext } from "@/lib/providers/TransitionProvider/TransitionProvider";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const LinkPageTransition = ({ href, children, ...rest }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsTransitionActive } = useContext(TransitionContext);

  const isExternalLink = (url) => {
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:")
    );
  };

  const handleTransition = async (e) => {
    if (isExternalLink(href)) {
      // For external links, open in a new tab
      window.open(href, "_blank", "noopener,noreferrer");
      e.preventDefault(); // Prevent the default link behavior
      return;
    }

    // For internal links
    e.preventDefault();

    // Check if the target href is different from the current pathname
    if (href !== pathname) {
      const body = document.querySelector("#page-transition");
      body.classList.add("page-transition");

      try {
        await setIsTransitionActive(true);
        await sleep(500);
        await router.push(href);
        await sleep(1000);
      } finally {
        body.classList.remove("page-transition");
        setIsTransitionActive(false);
      }
    } else {
      // If it's the same page, just prevent the default behavior
      console.log("Already on this page");
    }
  };

  if (isExternalLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest} onClick={handleTransition}>
      {children}
    </Link>
  );
};
