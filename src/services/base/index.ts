
import { BaseRepositoryInterface } from "./index.d";
export abstract class BaseRepository implements BaseRepositoryInterface {
    prefix: string
  
    constructor(prefix: string) {
      this.prefix = prefix
    }
  }