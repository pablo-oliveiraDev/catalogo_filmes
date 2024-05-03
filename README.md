# 🖥Teste catalogo de filmes


## 🌍 API RESTFUL

```
API criada sob demanda para teste prático em desenvolvimento backend nest js
```


# ⚡ Instalação

* Clone o repositório usando ```git clone``` com .

* Crie um novo arquivo ```.env``` e crie uma nova variável podendo ser em qualquer banco de dados suportado pelo prisma```DATABASE_URL="" ```

* Crie uma variavel tbm no .env jwt_secret podendo ser palavra de segurança lembrando que será a senha jwt.

* Execute ```npm install``` para instalar todas as dependências do projeto.

# 🚢 Docker

                         Para rodar o projeto via docker

* Todos os comandos devem ser executado no mesmo nível do diretório dos arquivos docker ou seja na raiz do projeto.

* Execute ```docker-compose build``` subir os arquivos no docker e levantar o banco.

* Execute ```docker-compose up -d``` para subir e manter o docker ativo.



# 🚀 Iniciar projeto

* ```node.js``` e ```typescript```e  ```redis```e  ```Prisma```e  ```Nest.js``` para configurações simples.

* Se seu banco de dados não existir use cmd ``` npx prisma generate```

* Abra o terminal na url da pasta e use cmd``` npm run start:dev```

## SWAGGER
* Tbm está configurado o swagger para testes manuais e documentação do teste.Segue o link abaixo.

```
    http://localhost:5080/api

```
 
# 📂 Banco de dados

   O banco de dados foi criado em Postgres e entregado ao docker para facilitar a instalação ou ate mesmo depĺoy ...Obs toda a aplicação tbm esta em docker
# 🍕 Terminais de API

  # ROTAS #
  ## Users
## Obtenha todos os usuários
```
GET http://localhost:5080/users

```
## Obtenha usuários por ID
```
GET:ID http://localhost:5080/users:/id

```
## Crie um novo usuario
```
POST http://localhost:5080/users

```
## Atualize usuarios por id
```
PATCH:ID http://localhost:5080/users:/id

```
## Deletar usuário
```
DELETE:ID http://localhost:5080/users/:id

```
 ## LOGIN
## login
```
POST http://localhost:5080/auth/login

```
 ## FILMES
## Obter todos os filmes
```
GET http://localhost:5080/films
```
## Obtenha um filme por ID
```
GET:ID http://localhost:5080/films/:id

```
## Atualize um filme por ID
```
PATCH:ID http://localhost:5080/films/:id

```
## DELETE um filme por ID
```
DELETE:ID http://localhost:5080/films/:id

```

 # *😎 TESTES AUTOMATIZADOS 
 ```
  No diretorio raiz do projeto execute npm run test para executar todos os testes.
 ```

  # *✌ link deploy api 
 ```
  base api link https://catalogo-filmes-wi50.onrender.com

  Feito deploy da api na render funcionando e operacional

 ```