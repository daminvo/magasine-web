"use client"
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'


const Shop = () => {
    type Product = {
        id: number,
        title: string,
        description: string,
        price: number,
        category: string,
        image: string
    }
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>(['All']);
    const [cat, setCat] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                const data = await response.json();
                setCategories([categories, ...data].filter((value, index, array) => array.indexOf(value) === index));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = cat == 'All' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${cat}`
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [cat]);

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCat(e.target?.value);
    };

    const router = useRouter();
    const displayProduct = (id: number) => {
        router.push('/shop/' + id)
    }


    const search = (event: ChangeEvent<HTMLInputElement>) => setFilteredProducts(products.filter((p) => p.title.toLowerCase().includes(event.target.value.toLowerCase())))

    return (
    <>
    <main className="container mx-auto my-20">
        <div className="m-4 mx-auto flex justify-center items-center">
            <input
                onChange={search}
                autoComplete="off"
                className="max-w-96 w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Search"
            />
            <h2 className="text-lg mr-3 ml-6 font-thin">Select Category:</h2>
            <select
              value={cat}
              onChange={handleCategoryChange}
              name="categories"
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {
                categories.map((category, index) => (
                    <option key={index} >{category}</option>
                ))
                }
            </select>
        </div>
        <div className="container mx-auto px-6">
            <div className="mt-16">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    { loading ? (
                        <h1>Loading ...</h1>
                    ) : (
                    filteredProducts.map((product) => (
                        <div onClick={() => displayProduct(product.id)} key={product.id} className="flex flex-col justify-between  w-full max-w-sm mx-auto rounded-md shadow-md cursor-pointer overflow-hidden">
                            <div className="flex items-end justify-end h-56 w-full relative">
                                <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    src={product.image}
                                    alt={`product-${product.id}`}
                                    className="h-full w-auto absolute top-0 bottom-0 right-0 left-0 mx-auto"
                                ></Image>
                            </div>
                            <div className=" py-3 px-5">
                                <h2 className="text-gray-700">{product.title}</h2>
                                <div className="flex justify-between mt-5">
                                    <span className="text-gray-500 mt-2">${product.price}</span>
                                    <p className="px-2 h-6 rounded-md primary-color-borders text-black mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 z-10">{product.category}</p>
                                </div>
                            </div>
                        </div>
                    ))
                    )}
                  
                </div>
            </div>
        </div>
    </main>

    </>
    )
}

export default Shop;