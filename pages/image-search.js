import React from 'react'
import axios from 'axios';
import Link from 'next/link'

export default function imageSearch({ products, query }) {
  console.log(query)
  return <div>

    <div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
      {
        products?.items?.map((pro) => {

          return (
            <div  key={pro.productId}>
              <div className="card w-auto bg-base-100 shadow-xl " >
                <a target="_blank" rel="noopener noreferrer" href={"https://www.aliexpress.com/item/" + pro.productId + ".html"}>
                  <figure>
                    <img src={pro.imageUrl} alt="Shoes" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">

                      <div className="badge badge-secondary">Average Rating: {pro.averageRating ?? ''}</div>
                    </h2>
                    <p> {pro.title}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Total Order: {pro.totalOrders ?? ''}</div>
                      <div className="badge badge-outline">Min Price: {pro.productMinPrice.value ?? ''}</div>
                    </div>
                  </div>

                </a>
              </div>
              
            </div>


          )



        })
      }
    </div>
  </div>





}
export async function getServerSideProps(context) {

  console.log(context.query)
  let  response= null
  try {
    response = await axios.post(process.env.API_BASE_URL + 'search-products', { url: context.query.url })
    
  } catch (error) {
    console.log(error)
  }
  
  return {
    props: {
      products: response?.data?.data||[],
      query: context.query
    }, // will be passed to the page component as props
  }
}