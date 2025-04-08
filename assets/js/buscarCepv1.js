// Obstendo valor do campo
const cepInput = document.querySelector('#cep');

// atribuindo funções nos botões
const btnPesquisarCEP = document.querySelector('#btnPesquisar');
const btnLimpar = document.querySelector('#btnLimpar');

// adiciona um evento para verificar qual tecla foi pressionada
cepInput.addEventListener('keypress', (event) =>{

    // obtém o códgo ASCII da tecla pressionada
    const keyCode = event.keyCode;
    
    // verificando se a tecla pressionada não é um número
    if(keyCode < 48 || keyCode > 57){
        event.preventDefault();
        alert('Digite apenas números!');
    }

});

const obterDadosApi = async (cep) =>{
    // armazenar o endereço de requisição da API
    const urlAPI = `https://viacep.com.br/ws/'${cep}'/json/`;

    // Armazenar a resposta da API e aguardar a construção dos dados
    const response = await fetch(urlAPI);

    // Converter os dados para JSON
    const data = await response.json();

    // Verificar se o CEP é válido
    if(data.erro){
        alert('O CEP digitado está inválido!');
        return;
    }
    atribuirCampos(data);
};

btnPesquisarCEP.addEventListener('click', (e)=>{
    e.preventDefault();

    // verifica se ó CEP tem 8 dígitos
    if(cepInput.value.length != 8){
        // Menos de 8 dígitos, exibe uma mensagem para o usuáro
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        document.querySelector('#cep').value = '';
        return;
    }
    obterDadosApi(cepInput.value);
});

const atribuirCampos = (data) =>{
    const rua = document.querySelector('#rua');
    const complemento = document.querySelector('#complemento');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');

    rua.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.estado;
};

btnLimpar.addEventListener('click', ()=>{
    const cep = document.querySelector('#cep').value = '';
    const rua = document.querySelector('#rua').value = '';
    const complemento = document.querySelector('#complemento').value = '';
    const bairro = document.querySelector('#bairro').value = '';
    const cidade = document.querySelector('#cidade').value = '';
    const estado = document.querySelector('#estado').value = '';
});