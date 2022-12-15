import React from 'react'
import './searchproduct.css'
import ProductComponent from '../../_components/Search/Product'
import Search from '../../_components/Search/Search'
import LisenseContext from '../../_context/LisenseContext'
import axios from 'axios'
export default function SearchProduct() {
  const { search } = React.useContext(LisenseContext)
  const [products, setProducts] = React.useState([])
 
React.useEffect(() => {
  getAllProducts()
},[])

const getAllProducts = async () => {
  await axios.get('https://dev.li-sense.xyz/api/v1/produtos/produtos?limit=50&offset=0').then((res) => {
    setProducts(res.data.items)
  })
}

  return (
    <>
      <div className="search-product">
        <h1>
          Resultados para: <span>{search}</span>
        </h1>
        <div className="serarch-section">
      
          <div className="search-product-right">
            {
              products.length > 1 &&
              products.map((value) => (
                <ProductComponent product={value}/>
              ))
            }
           
            
          </div>
        </div>
      </div>
    </>
  )
}
/*
  <Search />
*/