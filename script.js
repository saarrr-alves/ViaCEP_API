// Função para preencher o card com os dados do localStorage
function preencherCardComLocalStorage() {
    const card = document.getElementById("card");
    card.innerHTML = `
        <p>CEP: ${localStorage.getItem("cep") || ''}</p>
        <p>Logradouro: ${localStorage.getItem("logradouro") || ''}</p>
        <p>Bairro: ${localStorage.getItem("bairro") || ''}</p>
        <p>Cidade: ${localStorage.getItem("cidade") || ''}</p>
        <p>Estado: ${localStorage.getItem("estado") || ''}</p>
        <p>Número: ${localStorage.getItem("numero") || ''}</p>
    `;
}

// Chamar a função para preencher o card assim que a página é carregada
preencherCardComLocalStorage();

// Evento que busca o CEP na API quando o campo perde o foco
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value.replace(/\D/g, '');

    if (cepInformado.length !== 8) {
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                // Preenche os campos do formulário com os dados da API
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;

                // Salva os dados do CEP e do endereço no localStorage
                localStorage.setItem("cep", cepInformado);
                localStorage.setItem("logradouro", data.logradouro);
                localStorage.setItem("bairro", data.bairro);
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("estado", data.uf);
                
                // --- ALTERAÇÃO AQUI: APAGAR O NÚMERO ---
                // Remove o valor do número do localStorage e do campo do formulário
                localStorage.removeItem("numero");
                document.getElementById("numero").value = '';
                
                // Atualiza o card após o CEP ser preenchido
                preencherCardComLocalStorage();
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar CEP:", error));
});

// Evento para o botão "Cadastrar"
document.getElementById("endereco-form").addEventListener("click", () => {
    // Pega os valores atuais do formulário
    const numero = document.getElementById("numero").value.trim();
    const logradouro = document.getElementById("logradouro").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const estado = document.getElementById("estado").value.trim();

    // Salva os dados completos no localStorage
    localStorage.setItem("numero", numero);
    localStorage.setItem("logradouro", logradouro);
    localStorage.setItem("bairro", bairro);
    localStorage.setItem("cidade", cidade);
    localStorage.setItem("estado", estado);

    // Atualiza o card com os novos dados
    preencherCardComLocalStorage();
    
    alert("Dados salvos com sucesso!");
});