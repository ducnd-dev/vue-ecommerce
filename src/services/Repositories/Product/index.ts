import request from "@/plugins/request";
import { BaseRepository } from "@/services/base";

export default class ProductRepository extends BaseRepository{
    constructor(){
        super('/api/v1/products')
    }
    async getProduct(param:Record<string,any>){
        try {
            const result = await request.get(this.prefix,param)
            return Promise.resolve(result.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}