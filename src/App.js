import{useState} from 'react';
import{FiSearch} from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function pesqSearch(){

    if (input==''){
      alert('Preencha o campo de acordo com a instrução!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data); //passa a informacao pro useState
      setInput(""); //limpa o campo do input
    }
    catch{
      alert('Erro ao buscar seu CEP.');
      setInput(""); //após mostrar erro e o usuário clicar em OK, o campo vai ser limpo
    }
  }

  return (
    <div className="container">
      <h1 className="title">Busca CEP</h1>

      <div className="containerInput">
      <input type="text" 
      placeholder="Digite o seu CEP aqui"
      value={input}
      onChange={(ev) => setInput(ev.target.value) } 
      
      />
      <button className="btnSearch" onClick={pesqSearch}>
        <FiSearch size={20} color="black"/>
      </button>
      </div>

      {Object.keys(cep).length > 0 &&(
            <main className='main'>
            <h2>CEP: {cep.cep} </h2>
            <span>Rua: {cep.logradouro} </span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} - {cep.uf}</span>
            </main>  
      )}
    </div>
  );
}

export default App;
