import React from 'react'
import axios from 'axios'
import { Components } from '../../_components/Components'
import './Home.css'
import { data } from '../../FakeData'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const [products, setProducts] = React.useState([])
  const navigate = useNavigate();
  React.useEffect(() => {
     axios.get("https://dev.li-sense.xyz/api/v1/produtos/produtos?limit=50&offset=0")
    .then((res) => {

       setProducts(res.data.items);
    });

  },[])
  return (
    <>
      <div className="container-home">
        <div className="">
         
        </div>
        <div className="cards">
          {
            products.length > 0 &&
            products.map((_value, key) => (
              <Components.Card data={_value} key={key} />
            ))
          }
        </div>
        <button className="filter" onClick={() => {navigate('/search')}}>Ver mais</button>
      </div>
    </>
  )
}

/*
 <Components.Filters />
*/
