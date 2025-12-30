import { NewsItem } from '../data/mockData';

export interface BookmarkedItem extends NewsItem {
  note?: string;
}

let bookmarksList: BookmarkedItem[] = [];

export const bookmarks = {
  getAll: (): BookmarkedItem[] => {
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
  
  updateTag: (item: NewsItem, tag: string): void => {
    const bookmark = bookmarksList.find(
      (b) =>
        b.title === item.title &&
        b.stock === item.stock &&
        b.source === item.source
    );
    if (bookmark) {
      bookmark.tag = tag;
    }
  },
  
  updateNote: (item: NewsItem, note: string): void => {
    const bookmark = bookmarksList.find(
      (b) =>
        b.title === item.title &&
        b.stock === item.stock &&
        b.source === item.source
    );
    if (bookmark) {
      bookmark.note = note;
    }
  },
};
