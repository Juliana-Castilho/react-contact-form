import React, { useState } from "react";
import emailjs from "emailjs-com";
import InputMask from "react-input-mask";
import "./ContactForm.styles.scss";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const setEmailSent = false;

  const isValidEmail = (email) => {
    const regex =
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
  };

  emailjs.init(process.env.REACT_APP_EMAIL_JS_INIT);

  const submitSucess = document.querySelector(".sucess");
  const submitFailed = document.querySelector(".failed");

  const submit = () => {
    if (name && email && phone && message && isValidEmail) {
      const serviceId = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID;
      const templateParams = {
        name,
        email,
        phone,
        message,
      };

      emailjs
        .send(serviceId, templateId, templateParams)
        .then((response) => console.log(response))
        .then((error) => console.log(error));

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setEmailSent(true);
      submitSucess.style.display = "block";
      submitFailed.style.display = "none";

      setTimeout(function () {
        submitSucess.style.display = "none";
      }, 5000);
    } else {
      submitFailed.style.display = "block";
    }
  };

  return (
    <div className="form">
      <div className="contact-form">
        <div className="input input-info" data-testid="input-info">
          <label htmlFor="name">Seu nome</label>
          <input
            type="text"
            placeholder="Nome completo"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="nome@email.com.br"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="phone">Telefone</label>
          <InputMask
            value={phone}
            onChange={(e) => {
              if (e.target.value.replace("-", "").length === 14) {
                setPhone(e.target.value);
              }
            }}
            mask="(99) 99999-9999"
            placeholder="(99) 99999-9999"
          />
        </div>
        <div className="input input-message" data-testid="input-message">
          <label htmlFor="message">Mensagem</label>
          <textarea
            placeholder="Deixe sua mensagem"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="input-sent" data-testid="input-sent">
        <button data-testid="button-submit" onClick={submit}>
          Enviar mensagem
        </button>

        <span className="sucess">
          Obrigado por sua mensagem. Entraremos em contato em breve.
        </span>

        <span className="failed">
          Por favor, preencha todos os campos corretamente.
        </span>
      </div>
    </div>
  );
};

export default ContactForm;
