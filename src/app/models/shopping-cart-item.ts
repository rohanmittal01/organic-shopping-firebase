import { Product } from './product';

export interface ShoppingCartItem{
    product: {title: Product['title'], price: Product['price'], category: Product['category'], imageUrl: Product['imageUrl'] };
    quantity: number;
}
