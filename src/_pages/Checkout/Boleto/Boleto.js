import React, { useState } from "react";
import "./boleto.css";
import { useNavigate } from "react-router-dom";

export default function Boleto() {
  const navigate = useNavigate();
  function funcaoB() {
    alert("Boleto Gerado e enviado para seu email!");
    navigate('/profile')
  }
  return (
    <>
      <div>
        <div className="container-boleto">
          <div className="boleto">
            <div className="container-form-boleto">
              <div className="titulo">
                <span>Preencha as informações para gerar o seu boleto</span>
              </div>

              <span className="span-boleto">Nome completo</span>
              <input
                type="name"
                className="form-boleto"
                placeholder="nome completo"
              />
            
              <span className="span-boleto">CPF</span>
              <input type="cpf" className="form-boleto" placeholder="cpf" />
              <span className="span-boleto">Data de pagamento</span>
              <input
                type="date"
                className="form-boleto"
                placeholder="data de pagamento"
              />
              
              <div className="btn-boleto-div">
                <button className="btn-boleto" onClick={funcaoB}>
                  Gerar Boleto
                </button>
                <button
                  type="submit"
                  className="btn-voltar"
                  onClick={() => {
                    navigate("/cart/payment");
                  }}
                >
                  {" "}
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
