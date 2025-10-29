export interface IProduct {
    id: string
    name: string
    summary: string
    description: string
    imageFile: string
    brands: Brand
    types: Type
    price: number
}

export interface Brand{
     name: string
    id: string
}
export interface Type{
 name: string
    id: string
}