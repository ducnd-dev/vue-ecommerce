import ProductRepository from "./Repositories/Product";

type NameRepository = "product";
export default function getService(name: NameRepository) {
  switch (name) {
    case "product":
      return new ProductRepository();
      break;
    default:
      return null;
      break;
  }
}
