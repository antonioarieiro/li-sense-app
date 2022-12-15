import React from 'react'
import './product.css'
import { RiStarSFill } from 'react-icons/ri'
import LisenseContext from '../../_context/LisenseContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Product(props) {
  const { search, addItemInCart, setCurrentProduct } = React.useContext(LisenseContext)
  const { product } = props
  const [owner, setOwner] = React.useState('')
  const navigate = useNavigate()
  React.useEffect(() => {
    getOwner(product.id)

  },[])

  const getOwner = async (id) => {
    await axios.get(`https://dev.li-sense.xyz/api/v1/usuarios/${id}`).then((res) => {
      setOwner(res.data.nome)
      
    })
  }
  const setProduct = (product) => {
    setCurrentProduct(product);
    navigate(`/product/${product.id}`);
  };

  return (
    <>
   
        <div className="product" key={product}>
        <div className="product-img">
          <img src={product.imagem_produto} />
        </div>
        <div className="product-body" onClick={() => { setProduct(product)}}>
          <div className="product-body-stars">
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            
          </div>

          <h2>
           {product.nome}
          </h2>
          <h3>Vendido por:  {owner}</h3>
        </div>
        <div className="product-cart">
          <h2>{product.preco},00 R$</h2>
          <button onClick={() => { addItemInCart(product)}}>Adicionar ao Carrinho</button>
        </div>
      </div>
     
   
    </>
  )
}

/*
<span>50 avaliações</span>
*/