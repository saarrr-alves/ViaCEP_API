document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if(cepInformado.length !== 8)
        return

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;

                // Salvar também no localStorage após preencher automaticamente
                localStorage.setItem("logradouro", data.logradouro);
                localStorage.setItem("bairro", data.bairro);
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("estado", data.uf);

            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar CEP:", error));
});

const cadastrar = document.getElementById("endereco-form");

cadastrar.addEventListener("click", () => {
    const numero = document.getElementById("numero").value.trim();

    // Salvar número informado no localStorage
    localStorage.setItem("numero", numero);
});