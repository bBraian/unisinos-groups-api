# 🌊 Backend para sistema Unisinos Groupds 🌊

Este repositório contém o backend de um sistema projetado para armazenar grupos de whatsapp, bem como links com material de estudo. 
Ele fornece APIs essenciais para a autenticação de usuários, gerenciamento das disciplinas, e muito mais.

## 🛠 Tecnologias Utilizadas

- **🟢 Node.js**: Ambiente de execução para JavaScript.
- **🔗 Prisma**: ORM para Node.js e TypeScript, facilitando o gerenciamento do banco de dados.
- **🐳 Docker**: Solução para desenvolvimento e execução de aplicativos em contêineres.
- **🐦 Nest**: Framework de alto desempenho para aplicações web em Node.js.
- **📦 PostgreSQL**: Banco de dados relacional robusto e eficiente.

## 📡 API Endpoints

Veja o documento de [endpoints](./docs/endpoints.md).

## Licença

Este código está licenciado usando a
[licença MIT](./LICENSE).

## Contribuidores

Os contribuidores são voluntários, e podem ser encontrados
[na página de contribuidores](https://github.com/bBraian/unisinos-groups-api/graphs/contributors).

## Running the app

```bash
# to install dependencies
$ npm install

# to run docker
$ docker compose up -d

# run migrations
$ npx prisma migrate dev

# deploy migrations
$ npx prisma migrate deploy

# run the app
$ npm run dev
```