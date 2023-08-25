## Aplicação web com CRUD de itens em Vue

Para a candidatura a uma vaga de programador Jr. na Univali, foi proposto o desafio de criar uma aplicação web com CRUD de itens, contendo duas páginas: uma para registro e alteração de itens, e outra para listagem em tabela dos itens armazenados no Local Storage, onde também é possível excluí-los.

# Escolha do Framework

Para produzir esta aplicação, escolhi o Vue, o que representa minha primeira experiência prática com o framework, proporcionando uma adição nova ao meu currículo.

Esse framework permite a criação fácil de componentes reutilizáveis ao longo de todo o projeto. Para essa aplicação, apenas foi criado um componente separado chamado "navBar".

Pensei em utilizar JavaScript puro, porém, como já tenho boa experiência com ele, acredito que não seria interessante para mim (assim como o React, no qual também já tenho experiência), e também não proporcionaria um diferencial extra para a candidatura.

# Bibliotecas utilizadas

Para auxiliar na produção deste projeto, foram utilizadas duas bibliotecas:
Bootstrap 5 (via CDN), para auxiliar na responsividade da página e também para reduzir o uso de comandos CSS.
VMask (via NPM), esta biblioteca auxiliou no uso de máscaras para os campos do formulário.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
