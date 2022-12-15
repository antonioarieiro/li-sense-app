import React from "react";
import "./editprod.css";
import { useNavigate } from "react-router-dom";
import LisenseContext from "../../_context/LisenseContext";
import axios from "axios";
import {_web3} from '../../_service/Web3Storage'
export default function EditProduct(props) {
  const {currentProduct} = React.useContext(LisenseContext)
  const { product } = props;
  const [name, setName] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [isErr, setIsErr] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [detalhes, setDetalhes] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [productImage, setProductImage] = React.useState("");

  const navigate = useNavigate();

  const editProduct = async () => {
    let data = {
      nome: name,
      descricao: descricao,
      preco: preco,
      detalhes: detalhes,
      categoria: categoria,
      imagem_produto: productImage
    };
    const auth = localStorage.getItem("token");
    axios
      .put(`https://dev.li-sense.xyz/api/v1/produtos/${currentProduct.id}`, data, {
        headers: {
          Authorization: auth,
        },
      })
      .then(function (response) {
        if (response.status) {
          alert(`Produto ${response.data.nome} Editado com sucesso`);
          navigate("/");
        }
      })
      .catch((_err) => {
        setIsErr(_err.response.data.detail);
      });
  };
  const uploadImage = async (file) => {
    let name = file.files[0].name.toString()
    console.log("name", name)
  let request =  await _web3.uploadNewFile(file.files, name)
  console.log(request)
  setProductImage(request)

  }


  return (
    <>
      <div>
        <div className="container-all-edit">
          <span className="tilte-prod">Editar Informações do Produto</span>
          <div className="container-imagem-produto">
            <div className="input-wrapper-prod">
              <label className="picture" for="picture-input" tabIndex="0">
                <span className="picture-image">Escolher novas imagens</span>
              </label>

              <input
           
                type="file"
                name="picture-input"
                id="picture-input"
                multiple
                onChange={(event) => {uploadImage(event.target)}}
              ></input>
            </div>

            <div className="new-infos-prod">
              <label className="infos-prod-l">Nome do Produto</label>
              <input className="new-prod" onChange={(event) => {setName(event.target.value)}} placeholder={currentProduct.nome}></input>
              <label className="infos-prod-l">Preço</label>
              <input className="new-prod"  onChange={(event) => {setPreco(event.target.value)}} placeholder={currentProduct.preco}></input>
              <label className="infos-prod-l">Categoria do Produto</label>
              <input className="new-prod" onChange={(event) => {setCategoria(event.target.value)}}  placeholder={currentProduct.categoria}></input>
            </div>
          </div>
          <div className="container-detalhes">
            <div className="title-det">
              <p>
                Insira as novas informações/detalhes do seu produto ao lado{" "}
              </p>
            </div>
            <textarea
              className="detalhes-produto"
              placeholder="digite aqui..."
              onChange={(event) => {setDescricao(event.target.value)}}  
            />
          </div>
         

          <div className="botoes">
            <button className="btn-salvar" onClick={() => {editProduct()}}>
              Salvar
            </button>
            <button className="btn-cancelar" onClick={() => {window.history.back()}}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
