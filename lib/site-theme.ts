const DARK_CULTURE_SECTIONS = [
  "/about",
  "/events",
  "/interviews",
  "/books",
  "/music",
  "/cinema",
  "/festivals",
  "/giveaways",
] as const;

export function isDarkCulturePath(pathname: string) {
  return DARK_CULTURE_SECTIONS.some(
    (section) => pathname === section || pathname.startsWith(`${section}/`),
  );
}
