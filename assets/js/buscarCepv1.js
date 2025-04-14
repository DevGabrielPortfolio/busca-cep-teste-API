const cepInput= document.querySelector('#cep');

const btnPesquisarCEP = document.querySelector('#btnPesquisar');
const btnLimpar = document.querySelector('#btnLimpar');


cepInput.addEventListener('keypress', (event) => {
    const keyCode=event.keyCode
    console.log(keyCode)
    
    if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
        alert("Digite Apenas Números.")
    }
})

const obterDadosApi = async (cep) => {
    const apiUrl=`https://viacep.com.br/ws/${cep}/json/`
  
    const response = await fetch(apiUrl)
   
    const data = await response.json();
  
    if (data.erro){
        alert("O CEP digitado está inválido.")
    }
    atribuirCampos(data);
}

btnPesquisarCEP.addEventListener('click', (e) => { 
    e.preventDefault();
    if (cepInput.value.length < 8 || cepInput.value.length > 9){
        alert('Por favor, digite um CEP válido com 8 dígitos.')
        document.querySelector('#cep').value = '';
        return;
    }
    obterDadosApi(cepInput.value);
});

const atribuirCampos = (data) => {
    const rua = document.querySelector('#rua');
    const complemento = document.querySelector('#complemento');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');

    rua.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value= data.bairro;
    cidade.value= data.localidade;
    estado.value= data.estado;

}

btnLimpar.addEventListener('click', () => {
    document.querySelector('#rua').value = ''
    document.querySelector('#complemento').value=''
    document.querySelector('#bairro').value=''
    document.querySelector('#cidade').value=''
    document.querySelector('#estado').value=''

})

