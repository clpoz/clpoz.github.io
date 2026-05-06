const DATA_PATHS = {
  news: "data/news.json",
  publications: "data/publications.json",
  teaching: "data/teaching.json"
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const loadJson = async (path) => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return response.json();
};

const formatAuthors = (authors = []) => {
  const names = authors.map((author) => {
    const name = escapeHtml(author.name);
    return author.me ? `<strong>${name}</strong>` : name;
  });

  if (names.length <= 2) {
    return names.join(" and ");
  }

  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
};

const renderNews = (items) => {
  const list = document.querySelector("#news-list");

  list.innerHTML = items
    .map(
      (item) => `
        <li>
          <time datetime="${escapeHtml(item.datetime || item.date)}">${escapeHtml(item.date)}</time>
          <span>${escapeHtml(item.text)}</span>
        </li>
      `
    )
    .join("");
};

const renderPublications = (items) => {
  const list = document.querySelector("#publications-list");

  list.innerHTML = items
    .map((item) => {
      const links = (item.links || [])
        .map(
          (link) =>
            `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`
        )
        .join("");

      return `
        <article class="publication">
          <div class="venue">${escapeHtml(item.venue)}</div>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="authors">${formatAuthors(item.authors)}</p>
            <p class="pub-meta">${escapeHtml(item.meta)}</p>
            ${links ? `<div class="pub-links">${links}</div>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
};

const renderTeaching = (items) => {
  const list = document.querySelector("#teaching-list");

  list.innerHTML = items
    .map(
      (item) => `
        <li>
          <strong>${escapeHtml(item.course)}</strong>, ${escapeHtml(item.role)}, ${escapeHtml(item.term)}.
        </li>
      `
    )
    .join("");
};

const renderError = (selector, label) => {
  const element = document.querySelector(selector);
  element.innerHTML = `<span class="loading">Unable to load ${label}.</span>`;
};

Promise.all([
  loadJson(DATA_PATHS.news).then(renderNews).catch(() => renderError("#news-list", "news")),
  loadJson(DATA_PATHS.publications)
    .then(renderPublications)
    .catch(() => renderError("#publications-list", "publications")),
  loadJson(DATA_PATHS.teaching)
    .then(renderTeaching)
    .catch(() => renderError("#teaching-list", "teaching"))
]);
