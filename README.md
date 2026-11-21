# 🥞 Saveur — Sistema de Gerenciamento de Reservas

Sistema web para gerenciamento de reservas de um restaurante, desenvolvido com PHP, JavaScript e MySQL. A aplicação permite que funcionários autenticados realizem o cadastro, a consulta e o cancelamento de reservas, respeitando regras de disponibilidade de mesas, datas e horários.

O projeto utiliza uma arquitetura cliente-servidor, com uma API REST responsável pelo processamento das requisições e pela comunicação com o banco de dados.

## 📋 Funcionalidades

- **Autenticação de funcionários:** acesso ao sistema por meio de login e senha.
- **Gerenciamento de sessões:** controle de acesso às funcionalidades restritas.
- **Cadastro de reservas:** registro de clientes, datas, horários e mesas.
- **Consulta de reservas:** listagem das reservas futuras e não canceladas.
- **Cancelamento de reservas:** alteração da situação de uma reserva para cancelada.
- **Validação de disponibilidade:** verificação de conflitos de horários para evitar reservas simultâneas na mesma mesa.
- **Validação de regras de funcionamento:** aplicação de restrições relacionadas aos dias da semana, horários e mesas disponíveis.

## 🛠️ Tecnologias utilizadas

### Back-end
- **PHP:** desenvolvimento da API e implementação das regras de negócio.
- **PDO:** acesso ao banco de dados e execução de consultas SQL.
- **MySQL:** armazenamento e gerenciamento dos dados.

### Front-end
- **HTML5:** estruturação das páginas.
- **CSS3:** estilização e apresentação da interface.
- **JavaScript:** implementação das interações e comunicação assíncrona com a API utilizando Fetch API.

### Servidor
- **Apache:** hospedagem da aplicação e redirecionamento das requisições por meio de mod_rewrite.

## 🏗️ Arquitetura do projeto

O sistema segue uma arquitetura cliente-servidor, dividida em duas partes principais:

- **Front-end:** responsável pela interface gráfica, interação com os funcionários e envio das requisições HTTP.
- **Back-end:** responsável pela autenticação, validação das operações, execução das regras de negócio e comunicação com o banco de dados.

A comunicação entre essas camadas acontece por meio de requisições HTTP utilizando a Fetch API e respostas em JSON.

A API utiliza princípios REST, com operações associadas aos métodos HTTP GET, POST e PUT. Entretanto, não implementa integralmente todas as restrições de uma arquitetura RESTful.

### Organização dos diretórios

```text
saveur/
│
├── api/
│   ├── DAO/
│   │   └── config.php
│   │
│   ├── Funcionario/
│   │   ├── Funcionario.php
│   │   ├── FuncionarioController.php
│   │   ├── FuncionarioDAO.php
│   │   ├── FuncionarioException.php
│   │   └── RepositorioFuncionario.php
│   │
│   ├── Reserva/
│   │   └── Reserva.php
│   │
│   ├── Util/
│   │   └── sessao.php
│   │
│   ├── .htaccess
│   └── index.php
│
├── app/
│   ├── css/
│   │   └── style.css
│   │
│   ├── html/
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── reserva.html
│   │   └── reservas.html
│   │
│   └── js/
│       ├── cadastro.js
│       ├── login.js
│       ├── logout.js
│       └── reservas.js
│
└── sql/
    └── saveur.sql
```

## 🗄️ Banco de dados

O projeto utiliza o MySQL e possui três tabelas principais:

| Tabela | Descrição |
|---|---|
| `funcionarios` | Armazena os dados dos funcionários e suas credenciais de acesso. |
| `mesas` | Armazena os números das mesas disponíveis no restaurante. |
| `reservas` | Armazena os dados das reservas realizadas. |

O relacionamento entre as tabelas permite associar cada reserva ao funcionário responsável e à mesa selecionada.

O arquivo `sql/saveur.sql` contém a estrutura do banco de dados e os dados iniciais utilizados pelo projeto.

## ⚙️ Instalação e configuração

### 1. Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- PHP 8.1 ou superior.
- MySQL 5.7 ou superior.
- Apache com os módulos `mod_rewrite` e `mod_headers` habilitados.
- Extensão PDO para MySQL habilitada no PHP.

### 2. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse o diretório do projeto:

```bash
cd saveur-main/saveur
```

### 3. Configurar o banco de dados

Crie o banco de dados `saveur` no MySQL.

Em seguida, importe o arquivo:

```text
sql/saveur.sql
```

O script SQL contém a criação das tabelas e os registros iniciais.

### 4. Configurar a conexão com o banco

Abra o arquivo:

```text
api/DAO/config.php
```

Configure os parâmetros de conexão de acordo com o ambiente:

```php
function conexaoPDO() {
    return new PDO(
        'mysql:dbname=saveur;host=localhost;',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
}
```

Altere o usuário, a senha e o endereço do banco de dados conforme necessário.

**Importante:** em ambientes de produção, utilize credenciais próprias e evite armazenar informações sensíveis diretamente no código-fonte.

### 5. Configurar o servidor Apache

Disponibilize a pasta `saveur` no diretório público do Apache.

A aplicação utiliza caminhos absolutos iniciados por `/saveur`, portanto, a instalação padrão pressupõe que o projeto esteja acessível por esse caminho.

Certifique-se também de que o Apache permita a utilização do arquivo `.htaccess` e que o módulo `mod_rewrite` esteja habilitado.

### 6. Acessar a aplicação

Após concluir as configurações, acesse:

```text
http://localhost/saveur/app/html/login.html
```

## 🔌 Documentação da API

**URL base:**

```text
http://localhost/saveur/api
```

A API recebe requisições HTTP e retorna respostas em JSON.

### Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/sessao` | Verifica se existe uma sessão autenticada. |
| POST | `/login` | Realiza a autenticação do funcionário. |
| POST | `/logout` | Encerra a sessão do funcionário. |
| POST | `/reservas` | Cadastra uma nova reserva. |
| GET | `/reservas` | Lista as reservas disponíveis. |
| PUT | `/reserva/{id}` | Cancela uma reserva pelo identificador. |

### Autenticação

**POST `/login`**

Recebe os dados de autenticação por meio de `FormData`.

Parâmetros:

```text
login: usuário do funcionário
senha: senha do funcionário
```

Quando as credenciais são válidas, a API inicia uma sessão e retorna os dados do funcionário.

**GET `/sessao`**

Verifica a existência de uma sessão autenticada.

Possíveis respostas:

- `200 OK`: funcionário autenticado.
- `401 Unauthorized`: sessão não autorizada.

**POST `/logout`**

Encerra a sessão atual do funcionário.

### Reservas

**POST `/reservas`**

Cadastra uma nova reserva.

Parâmetros enviados por `FormData`:

```text
cliente: nome do cliente
dia: data da reserva
horario: horário da reserva
mesa: número da mesa
id: identificador do funcionário
```

Respostas utilizadas:

- `201 Created`: reserva cadastrada com sucesso.
- `400 Bad Request`: dados não inseridos.
- `409 Conflict`: erro no cadastro.
- `500 Internal Server Error`: erro interno do servidor.

**GET `/reservas`**

Retorna uma lista de reservas futuras que não estejam canceladas ou concluídas.

Exemplo de estrutura dos dados retornados:

```json
[
    {
        "idReserva": 1,
        "funcionarios": "Breno",
        "cliente": "João",
        "mesa": 1,
        "dia": "2026-12-20",
        "horario": "12:00:00",
        "situacao": "em espera"
    }
]
```

**PUT `/reserva/{id}`**

Altera a situação de uma reserva para `cancelada`.

Corpo da requisição:

```json
{
    "id": 1
}
```

## 📐 Regras de negócio

O sistema implementa validações relacionadas ao funcionamento do restaurante e à disponibilidade das mesas.

Entre elas:

- Verificação de conflitos de reservas para a mesma mesa e data.
- Intervalo mínimo de duas horas entre reservas da mesma mesa.
- Restrição de datas para o cadastro de reservas.
- Limitação de horários conforme o dia da semana.
- Restrição de utilização das mesas de número superior a 7 em determinados dias.

As validações são realizadas no front-end e no back-end, conforme a operação executada.

## 🔐 Segurança

O projeto utiliza alguns mecanismos de segurança:

- Autenticação de funcionários.
- Gerenciamento de sessões no PHP.
- Verificação de senhas utilizando `password_verify()`.
- Consultas preparadas com PDO para reduzir riscos de SQL Injection.
- Restrição de acesso às funcionalidades que exigem autenticação.

## 👨‍💻 Autor

Desenvolvido como projeto de aplicação web para gerenciamento de reservas de restaurante.
