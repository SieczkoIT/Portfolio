Review all staged and unstaged changes in this static portfolio site, then ship them.

Steps to follow in order:

1. **Review** — run `git diff HEAD` and `git status` to see what changed. Read any modified files in full if needed to understand the context.

2. **Suggest** — identify any issues: broken i18n keys missing from one language in `js/translations.js`, HTML attribute mistakes (`data-i18n` / `data-i18n-html` / `data-i18n-placeholder`), CSS variable misuse, accessibility problems, or anything that looks like a bug. List each issue clearly. If there are fixable problems, fix them before committing.

3. **Commit** — stage all relevant changes and create a commit with a clear, specific message describing what actually changed (not generic). Follow the existing commit style from `git log`.

4. **Push** — push to `origin main`.

This is a plain HTML/CSS/JS site with no build step. The main files are `index.html`, `css/styles.css`, `js/main.js`, and `js/translations.js`. Client demo files live in `clients/`.
