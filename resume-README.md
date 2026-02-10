# Resume (LaTeX)

One-page resume for Tejas Pawar, generated from portfolio and `data/assistant/knowledge.json`.

## Build PDF locally

You need a LaTeX distribution (e.g. [MiKTeX](https://miktex.org/) or [TeX Live](https://www.tug.org/texlive/) on Windows).

```bash
pdflatex resume.tex
```

Run twice if you use hyperref (for correct links). Output: `resume.pdf`.

## Build online (no install)

1. Copy the contents of `resume.tex` into [Overleaf](https://www.overleaf.com/) (New Project → Blank Project).
2. Click **Recompile**. Download the PDF.

## Updating the resume

- Edit `resume.tex` to change content.
- Keep it to one page by shortening bullets or the Selected Project section if you add more experience.
