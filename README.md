
BACKEND ///////////////////////////////

Antes de começar, certifique-se de ter instalado o Node.js e o PostgreSQL na sua máquina.

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL chamado `postgres`.

// arquivo db.js

 user: 'postgres',
  host: 'localhost',
  database: 'postgres',  // Nome do seu banco de dados
  password: 'adm', // senha teste
  port: 5432,


2. Execute o script SQL fornecido em `scripts/create-table.sql` para criar a tabela `clientes`.
EXEMPLO

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  coordenada_x INTEGER,
  coordenada_y INTEGER
);

## Instalação e Execução

1. Abra um terminal e navegue até o diretório do projeto:

   
   cd backend
Instale as dependências do Node.js:

npm install express pg
//
npm install
//
Configure as variáveis de ambiente no arquivo .env:

////execute o portgresSQL
Crie a tabela,  no postgreSQL
//
CREATE TABLE .... 
 

////execute o portgresSQL


PORT=5000
Lembre-se de que você pode ajustar a porta conforme necessário.

Execute o servidor Node.js:


Inicie o servidor backend
node server.js
O servidor será iniciado na porta configurada (por padrão, 5000).

Utilização da API
Buscar por ID:

URL: http://localhost:5000/api/clientes/id/1
Substitua 1 pelo ID do cliente que você deseja buscar.
Buscar por nome:

URL: http://localhost:5000/api/clientes/nome/ClienteA
Substitua ClienteA pelo nome do cliente que você deseja buscar. evite o uso de espaço , caso tenha espaço exemplo Cliente A ficaria :
http://localhost:5000/api/clientes/nome/Cliente%20A

Buscar por email:

URL: http://localhost:5000/api/clientes/email/clienteA@example.com
Substitua clienteA@example.com pelo email do cliente que você deseja buscar.
Buscar por telefone:

URL: http://localhost:5000/api/clientes/telefone/123456789
Substitua 123456789 pelo telefone do cliente que você deseja buscar.
Buscar por coordenadas:

URL: http://localhost:5000/api/clientes/coordenadas/10/20
Substitua 10 pelo valor da coordenada X desejada e 20 pelo valor da coordenada Y desejada.



///////////////////////////////////