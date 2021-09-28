interface IBookmarkImage {
  id: string;
  url: string;
};
export interface IBookmark {
  id: number;
  user_id: string;

  image: IBookmarkImage;

  created_at: string;
};
