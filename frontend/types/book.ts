export interface Book {
    id: string;
    googleBookId : string;
    volumeInfo: {
      title: string;
      authors: string[];
      description: string;
      categories: string[];
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
      };
      language: string;
      pageCount: number;
      publishedDate: string;
      publisher: string;
      ratingsCount: number;
      averageRating: number;
    };
    saleInfo: {
      buyLink: string;
      listPrice: {
        amount: number;
        currencyCode: string;
      };
      retailPrice: {
        amount: number;
        currencyCode: string;
      };
      isEbook: boolean;
      saleability: string;
    };
    accessInfo: {
      embeddable: boolean;
      epub: {
        isAvailable: boolean;
        acsTokenLink: string;
      };
      pdf: {
        isAvailable: boolean;
        acsTokenLink: string;
      };
      webReaderLink: string;
      publicDomain: boolean;
      quoteSharingAllowed: boolean;
      accessViewStatus: string;
      textToSpeechPermission: string;
      viewability: string;
    };
    searchInfo: {
      textSnippet: string;
    };
    etag: string;
    selfLink: string;
    kind: string;
  }
