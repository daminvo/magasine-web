"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/AuthProvider";
import DeleteDialog from '@/components/DeleteDialog'
import Link from 'next/link';
import EditProduct from '@/app/my-products/edit/page';

const MyProduct = () => {
    type Product = {
        id: number,
        title: string,
        price: number,
        category: string,
        description: string,
        image: string
    }
    type ShowDeleteType = {
        state: boolean,
        id: number | null
    }
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const [showDeleteDialog, setShowDeleteDialog] = useState<ShowDeleteType>({
        state: false,
        id: null,
    });

    const auth = useAuth();

    useEffect(() => {
        
        const getProducts =async () => {
            if (auth.token && !auth.isLoading) {
                const response = await fetch('https://fakestoreapi.com/products').then(res => res.json());
                
                setProducts(response);
            }
            
        }
        getProducts()
    }, [auth.isLoading])

    const handleDelete = async () => {
        const headers = {
            method: "DELETE"
        }
        const response = await fetch('https://fakestoreapi.com/products/' + showDeleteDialog.id, headers)
        console.log(response);
        if (response.ok) 
            setShowDeleteDialog({state: false, id: null})
        else
            console.log("something went wrong");
        
    }
    const handleCancel = () => {
        setShowDeleteDialog({state: false, id: null})
    }
    return (
        <div className="container mx-auto mt-20 flex flex-col">
            <Link href="/my-products/add" passHref className="p-2 m-2 font-semibold text-gray-700 rounded border border-purple-500 self-end">Add Product</Link>
            {showDeleteDialog.state && 
            <DeleteDialog handleDelete={handleDelete} handleCancel={handleCancel}></DeleteDialog>
            }
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center">Image</th>
                        <th className="py-3 px-6 text-center">Title</th>
                        <th className="py-3 px-6 text-center">Category</th>
                        <th className="py-3 px-6 text-center">Price</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                            <div className="mr-2">
                                <Image className="mx-auto w-6 h-6 rounded-sm " src={product.image} alt="" width={50} height={50}></Image>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            <h5 className="font-medium text-ellipsis whitespace-nowrap overflow-hidden max-w-60">{product.title}</h5>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <p>{product.category}</p>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">${product.price}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <Link  href={`/my-products/edit?product=${product.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </Link>
                                <div onClick={() => setShowDeleteDialog({state: true, id: product.id})} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                    </tr>

                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyProduct;