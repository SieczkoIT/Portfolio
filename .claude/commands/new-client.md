Scaffold a new client demo — create the folder structure and a blank brief ready to fill in.

The client slug is: $ARGUMENTS
(e.g. "pizzeria-bella" — lowercase, hyphens, no spaces)

## Steps

1. Create the folder `clients/$ARGUMENTS/` with these files:
   - `index.html` — empty boilerplate (doctype, head with charset/viewport, empty body, links to styles.css and main.js)
   - `styles.css` — empty file with a comment: `/* Styles for $ARGUMENTS */`
   - `main.js` — empty file with a comment: `// JS for $ARGUMENTS`
   - `images/.gitkeep` — empty file to track the folder in git

2. Copy the brief template from `clients/_briefs/_template.md` to `clients/_briefs/$ARGUMENTS.md`. Replace `[BUSINESS NAME]` in the title with the slug.

3. Report back with:
   - The folder structure that was created
   - A reminder: "Fill in `clients/_briefs/$ARGUMENTS.md`, then run `/build-client $ARGUMENTS` to build the page."
   - Tip: run `/research-client <business name>` first to pre-fill the brief automatically.
