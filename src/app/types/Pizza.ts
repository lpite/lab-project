export interface Pizza {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inFuture?: boolean;
  categoryId: number;
}
