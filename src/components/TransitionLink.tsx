"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/context/TransitionContext";

type Props = React.ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link that plays the page transition
 * before navigating. Anchor-only hrefs (#foo), external URLs, and links
 * to the current page all pass through unchanged.
 */
export default function TransitionLink({ href, onClick, children, ...props }: Props) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
  const isInternal = hrefStr.startsWith("/") && !hrefStr.startsWith("//");
  const isSamePage = hrefStr === pathname;

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (isInternal && !isSamePage && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          navigate(hrefStr);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
