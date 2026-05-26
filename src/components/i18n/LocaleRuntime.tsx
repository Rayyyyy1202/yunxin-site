"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type Locale,
  localizeText,
  toLocalizedPath,
} from "@/lib/i18n";

interface LocaleRuntimeProps {
  locale: Locale;
}

const TEXT_ATTRIBUTE_NAMES = ["aria-label", "alt", "title"];
const LOCALE_SWITCHER_SELECTOR = "[data-locale-switcher]";

function shouldSkip(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(
    parent.closest(
      "script,style,noscript,textarea,input,select,option,svg,[data-no-localize]",
    ),
  );
}

function convertTextNodes(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (!shouldSkip(node) && node.nodeValue) {
      const nextValue = localizeText(node.nodeValue, locale);
      if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
    }
    node = walker.nextNode();
  }
}

function convertAttributes(root: ParentNode, locale: Locale) {
  const elements =
    root instanceof Element
      ? [root, ...Array.from(root.querySelectorAll("*"))]
      : Array.from(root.querySelectorAll("*"));

  for (const element of elements) {
    if (element.closest("svg,[data-no-localize]")) continue;
    for (const attributeName of TEXT_ATTRIBUTE_NAMES) {
      const value = element.getAttribute(attributeName);
      if (value) {
        const nextValue = localizeText(value, locale);
        if (nextValue !== value) element.setAttribute(attributeName, nextValue);
      }
    }
  }
}

function rewriteInternalLinks(root: ParentNode, locale: Locale) {
  const links =
    root instanceof HTMLAnchorElement
      ? [root, ...Array.from(root.querySelectorAll("a[href]"))]
      : Array.from(root.querySelectorAll<HTMLAnchorElement>("a[href]"));

  for (const link of links) {
    if (link.closest(LOCALE_SWITCHER_SELECTOR)) continue;

    const href = link.getAttribute("href");
    const localized = toLocalizedPath(locale, href ?? undefined);
    if (localized && localized !== href) {
      link.setAttribute("href", localized);
    }
  }
}

export default function LocaleRuntime({ locale }: LocaleRuntimeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = (root: ParentNode) => {
      convertTextNodes(root, locale);
      convertAttributes(root, locale);
      rewriteInternalLinks(root, locale);
    };

    run(document.body);
    document.documentElement.lang = locale;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.nodeValue) {
          if (!shouldSkip(mutation.target)) {
            const nextValue = localizeText(
              mutation.target.nodeValue,
              locale,
            );
            if (nextValue !== mutation.target.nodeValue) {
              mutation.target.nodeValue = nextValue;
            }
          }
          continue;
        }

        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            run(node as Element);
          } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
            const currentValue = node.nodeValue ?? "";
            const nextValue = localizeText(currentValue, locale);
            if (nextValue !== currentValue) node.nodeValue = nextValue;
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [locale, pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.closest(LOCALE_SWITCHER_SELECTOR)) return;

      const href = anchor.getAttribute("href");
      const localized = toLocalizedPath(locale, href ?? undefined);
      if (!localized || localized === href) return;

      event.preventDefault();
      router.push(localized);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [locale, router]);

  return null;
}
