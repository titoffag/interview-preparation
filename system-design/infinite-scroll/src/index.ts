import { db } from "./utils/db.utils";
import { getItem, FeedItem } from "./utils/data.utils";
// import { ListComponent } from "./list";
import { LazyListComponent } from './lazy-list';

// DB init
const DB_SIZE = 1_000;
const DB = db({ size: DB_SIZE, pageSize: DB_SIZE, getItem });

// vars
const root = document.getElementById("app") as HTMLDivElement;
const pageSize = 10;
const itemMargin = 16;

const templateFn = (item: FeedItem) =>
  `<section class="feed__item">
    <img class="feed-item__image" alt ="${item.image.name}" src="${item.image.url}" />
    <div class="feed-item__description">
      <h2 class="feed-description__title>${item.title}</h2>
      <p class="feed-description__text">${item.description}</p>
    </div>
  </section>`.trim();

const updateItemFn = (
  element: HTMLElement,
  { title, description, image }: FeedItem
) => {
  element.style.display = "none";
  element.querySelector<HTMLImageElement>(".feed-item__image")?.src = image.url;
  element.querySelector(".feed-description__title")?.innerHTML = title;
  element.querySelector(".feed-description__text")?.innerHTML = description;

  return element;
};

// feed component init
const feed = new LazyListComponent<FeedItem>(root, {
  templateFn,
  // updateItemFn,
  load: () => DB.load(0, 10).then((cursor) => cursor.chunk),
  // pageSize,
  // itemMargin,
});

feed.render();
