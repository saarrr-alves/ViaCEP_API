# ViaCEP_API

**Descrição:**
Projeto simples em JavaScript que consome a API pública do ViaCEP para busca de endereços a partir de CEP (Código de Endereçamento Postal) no Brasil. É uma excelente forma de praticar requisições HTTP, tratamento de erros e manipulação de DOM.

##  Tecnologias utilizadas
- JavaScript (ES6+)
- HTML5 e CSS3 (estrutura e estilos)
- API ViaCEP (JSON)
- Fetch API para comunicação com servidor

##  Como usar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ViaCEP_API.git

2. Abra o arquivo index.html no navegador de sua preferência.
3. Insira um CEP no formato xxxxx-xxx ou xxxxxxxx e clique em "Buscar".

## Funcionalidades
- Busca de endereço (logradouro, bairro, cidade, estado) via CEP
- Tratamento de CEPs inválidos ou não encontrados
- Feedback amigável ao usuário (mensagem de erro, loading, etc.)

## Exemplo de uso
|  Entrada (CEP) |                     Saída                     |
|----------------|-----------------------------------------------|
|   01001-000    |        Praça da Sé, Sé, São Paulo – SP        |
|   00000-000    | CEP não encontrado, mensagem de erro exibida  |

```pgsql
├── index.html
├── style.css
└── script.js
```

## Próximos passos (Roadmap)
- Adicionar resposta visual com ícones ou feedback gráfico
- Criar versão responsiva para mobile

## Como contribuir
Contribuições são super bem-vindas!

1. Fork este repositório.
2. Crie uma branch para sua feature ou correção (git checkout -b minha-feature).
3. Faça suas alterações, teste e commit (git commit -m "Descrição do que fez").
4. Abra um Pull Request — vamos adorar revisar junto!

## Licença
MIT License — sinta-se à vontade para usar, modificar e compartilhar este projeto.