"use client"
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useRef, useEffect } from "react"

const EditProduct = ({searchParams}: { searchParams: { product: string }}) => {

    const [image, setImage] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("0");
    const [loading, setLoading] = useState(true);

    const titleInputElement = useRef<HTMLInputElement>(null);
    const descriptionInputElement = useRef<HTMLTextAreaElement>(null);
    const priceInputElement = useRef<HTMLInputElement>(null);

    const route = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProduct =async () => {
            const response = await fetch('https://fakestoreapi.com/products/' + searchParams.product);
            const data = await response.json();
            if(titleInputElement.current && descriptionInputElement.current && priceInputElement.current ) {
                titleInputElement.current.value = data.title;
                descriptionInputElement.current.value = data.description;
                priceInputElement.current.value = data.price;
                setImage(data.image);
                setSelectedCategory(data.category)
            }
            setLoading(false);
        }
        fetchCategories();
        fetchProduct();
    }, [])
    
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (checkFields())
            console.log('You cannot leave empty fields');
        else {

            const reqHeaders = {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleInputElement.current?.value,
                    description: descriptionInputElement.current?.value,
                    price: priceInputElement.current?.value,
                    category: selectedCategory,
                    image
                })
            }

            const response = await fetch('https://fakestoreapi.com/products/' + searchParams.product, reqHeaders)
            
            if (response.ok)
                return route.push('/my-products')
            else 
                console.log(response);

        }
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target?.value);
    };

    const uplaodImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    }

    const checkFields = () => (titleInputElement.current?.value == "" || descriptionInputElement.current?.value == "" || priceInputElement.current?.value == "" || image == null || selectedCategory == "0");


    if (loading) return (
        <div className="fit-height w-full flex items-center justify-center">
            <h1>Loading ...</h1>
        </div>
    )
    else
        return (
        <form className="bg-gray-100" onSubmit={handleFormSubmit}>
            <div className="fit-height md:px-20 pt-6">
                <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto mb-5 shadow-xl">
                    <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">EDI PRODUCT</h1>
                    <div className="space-y-4">
                        <div className="icons flex items-center">
                        <p className="text-lx font-serif mr-5">Image: </p>
                            <label id="select-image">
                                <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            <input hidden type="file" multiple onChange={uplaodImage} x-ref="fileInput" />

                            </label>
                        </div>

                        {image ?
                            <div className="relative w-32 h-32 object-cover rounded ">
                                <div className="relative w-32 h-32 object-cover rounded">
                                    <img src={image} className="w-32 h-32 object-cover rounded" />
                                    <button onClick={() => setImage(null)} className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                                </div>
                            </div>
                            : ''
                        }
                        <div>
                            <label className="text-lx font-serif">Title:</label>
                            <input ref={titleInputElement} type="text" placeholder="title" id="title" className="w-11/12 ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
                        </div>
                        <div>
                            <label className="text-lx font-serif">Price: &nbsp;&nbsp;&nbsp; $ </label>
                            <input ref={priceInputElement} type="number" placeholder="price" id="title" className="outline-none w-28 py-1 px-2 text-md border-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg font-serif">Description:</label>
                            <textarea ref={descriptionInputElement} id="description" cols={30} rows={10} placeholder="Tell us about the product.." className="w-full font-serif outline-none border-2 p-4 text-gray-600 rounded-md"></textarea>
                        </div>
                        <div className="flex flex-row items-center">
                            <label className="text-lx font-serif mr-3">Category:</label>
                            <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            name="category"
                            className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="0" disabled>-- select --</option>
                                {categories.map((cat: string, index: number) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-row align-center">
                            <button
                                type="submit"
                                disabled={checkFields()}
                                className=" disabled:bg-slate-300 disabled:text-slate-500 px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
                            >EDIT</button>

                            <button
                                onClick={() => route.push('/my-products')}
                                className=" bg-slate-400 text-slate-800 px-6 py-2 mx-auto block rounded-md text-lg font-semibold "
                            >CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        )
}

export default EditProduct;