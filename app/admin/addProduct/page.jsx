'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';  // Make sure you're importing toast if you're using it

const Page = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Smartphones and Accessories",
        author: "Aritra",
        authorImg: "/author_img.png"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        console.log(data);
    };

    const onSubmitHandler = async (e) => {  // Make sure to pass `e` as a parameter
        e.preventDefault();  // Prevent default form submission behavior
        const formData = new FormData();  // FormData should be capitalized
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);

        // Append the image if it's available
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(false);
                setData({
                    title: "",
                    description: "",
                    category: "Smartphones and Accessories",
                    author: "Aritra",
                    authorImg: "/author_img.png"
                });
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error("Submission failed. Please try again.");
            console.error("Error submitting the blog:", error);
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                
                <p className='text-xl mt-4'>Blog Title</p>
                <input 
                    name='title' 
                    onChange={onChangeHandler} 
                    value={data.title} 
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
                    type="text" 
                    placeholder='Type here' 
                    required
                />
                
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea 
                    name='description' 
                    onChange={onChangeHandler} 
                    value={data.description} 
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
                    placeholder='Write content here' 
                    rows={6} 
                    required
                />
                
                <p className='text-xl mt-4'>Blog Category</p>
                <select 
                    name="category" 
                    onChange={onChangeHandler} 
                    value={data.category} 
                    className='w-40 mt-4 px-4 py-3 border text-gray-500'
                >
                    <option value="Smartphones and Accessories">Smartphones and Accessories</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Laptops and Tablets">Laptops and Tablets</option>
                </select>
                
                <br />
                <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
            </form>
        </>
    )
}

export default Page;
