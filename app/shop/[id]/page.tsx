"use client"
import { useEffect, useState } from "react";


const Product = ({params}: { params: { id: string }}) => {
    type Product = {
        id: number,
        title: string,
        price: number,
        category: string,
        description: string,
        image: string
    }
    const [product, setProduct] = useState<Product>({} as Product);



    useEffect(() => {
        const fetchProduct =async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/' + params.id ).then( res => res.json());
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
        
    }, [])

    return (
        <div className="md:flex md:items-start mt-20">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
            <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={ product.image } alt="prod image" />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <span className="text-gray-900 mb-6 w-full text-left block text-xl">${ product.price }</span>
            <h3 className="text-gray-700 uppercase text-lg">{ product.title }</h3>
            <hr className="my-3" />
            <p>{ product.description }</p>
            <div className="flex items-center mt-6">
                <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
            </div>
        </div>
    </div>
    )
}

export default Product;