import { Product } from "./product.model";

export interface CreateOrUpdateProductDetailsRequestDto{
    email: string,
    password: string,
    product : Product
}