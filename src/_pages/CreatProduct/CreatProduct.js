import React from "react";
import axios from "axios";
import "./creat.css";
import { useNavigate } from "react-router-dom";
import {_web3} from '../../_service/Web3Storage'

export default function CreatProtduct(props) {
  const [name, setName] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [isErr, setIsErr] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [detalhes, setDetalhes] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [productImage, setProductImage] = React.useState("");

  const navigate = useNavigate();

  const createProduct = async () => {
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
      .post("https://dev.li-sense.xyz/api/v1/produtos/registra-produto", data, {
        headers: {
          Authorization: auth,
          'Access-Control-Allow-Origin' : '*',
        },
      })
      .then(function (response) {
        console.log('response', response)
        if (response.status) {
          alert(`Produto ${response.data.nome} Criado com sucesso`);
          navigate("/");
        }
      })
      .catch((_err) => {
        setIsErr(_err.response.data.detail);
      });
  };

  const uploadImage = async (file) => {
    let name = file.files[0].name.toString()
  let request =  await _web3.uploadNewFile(file.files, name)
  setProductImage(request)

  }

  return (
    <>
      <div>
        <div className="container-all-criar">
          <span className="tilte-prod-c">Adicinar Novo Produto</span>
          <div className="container-imagem-produto-c">
            <div className="new-infos-prod-c">
              <label className="infos-new-prod">Nome do Produto</label>
              <input
                className="new-prod-c"
                placeholder=""
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
            
              <label className="infos-new-prod">Detalhes</label>
              <input
                className="new-prod-c"
                placeholder=""
                onChange={(event) => {
                  setDetalhes(event.target.value);
                }}
              ></input>
              <label className="infos-new-prod">Preço</label>
              <input
              type='number'
                className="new-prod-c"
                placeholder="R$ 00,00"
                onChange={(event) => {
                  setPreco(event.target.value);
                }}
              ></input>
              <label className="infos-new-prod">Classificação do Produto</label>
              <input className="op-cat" id="mySelect" onChange={(event) => {setCategoria(event.target.value)}} />
               
            </div>
            <div className="input-wrapper-prod-c">
              <div className="input-wrapper">
                <label htmlFor="input-file">Selecionar imagens do produto</label>
                <input id="input-file" type="file"  multiple onChange={(event) => {uploadImage(event.target)}}/>
                <span id="file-name"></span>
              </div>
            </div>
          </div>
          <div className="container-detalhes-c">
            <div className="title-det-c">
              <p>Insira a descrição do produto ao lado </p>
            </div>
            <textarea
              className="detalhes-produto-c"
              placeholder="digite aqui..."
              onChange={(event) => {
                setDescricao(event.target.value);
              }}
            />
          </div>
          <div className="botoes">
            <p>{isErr ? "Esse produto ja existe" : ""}</p>
            <button className="btn-salvar" onClick={() => {createProduct()}}>
              Criar Produto
            </button>
            <button className="btn-cancelar" >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
