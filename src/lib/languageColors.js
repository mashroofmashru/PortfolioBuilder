// GitHub's colours for common languages. Unknown languages fall back to the CSS default.
const LANG_COLORS = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5', Java: '#B07219',
  HTML: '#E34C26', CSS: '#7B5BD6', 'C++': '#F34B7D', C: '#6B7280', 'C#': '#178600',
  Go: '#00ADD8', Rust: '#DEA584', PHP: '#4F5D95', Ruby: '#CC342D', Swift: '#F05138',
  Kotlin: '#A97BFF', Dart: '#00B4AB', Shell: '#89E051', Vue: '#41B883', SCSS: '#C6538C',
};

export const languageColor = (language) => LANG_COLORS[language];
