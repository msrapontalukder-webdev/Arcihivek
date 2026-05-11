export interface Product {
  _id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
}
