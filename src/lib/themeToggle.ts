export const toggleTheme = () => {
  if (
    localStorage.theme === "dark" ||
    localStorage.theme === undefined ||
    (localStorage.theme === "" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "dark";
  }
};
