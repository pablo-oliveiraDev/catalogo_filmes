# 🖥TestShawAndPartners


## 🌍 API RESTFUL

```
API criada sob demanda para teste prático em desenvolvimento backend nest js
```


# ⚡ Instalação

* Clone o repositório usando ```git clone``` com .

* Crie um novo arquivo ```.env``` e crie uma nova variável podendo ser em qualquer banco de dados suportado pelo prisma```DATABASE_URL="" ```

* Crie uma variavel tbm no .env jwt_secret podendo ser palavra de segurança lembrando que será a senha jwt.

* Execute ```npm install``` para instalar todas as dependências do projeto.


# 🚀 Iniciar projeto

* ```node app.js``` e ```typescript``` para configurações simples.

* Abra o terminal na url da pasta e use cmd``` npm run dev```

* Se seu banco de dados não existir use cmd ``` npx prisma gerado```
 
# 📂 Banco de dados

   O banco de dados foi criado em Postgres e entregado ao docker para facilitar a instalação ou ate mesmo depĺoy ...Obs toda a aplicação tbm esta em docker
# 🍕 Terminais de API


## Obtenha todos os usuários
```
OBTER http://localhost:5080/api/users

```
## Obtenha usuários por ID
```
OBTER http://localhost:5080/users:id

```
## Obtenha usuário por qualquer coluna
```
OBTER http://localhost:5080/userBycol/col

```


```
## Deletar usuário
```
GET:ID http://localhost:5080/users/:id

```