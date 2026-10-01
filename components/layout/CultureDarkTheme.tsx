type CultureDarkThemeProps = {
  children: React.ReactNode;
};

export default function CultureDarkTheme({ children }: CultureDarkThemeProps) {
  return <div className="culture-dark-theme">{children}</div>;
}
