import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        className:
          "group rounded-xl border border-purple-300 bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-purple-100 dark:border-purple-600 shadow-lg px-5 py-3 transition-all duration-300 ease-in-out backdrop-blur-md",
        descriptionClassName: "text-sm mt-1 opacity-90",
        actionButtonClassName:
          "bg-purple-200 hover:bg-purple-300 dark:bg-purple-700 dark:hover:bg-purple-600 text-purple-900 dark:text-white px-3 py-1.5 rounded-md text-sm font-semibold transition",
        cancelButtonClassName:
          "text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-white text-sm transition",
      }}
      style={{
        "--normal-bg": "#f3e8ff", // Light pastel purple
        "--normal-text": "#4c1d95", // Deep readable purple
        "--normal-border": "#c084fc", // Soft border color
      }}
      {...props}
    />
  );
};

export { Toaster };
