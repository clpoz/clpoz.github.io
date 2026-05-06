# Linzhi Chen's Academic Homepage

This repository hosts Linzhi Chen's personal academic homepage:

```text
https://clpoz.github.io/
```

It is a pure static GitHub Pages site, so it does not require Jekyll, Ruby,
Node.js, or a build step.

## Files

- `index.html`: page content, including About, News, Publications, CV, Teaching, and Contact.
- `styles.css`: visual style and responsive layout.
- `assets/profile-placeholder.png`: profile image.
- `assets/cv.pdf`: optional CV file, to be added later.

## Local Preview

Open `index.html` directly in a browser, or run a tiny local server from this
directory:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deployment

The remote repository is expected to be:

```text
git@github.com:clpoz/clpoz.github.io.git
```

To publish updates:

```bash
git add .
git commit -m "Update academic homepage"
git push
```

In GitHub, open `Settings -> Pages`, then use:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

GitHub Pages usually publishes the site within a few minutes.

## Maintenance

- Add `assets/cv.pdf` and change the CV button in `index.html` from email request to direct download.
- Add PDF, code, project, or slide links to the NDSS 2026 publication when available.
- Add exact month/day to the NDSS 2026 news item if desired.
