import { NewsItem } from '../data/mockData';

let bookmarksList: NewsItem[] = [];

export const bookmarks = {
  getAll: (): NewsItem[] => {
    return bookmarksList;
  },
  
  isBookmarked: (item: NewsItem): boolean => {
    return bookmarksList.some(
      (bookmark) =>
        bookmark.title === item.title &&
        bookmark.stock === item.stock &&
        bookmark.source === item.source
    );
  },
  
  add: (item: NewsItem): void => {
    if (!bookmarks.isBookmarked(item)) {
      bookmarksList.push(item);
    }
  },
  
  remove: (item: NewsItem): void => {
    bookmarksList = bookmarksList.filter(
      (bookmark) =>
        !(
          bookmark.title === item.title &&
          bookmark.stock === item.stock &&
          bookmark.source === item.source
        )
    );
  },
  
  toggle: (item: NewsItem): boolean => {
    if (bookmarks.isBookmarked(item)) {
      bookmarks.remove(item);
      return false;
    } else {
      bookmarks.add(item);
      return true;
    }
  },
};
