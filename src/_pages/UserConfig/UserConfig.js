import React from "react";
import "./UserConfig.css";
import { _web3 } from "../../_service/Web3Storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LisenseContext from "../../_context/LisenseContext";

export default function UserConfig() {
  const { user } = React.useContext(LisenseContext);
  const [image, setImage] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [celular, setCelular] = React.useState("");


  
  const uploadImage = async (file) => {
    console.log("começou")
    let name = file.files[0].name.toString();
    let request = await _web3.uploadNewFile(file.files, name);

    setImage(request);
  };

  const updateUserInfo = () => {
    //console.log(password, password.length)
    if(email.length < 1 || password.length < 1) {
    alert('Email e senha são obrigatorios para alteração dos dados, Preecha corretamente')
      return;
    }
    const id = localStorage.getItem('userId')
    const data = {
      email: email,
      nome: nome,
      sobrenome: "string",
      celular: celular,
      imagem_usuario: image,
      senha: password
    }
    axios.put(`https://dev.li-sense.xyz/api/v1/usuarios/${id}`, data).then((res) => {
      alert('Dados alterados com sucesso')
      window.location.href = 'https://prismatic-kleicha-543149.netlify.app/'

    });
  
  };

  return (
    <div className="w-screen">
      <div className="text-2xl py-1 px-1 font-bold container-text">
        <h1>Configurações de Usuário</h1>
      </div>
      <div className="flex-row max-w-4xl mx-auto py-6">
        <div className="panel-detail my-4">
          <div className="text-xl pt-4 font-extrabold">
            <h1>Editar Foto de Perfil</h1>
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 p-4">
            <div className="input-wrapper-prod">
              <label className="picture" for="picture-input" tabIndex="0">
                <span className="picture-image">Editar imagem de perfil</span>
              </label>

              <input
                type="file"
                name="picture-input"
                id="picture-input"
                multiple
                onChange={(event) => {
                  uploadImage(event.target);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="panel-detail my-4">
          <div className="text-xl pt-4 font-extrabold">
            <h1>Editar Informações</h1>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="py-2">
              <label forhmtl="username" className="text-base font-medium">
                Nome completo
              </label>
              <input
                name="username"
                onChange={(event) => {
                  setNome(event.target.value);
                }}
                className="form-control"
                placeholder={user.nome ? user.nome : ""}
              />
              <div className="px-6 text-sm text-justify">
                Esse é nome como você deverá ser mencionado nas compras ou
                registros.
              </div>
            </div>
            <div className="py-2">
              <label forhmtl="email" className="text-base font-medium">
                Email Público
              </label>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                name="email"
                className="form-control"
                placeholder={user.email ? user.email : ""}
              />
              <div className="px-6 text-sm text-justify">
                Você pode adicionar novos emails para facilitar a verificação.
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div>
              <label forhtml="password" className="text-base font-medium">
                Senha
              </label>
              <div className="flex items-center">
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  name="password"
                  type="password"
                  className="form-control "
                />
              </div>
            </div>
            <div>
              <label forhtml="cpf" className="text-base font-medium">
                celular
              </label>
              <div className="grid grid-cols-2 gap-4 items-center">
                <input
                  onChange={(event) => {
                    setCelular(event.target.value);
                  }}
                  name="cpf"
                  className="form-control"
                  placeholder={user.celular ? user.celular : ""}
                />
                <button className="submit" onClick={() => {updateUserInfo()}}>Editar alterações</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
