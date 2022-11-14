# What is this?

This directory contains the LaTeX code to render Markdown documents to PDF (with custom styling, of course, otherwise I would have used Pandoc).

The whole building process is meant to be done manually. I could have automated it to the build process but I decided not to, for a couple of reasons:

- For it to be automated, we need to install LaTeX. Not sure if Vercel is happy with that. For sure I am not happy with that.
- We need the font too. I have Menlo preinstalled but other OS may need to install it manually. _Mendokusai_.
- This is needed very few times in each Milestone. Not something worth running regularly.

## How to use

1. Skim through this list. Continue if you want to, otherwise ping @joulev.
1. Install LaTeX. If you don't want to, stop reading and ping @joulev. Warning: It is a few GBs and will take from 30 mins to 6 hours depending on your Internet connection.
1. Copy the Markdown content of the necessary MDX file (not the whole file; remove the JSX at the top)
1. Edit the `\title`, `\author` and `\date` accordingly.
1. Run `lualatex main.tex` **twice**.
1. Use `main.pdf` however you like.
1. Revert any changes you made to `main.tex`.
