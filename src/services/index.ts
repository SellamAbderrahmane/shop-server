import { Container } from "typescript-ioc"
import { FileService, IFileService } from "./file-service"
import { IProductService, ProductService } from "./product-service"
import { IUserService, UserService } from "./user-service"

export * from "./product-service"
export * from "./user-service"
export * from "./file-service"

export function bindServices() {
  Container.bind(IUserService).to(UserService)
  Container.bind(IProductService).to(ProductService)
  Container.bind(IFileService).to(FileService)
}
