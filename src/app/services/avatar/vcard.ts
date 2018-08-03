export interface Vcard {
  fn?: string;
  prodid?: string;
  photo?: {
    type: string;
    data?: string;
    url?: string;
  };
}
