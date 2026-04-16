// this is the component(component/DarkThemeTogggle.jsx)

import { Sun, Moon } from "lucide-react";

function DarkModeToggle({ dark }) {
  const [isDark, setIsDark] = useState(false);

  const toggle = () => {
    const html = document.documentElement;
    const next = !isDark;
    if (next) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.removeAttribute("data-theme");
    }
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
        dark
          ? "text-slate-300 hover:text-white hover:bg-white/10"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

// add this button navbar/where ever you want
<DarkModeToggle />;

/**
 *  and after this, you can implement dark theme using dark:
 *
 * like <p className="text-black dark:text-white">
 *        This is dark mode example
 *      </p>
 * */
