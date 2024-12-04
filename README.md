# Projeto Integrador Web

### Equipe:
- Edrik Fontana Steiner - Gerente de Projetos
- João Daniel de Liz - Desenvolvedor Backend
- João Gabriel Rosso Dagostin - Desenvolvedor Frontend
- João Pedro Taufembach Acordi - DBA
- Rafael Ronsoni Gaidzinski - Escritor Técnico

<br>
  
## Sistema de Estoque para Drogarias

### Entidade Alvo
- Farmácia Maxfarma

<br>
  
### Objetivos do sistema:
- Fornecer um sistema com uma interface intuitiva e fácil de usar <br>
- Cadastrar produtos, funcionários, clientes, fornecedores, vendas e compras <br>
- Controlar em tempo real o estoque de medicamentos melhorando a eficiência operacional <br>
- Controle de acesso dos funcionários aos módulos do sistema <br>
- Emitir relatórios para acessar informações referentes ao estoque, vendas entre outras <br>
- Integrar funcionalidades que permitam o pagamento das vendas realizadas

<br>

### Ferramentas utilizadas no Projeto
- Trello: utilizado para gerenciar as tarefas a serem realizadas durante o desenvolvimento do sistema
- [Figma](https://www.figma.com/design/ReeelkRsRgmTHFNUQaWGjs/Untitled?node-id=0-1&t=H2iFsoy8EckTBAQ4-1): utilizado para fazer o mockup do projeto 
- Github: para desenvolver o projeto simultaneamente com os demais integrantes da equipe, realizar o versionamento e armazenar os códigos do projeto.
- VSCode: IDE utilizada para realizar o desenvolvimento do projeto.

### Outros Repositórios
- [Backend](https://github.com/f5joaodanieldeliz/backendDrogaria)
- [Versão 2.0](https://github.com/rafaelrgaidzinski/projeto-integrador-web)

<br>

### Tecnologias utilizadas no Desenvolvimento do Projeto

#### Frontend:
- React (v18.3.1) - Framework JavaScript para construção de interfaces de usuário.
- Axios (v1.7.7) - Biblioteca para realizar requisições HTTP.

#### Backend:
- Node.js (v20.17.0) - Ambiente de execução JavaScript no servidor.
- Express (v4.21.1) - Framework para construção de APIs RESTful.

#### Banco de Dados:
- PostgreSQL (v14.5) - Banco de dados relacional para armazenamento dos dados

#### Bibliotecas e ferramentas adicionais:
- TypeORM (v0.3.20) - ORM para facilitar a manipulação de dados no PostgreSQL.
- JSON Web Token (9.0.2) - Autenticação de usuários e controle de acesso.

<br>

### Arquitetura

A arquitetura do sistema segue o padrão REST (Representational State Transfer), organizando o backend em uma estrutura de serviços desacoplados que interagem por meio de endpoints HTTP. Abaixo estão os principais componentes e suas funções:

**Frontend**: Desenvolvido em React o "cliente" consome a API RESTful do backend para realizar operações de CRUD (criação, leitura, atualização e exclusão) de funcionários, clientes, produtos, vendas e compras. As requisições são gerenciadas com Axios.

**Backend**: Desenvolvido em Node.js com Express, o backend expõe uma API RESTful que opera com os recursos como citados anteriormente. Cada recurso é acessado por meio de endpoints padronizados (GET/POST/PUT/DELETE /recurso). A lógica de autenticação e autorização utiliza JSON Web Tokens (JWT) para proteger rotas e controlar acessos.

**Banco de Dados**: O PostgreSQL é utilizado como o banco de dados relacional, armazenando informações estruturadas. O TypeORM é responsável pelo mapeamento objeto-relacional, simplificando a interação entre a API RESTful e o banco de dados.

<br>

### Modelagem do Banco de Dados

<br>

![modelagem-banco](https://github.com/user-attachments/assets/e50ed4dd-dfb8-4ec1-8dc1-9c7b90a973cb)

<br>

## Endpoints da API

### GET

Para realizar este tipo de requisiçao deve-se selecionar o método GET e informar uma das seguintes URL que irá retornar as informações do recurso informado:

- http://localhost:3000/
- http://localhost:3000/produtos
- http://localhost:3000/clientes
- http://localhost:3000/fornecedores
- http://localhost:3000/vendas
- http://localhost:3000/compras
- http://localhost:3000/configuracoes

<br>

## POST

Para persistir uma informação no banco de dados através da API deve-se realizar a seguinte configuração utilizando o método POST:

### Produtos

#### URL
- http://localhost:3000/produtos/cadastro

##### Headers
Content-Type = application/json

#### Body
```
{
  barcode: 1234567890123,
  product: "Paracetamol",
  category: "Analgésico",
  purchaseprice: 5.99,
  salesprice: 10.99,
  quantity: 30,
  supplier: "Laboratório A",
  freeprogram: false,
  recipe: false
}
```

### Clientes

#### URL
- http://localhost:3000/clientes/cadastro

##### Headers
Content-Type = application/json

#### Body
```
{
  name: "Jon Snow",
  cpf: "123.456.789-00", 
  birthdate: "1989-01-01", 
  phone: "(65)93124-5454",
  email: "jonsnow@gmail.com",
  address: "Rua Won, 912, Alabama, 10001-000, SY"
}
```

### Fornecedores

#### URL
- http://localhost:3000/fornecedores/cadastro

##### Headers
Content-Type = application/json

#### Body
```
{
  supplier: "Tech Solutions Ltda",
  cnpj: "12.345.678/0001-90",
  inCharge: "Carlos Silva",
  phone: "(11) 98765-4321",
  email: "contato@techsolutions.com.br",
  payment: ["Boleto", "Cartão de Crédito", "Transferência Bancária"],
  delivery: 5,
  address: "Rua dos Tecnólogos, 123, Tech Park, 01234-567, São Paulo, SP"
}
```

### Funcionários

#### URL
- http://localhost:3000/funcionarios/cadastro

##### Headers
Content-Type = application/json

#### Body
```
{
  name: "Ana Souza",
  cpf: "123.456.789-00",
  phone: "(11) 91234-5678",
  email: "ana.souza@email.com",
  hiredate: "2020-05-12",
  salary: 4500.00,
  role: "admin"
}
```

<br>

## PUT

Para Atualizar uma informação no banco de dados através da API deve-se realizar a seguinte configuração utilizando o método PUT:

### Produtos

#### URL
- http://localhost:3000/produtos/{id}

##### Headers
Content-Type = application/json

#### Body
```
{
  barcode: 1234567890123,
  product: "Paracetamol",
  category: "Analgésico",
  purchaseprice: 5.99,
  salesprice: 10.99,
  quantity: 30,
  supplier: "Laboratório A",
  freeprogram: false,
  recipe: false
}
```

### Clientes

#### URL
- http://localhost:3000/clientes/{id}

##### Headers
Content-Type = application/json

#### Body
```
{
  name: "Jon Snow",
  cpf: "123.456.789-00", 
  birthdate: "1989-01-01", 
  phone: "(65)93124-5454",
  email: "jonsnow@gmail.com",
  address: "Rua Won, 912, Alabama, 10001-000, SY"
}
```

### Fornecedores

#### URL
- http://localhost:3000/fornecedores/{id}

##### Headers
Content-Type = application/json

#### Body
```
{
  supplier: "Tech Solutions Ltda",
  cnpj: "12.345.678/0001-90",
  inCharge: "Carlos Silva",
  phone: "(11) 98765-4321",
  email: "contato@techsolutions.com.br",
  payment: ["Boleto", "Cartão de Crédito", "Transferência Bancária"],
  delivery: 5,
  address: "Rua dos Tecnólogos, 123, Tech Park, 01234-567, São Paulo, SP"
}
```

### Funcionários

#### URL
- http://localhost:3000/funcionarios/{id}

##### Headers
Content-Type = application/json

#### Body
```
{
  name: "Ana Souza",
  cpf: "123.456.789-00",
  phone: "(11) 91234-5678",
  email: "ana.souza@email.com",
  hiredate: "2020-05-12",
  salary: 4500.00,
  role: "admin"
}
```

<br>

## DELETE

Para excluir informações do banco de dados deve-se utilizar o método DELETE com uma das seguintes URLs 
e informar o ID da informação que deseja excluir como parametro:


- http://localhost:3000/produtos/{id}
- http://localhost:3000/clientes/{id}
- http://localhost:3000/fornecedores/{id}
- http://localhost:3000/vendas/{id}
- http://localhost:3000/compras/{id}

<br>

## Telas do Sistema

### Tela de Clientes
![Captura de tela 2024-11-29 192451](https://github.com/user-attachments/assets/67e18246-b307-462c-b31d-f4cb7176fe89)

<br>

### Tela de Produtos
![Captura de tela 2024-11-29 192737](https://github.com/user-attachments/assets/fe1bf56f-9bff-436f-89f5-4f4c7edfdb0f)

<br>

## Instalação do Sofware
O processo de instalação do software seguiu os seguintes passos:

### Instalação das Ferramentas:
- Git
- NodeJS
- PostgreSQL
- Docker

### Clonar o Repositório
```
- Clonagem do repositório backend:  git clone https://github.com/edrikfsteiner/projeto-integrador-web
```

### Instalação do Backend:
```
- Abrir o terminal de comando (CMD) e navegar até o diretório do backend utilizando o comando: cd backend
- Instalação das dependências do projeto: npm install
- Configuração das variáveis de ambiente para conexão com o banco de dados e autenticação JWT utilizando o comando: docker compose up
- Abrir a pasta do projeto utilizando o VSCode ou outra IDE e utilizar o seguinte comando para rodar o backend: npm start
```

### Instalação do Frontend:
```
- Abrir o terminal de comando (CMD) e navegar até o diretório do backend utilizando o comando: cd frontend
- Instalação das dependências do projeto: npm install
- Abrir a pasta do projeto utilizando o VSCode ou outra IDE e utilizar o seguinte comando para rodar o frontend: npm run start
```
