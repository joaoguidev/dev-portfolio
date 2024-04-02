module.exports = {
   tailwindConfig: './tailwind.config.js',
   plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
   organizeImportsSkipDestructiveCodeActions: true,
   tailwindFunctions: ["clsx"],
   tabWidth: 3,
   printWidth: 500,
   semi: false,
   bracketSameLine: true
};

