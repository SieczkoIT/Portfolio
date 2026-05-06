Build a complete client demo by running all specialist agents in sequence. Each agent's output feeds into the next.

The client slug is: $ARGUMENTS

## Pipeline

### Step 1 — Read the brief
Read `clients/_briefs/$ARGUMENTS.md` in full before starting. If it doesn't exist, stop and say: "Brief not found. Run `/research-client` first, then `/new-client $ARGUMENTS`."

### Step 2 — Designer
Invoke the designer agent to:
- Review the brief and any existing brand colours
- Finalise the 5-variable colour palette (`--bg`, `--surface`, `--accent`, `--text`, `--muted`) with hex codes
- Recommend a Google Fonts pairing (display + body)
- Describe the overall visual direction in 2–3 sentences (e.g. "dark and moody, gold accents, premium steakhouse feel")

Output from this step: finalised palette + typography + visual direction notes.

### Step 3 — Copywriter
Invoke the copywriter agent, passing it the brief AND the designer's visual direction notes. Ask it to write:
- Hero tagline
- About section (2–3 paragraphs with `<strong>` highlights)
- 4 highlight card texts (icon suggestion + title + description)
- Marquee strip items (6–8 phrases)
- Meta description
- Service/menu descriptions if not already in the brief

Output from this step: all Polish copy ready to be placed into the page.

### Step 4 — Builder
Invoke the builder agent, passing it the brief, the designer's palette and typography, and the copywriter's text. Ask it to build the complete page:
- `clients/$ARGUMENTS/index.html`
- `clients/$ARGUMENTS/styles.css`
- `clients/$ARGUMENTS/main.js`
- `clients/$ARGUMENTS/images/.gitkeep`

The builder must use the exact palette from Step 2 and the exact copy from Step 3.

### Step 5 — QA reviewer
Invoke the qa-reviewer agent on the newly built files. It checks the full checklist and reports any issues.

### Step 6 — Fix & finalise
If the QA reviewer found issues, fix them now before reporting back.

### Final report
Summarise:
- Palette chosen and why
- Sections built
- All PLACEHOLDER comments added
- Anything invented or guessed (not in brief) — needs client confirmation
- QA result: Ready to show client / Issues fixed / Issues remaining
