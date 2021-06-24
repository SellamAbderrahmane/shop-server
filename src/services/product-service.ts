import Product from "../models/Product"
import { Singleton } from "typescript-ioc"
import { Service } from "./Service"

export abstract class IProductService {}

@Singleton
export class ProductService extends Service implements IProductService {
  constructor() {
    super(Product)
  }

  getY() {
    return "hello"
  }
}
