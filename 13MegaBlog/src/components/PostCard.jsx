import React from 'react'
import appwriteService from '../appwrite/config' // Appwrite service import kiya, jisse files ke preview URLs fetch karte hain
import { Link } from 'react-router-dom' // Link component import kiya, jo react-router-dom se aata hai

function PostCard({ $id, title, featuredImage }) { // PostCard component jo post ki details ko props ke through accept karta hai
  return (
    <Link to={`/post/${$id}`}> {/* Link component, jo post ID ke base pe specific post detail page par le jata hai */}
        <div className='w-full bg-gray-100 rounded-xl p-4'> {/* Card ke liye container, jo styling ko handle karta hai */}
            <div className="w-full justify-center mb-4"> {/* Image container */}
                <img 
                  src={appwriteService.getFilePreview(featuredImage)} // Featured image ka URL fetch kiya aur image tag me set kiya
                  alt={title} // Image ka alt text jo post ke title ke equal hai
                  className='rounded-xl' // Image ke liye styling
                />
            </div>
            <h2 className="text-xl font-bold ">{title}</h2> {/* Post title jo image ke neeche dikhaya jayega */}
        </div>
    </Link>
  )
}

export default PostCard
