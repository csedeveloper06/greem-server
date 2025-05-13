//  title        String
//   categoryId   String
//   authorId     String
//   statement    String
//   solution     String
//   description  String
//   productPhoto String
//   publish      Boolean      @default(false)
//   price        Float?

export type TIdeaFilterRequest = {
  title?: string | undefined;
  category?: string | undefined;
  author?: string | undefined;
  searchTerm?: string | undefined;
};
