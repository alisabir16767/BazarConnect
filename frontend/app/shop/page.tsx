import React from "react";


export default function NewShopPage() {
  return (
   <>
   <form action="">
       
        <div className="flex flex-col gap-4">
          <label htmlFor="shopName">Shop Name</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            placeholder="Enter your shop name"
            className="border p-2 rounded"
          />
        </div>
  
        <div className="flex flex-col gap-4">
          <label htmlFor="shopDescription">Shop Description</label>
          <textarea
            id="shopDescription"
            name="shopDescription"
            placeholder="Enter a brief description of your shop"
            className="border p-2 rounded"
          ></textarea>
        </div>
  
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Shop
        </button>
   </form>
   </>
  )
}