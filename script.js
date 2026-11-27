// Função para preencher o card com os dados do localStorage
function preencherCardComLocalStorage() {
    const card = document.getElementById("card");
    card.innerHTML = `
        <div class="card-header flex flex-col justify-content-between">
            <div class="drawer-header">
                <h3 class="drawer-title">Endereço Cadastrado</h3>
                <button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
            </div>
            <p>CEP: ${localStorage.getItem("cep") || ''}</p>
            <p>Logradouro: ${localStorage.getItem("logradouro") || ''}</p>
            <p>Bairro: ${localStorage.getItem("bairro") || ''}</p>
            <p>Cidade: ${localStorage.getItem("cidade") || ''}</p>
            <p>Estado: ${localStorage.getItem("estado") || ''}</p>
            <p>Número: ${localStorage.getItem("numero") || ''}</p>
        </div>
        <button class="btn-solid theme-secondary" id="clear-storage">Limpar Dados</button>
    `;
        if (!localStorage.getItem("cep")) {
            card.innerHTML = `
                <div class="card-header align-items-center justify-content-center">
                    <p>Preencha o CEP para ver os dados do endereço.</p>
                </div>
            `; // Mensagem padrão quando não há dados
        }
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

// Evento para o botão de submit "Cadastrar"
document.getElementById("submit").addEventListener("click", (evento) => {
    evento.preventDefault();
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

// Evento para o botão de limpar dados
document.getElementById("clear-storage").addEventListener("click", () => {
    localStorage.clear();
    preencherCardComLocalStorage();
    alert("Dados limpos com sucesso!");
});