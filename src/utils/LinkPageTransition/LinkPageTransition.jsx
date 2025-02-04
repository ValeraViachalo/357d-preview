"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TransitionContext } from "@/lib/providers/TransitionProvider/TransitionProvider";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const LinkPageTransition = ({ href, children, ...rest }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsTransitionActive } = useContext(TransitionContext);
  const [isLoading, setIsLoading] = useState(false);

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
      window.open(href, "_blank", "noopener,noreferrer");
      e.preventDefault();
      return;
    }

    e.preventDefault();

    if (href === pathname || isLoading) {
      return;
    }

    const body = document.querySelector("#page-transition");
    if (!body) {
      console.error("#page-transition element not found");
      router.push(href);
      return;
    }

    setIsLoading(true);
    body.classList.add("page-transition");

    try {
      await setIsTransitionActive(true);
      await sleep(500); // Initial transition effect

      // Start navigation
      const navigationPromise = router.push(href);
      
      // Setup a timeout for maximum waiting time
      const timeoutPromise = sleep(2000);
      
      // Wait for either navigation to complete or timeout
      await Promise.race([
        navigationPromise,
        timeoutPromise
      ]);

      // Add a small delay to ensure DOM is ready
      await sleep(100);

      // Check if the pathname has actually changed
      if (window.location.pathname === href || window.location.pathname === href + '/') {
        // Successfully navigated
        await sleep(400); // Final transition effect
      } else {
        // If navigation hasn't completed, wait a bit longer
        await sleep(1000);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      body.classList.remove("page-transition");
      setIsTransitionActive(false);
      setIsLoading(false);
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
    <Link 
      href={href} 
      {...rest} 
      onClick={handleTransition}
      className={`${rest.className || ''} ${isLoading ? 'pointer-events-none' : ''}`}
    >
      {children}
    </Link>
  );
};