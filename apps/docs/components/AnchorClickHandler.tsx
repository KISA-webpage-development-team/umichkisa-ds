"use client";

import { useEffect } from "react";

export function AnchorClickHandler() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest(
        "a[data-heading-anchor]"
      );
      if (!anchor) return;

      const url = new URL(anchor.getAttribute("href")!, window.location.href);
      navigator.clipboard.writeText(url.href).catch(() => {});
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
