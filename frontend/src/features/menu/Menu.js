import { useState,  } from 'react';
import Products from './Products';
import { useParams } from 'react-router-dom'
import { useGetCategoryProductsQuery } from './productsApiSlice';
import { PulseLoader } from 'react-spinners';

const Menu = () => {

    const { category } = useParams()

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoryProductsQuery(category, {
      pollingInterval: 10000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    })

    const [sort, setSort] = useState("newest");

    let content

    if (isLoading) content = (
      <div className="flex justify-center">
          <PulseLoader  color={"#FFF"} />
      </div>
    )

    if (isSuccess) {
      const {ids} = products

      const productListContent = ids?.length
          ? ids.map(productId => <Products key={productId} productId={productId} category={category} sort={sort}/>)
          : null

      const consoleLogs = () => {
          console.log('Menu products', products)
          console.log('Menu ids', ids)
      }

      content = (
        <>
          <div>
            <div id='container' className='mx-auto w-3/5'>
              <div id='filter-container' className='flex justify-between'>
                <div id='filter' className='m-20 sm:w-[0px_20px]'>
                  <label id='filter-text' className='text-lg font-semibold'>{category}</label>
                </div>
                <div id='filter' className='m-20 sm:w-[0px_20px]'>
                  <label id='filter-text' className='text-lg font-semibold'>Sort Products:</label>
                  <select defaultValue={'All'} className='mr-5 p-2.5 border sm:mr-0 sm:my-4' onChange={(e) => setSort(e.target.value)}>
                    <option value='Newest'>Newest</option>
                    <option value='Price (asc)'>Price (asc)</option>
                    <option value='Price (desc)'>Price (desc)</option>
                  </select>
                </div>
              </div>
              <div>
                <button className='border bg-red-700' onClick={consoleLogs}>Click Here</button>
              </div>
              <div className="flex flex-wrap justify-between p-5">{productListContent}</div>
              
            </div>
          </div>
        </>
      )
    }

    if (isError) {
      content = (
        <>
            <p className="flex justify-center">{error?.data?.message}</p>
        </>
      )
    }
    return content
};

export default Menu;
