# Clean Shop

Choose your language / Escolha seu idioma:

- [Português (Brasil)](#português-brasil)
- [English](#english)

---

# Português (Brasil)

## Clean Shop

O **Clean Shop** é um backend em **NestJS** focado em gerenciamento de produtos, organizado com **Clean Architecture**, **DDD** e **CQRS**.

Atualmente, os dados de produtos são persistidos em **PostgreSQL** via **Drizzle ORM**. O **MongoDB** também é inicializado no startup da aplicação, mas **ainda não é usado** pelo fluxo atual de produtos.

## Visão geral

- API para **criação**, **listagem**, **detalhe** e **remoção** de produtos
- Separação entre **commands** e **queries** com `@nestjs/cqrs`
- Validação de entrada com `class-validator`
- Filtros globais para exceções de aplicação e domínio
- Estrutura em camadas: `domain`, `application`, `infrastructure` e `presentation`

## Stack

- **Node.js** + **TypeScript**
- **NestJS 11**
- **@nestjs/cqrs**
- **class-validator**
- **PostgreSQL** + **Drizzle ORM** + `postgres`
- **MongoDB** native driver
- **Jest** + **Supertest**
- **pnpm**
- **Docker Compose**

## Arquitetura

- `src/product/domain`  
  Entidades e value objects do domínio
- `src/product/application`  
  Commands, queries, handlers e porta de repositório
- `src/product/infrastructure`  
  Adaptador de repositório com Drizzle
- `src/product/presentation`  
  Controller HTTP e DTOs
- `src/shared/infrastructure/database`  
  Providers de PostgreSQL e MongoDB

## API de produtos

| Método   | Rota            | Descrição                  |
| -------- | --------------- | -------------------------- |
| `POST`   | `/products`     | Cria um produto            |
| `GET`    | `/products`     | Lista produtos             |
| `GET`    | `/products/:id` | Busca um produto por UUID  |
| `DELETE` | `/products/:id` | Remove um produto por UUID |

### Payload de criação

`POST /products`

```json
{
  "name": "Gaming Laptop",
  "description": "Laptop with 16GB RAM and 1TB SSD",
  "sku": "LAPTOP-001",
  "price": 5999.9,
  "currency": "BRL",
  "stock": 10
}
```

### Filtros de listagem

`GET /products` aceita atualmente:

- `isActive`
- `minPrice`
- `maxPrice`

## Variáveis de ambiente

| Variável                | Obrigatória | Observação                                      |
| ----------------------- | ----------- | ----------------------------------------------- |
| `PORT`                  | Não         | Padrão `3000`                                   |
| `POSTGRES_DATABASE_URL` | Sim         | Usada pela aplicação e pelo `drizzle.config.ts` |
| `MONGODB_URI`           | Sim         | Exigida no startup                              |
| `MONGODB_NAME`          | Não         | Padrão `clean_shop`                             |

> Como `PostgreSQL` e `MongoDB` são importados no `AppModule`, o startup atual espera que as variáveis de ambos estejam configuradas.

## Como rodar localmente

### 1. Instale as dependências

```bash
pnpm install
```

### 2. Suba os bancos locais

```bash
docker compose up -d
```

### 3. Configure o `.env`

Exemplo:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=clean_shop
POSTGRES_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/clean_shop
```

### 4. Aplique o schema do banco

O repositório inclui o SQL inicial em:

```txt
drizzle/0000_tidy_tyger_tiger.sql
```

Aplique a migration no PostgreSQL antes de usar a API de produtos.

```bash
npx drizzle-kit migrate
```

### 5. Inicie a aplicação

```bash
pnpm run start:dev
```

URL padrão:

```txt
http://localhost:3000
```

## Scripts disponíveis

| Script                 | Descrição                          |
| ---------------------- | ---------------------------------- |
| `pnpm run build`       | Gera o build do projeto            |
| `pnpm run start`       | Inicia a aplicação                 |
| `pnpm run start:dev`   | Inicia em modo desenvolvimento     |
| `pnpm run start:debug` | Inicia em modo debug               |
| `pnpm run start:prod`  | Executa o build compilado          |
| `pnpm run lint`        | Executa ESLint com auto-fix        |
| `pnpm run format`      | Formata arquivos de `src` e `test` |
| `pnpm run test`        | Executa o Jest                     |
| `pnpm run test:watch`  | Executa o Jest em modo watch       |
| `pnpm run test:cov`    | Executa cobertura de testes        |
| `pnpm run test:debug`  | Executa o Jest em modo debug       |
| `pnpm run test:e2e`    | Executa testes end-to-end          |

## Notas sobre banco

- A persistência de produtos está implementada com **PostgreSQL**, não com MongoDB
- O schema da tabela está em `src/shared/infrastructure/database/postgres/schema/products.schema.ts`
- O SQL inicial está em `drizzle/0000_tidy_tyger_tiger.sql`
- Os preços são armazenados como centavos inteiros em `price_amount` e moeda em `price_currency`
- `sku` é único no banco

## Testes

O Jest está configurado para testes unitários e e2e, mas atualmente:

- não há arquivos `src/**/*.spec.ts` no repositório
- existe um teste e2e em `test/app.e2e-spec.ts` que ainda espera `GET /` retornando `Hello World!`

Esse teste **não reflete** as rotas atuais da aplicação, que hoje expõe `/products`.

## Limitações atuais

- Ainda não há endpoint de atualização de produtos
- Não há Swagger/OpenAPI
- Não há autenticação/autorização
- Não há paginação
- O MongoDB é inicializado, mas não é usado pelo módulo de produtos
- Não há script de migration no `package.json`; a preparação do schema é manual

## Licença

`UNLICENSED`

---

# English

## Clean Shop

**Clean Shop** is a **NestJS** backend focused on product management, organized with **Clean Architecture**, **DDD**, and **CQRS**.

At the moment, product data is persisted in **PostgreSQL** via **Drizzle ORM**. **MongoDB** is also initialized during application startup, but it is **not yet used** by the current product flow.

## Overview

- API for product **creation**, **listing**, **detail**, and **deletion**
- Separation between **commands** and **queries** with `@nestjs/cqrs`
- Input validation with `class-validator`
- Global filters for application and domain exceptions
- Layered structure: `domain`, `application`, `infrastructure`, and `presentation`

## Stack

- **Node.js** + **TypeScript**
- **NestJS 11**
- **@nestjs/cqrs**
- **class-validator**
- **PostgreSQL** + **Drizzle ORM** + `postgres`
- **MongoDB** native driver
- **Jest** + **Supertest**
- **pnpm**
- **Docker Compose**

## Architecture

- `src/product/domain`  
  Domain entities and value objects
- `src/product/application`  
  Commands, queries, handlers, and repository port
- `src/product/infrastructure`  
  Drizzle-based repository adapter
- `src/product/presentation`  
  HTTP controller and DTOs
- `src/shared/infrastructure/database`  
  PostgreSQL and MongoDB providers

## Products API

| Method   | Route           | Description              |
| -------- | --------------- | ------------------------ |
| `POST`   | `/products`     | Create a product         |
| `GET`    | `/products`     | List products            |
| `GET`    | `/products/:id` | Get a product by UUID    |
| `DELETE` | `/products/:id` | Delete a product by UUID |

### Create payload

`POST /products`

```json
{
  "name": "Gaming Laptop",
  "description": "Laptop with 16GB RAM and 1TB SSD",
  "sku": "LAPTOP-001",
  "price": 5999.9,
  "currency": "BRL",
  "stock": 10
}
```

### List filters

`GET /products` currently accepts:

- `isActive`
- `minPrice`
- `maxPrice`

## Environment variables

| Variable                | Required | Notes                                   |
| ----------------------- | -------- | --------------------------------------- |
| `PORT`                  | No       | Defaults to `3000`                      |
| `POSTGRES_DATABASE_URL` | Yes      | Used by the app and `drizzle.config.ts` |
| `MONGODB_URI`           | Yes      | Required during startup                 |
| `MONGODB_NAME`          | No       | Defaults to `clean_shop`                |

> Since both `PostgreSQL` and `MongoDB` modules are imported by `AppModule`, the current startup path expects environment variables for both.

## How to run locally

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start local databases

```bash
docker compose up -d
```

### 3. Configure `.env`

Example:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=clean_shop
POSTGRES_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/clean_shop
```

### 4. Apply the database schema

The repository includes the initial SQL at:

```txt
drizzle/0000_tidy_tyger_tiger.sql
```

Apply migration to PostgreSQL before using the products API.

```bash
npx drizzle-kit migrate
```

### 5. Start the application

```bash
pnpm run start:dev
```

Default URL:

```txt
http://localhost:3000
```

## Available scripts

| Script                 | Description                      |
| ---------------------- | -------------------------------- |
| `pnpm run build`       | Build the project                |
| `pnpm run start`       | Start the application            |
| `pnpm run start:dev`   | Start in development mode        |
| `pnpm run start:debug` | Start in debug mode              |
| `pnpm run start:prod`  | Run compiled output              |
| `pnpm run lint`        | Run ESLint with auto-fix         |
| `pnpm run format`      | Format files in `src` and `test` |
| `pnpm run test`        | Run Jest                         |
| `pnpm run test:watch`  | Run Jest in watch mode           |
| `pnpm run test:cov`    | Run coverage                     |
| `pnpm run test:debug`  | Run Jest in debug mode           |
| `pnpm run test:e2e`    | Run end-to-end tests             |

## Database notes

- Product persistence is implemented with **PostgreSQL**, not MongoDB
- The table schema is defined in `src/shared/infrastructure/database/postgres/schema/products.schema.ts`
- The initial SQL is in `drizzle/0000_tidy_tyger_tiger.sql`
- Prices are stored as integer cents in `price_amount` and currency in `price_currency`
- `sku` is unique at the database level

## Tests

Jest is configured for unit and e2e tests, but currently:

- there are no `src/**/*.spec.ts` files in the repository
- there is an e2e test in `test/app.e2e-spec.ts` that still expects `GET /` to return `Hello World!`

That test does **not match** the current application routes, which now expose `/products`.

## Current limitations

- There is no product update endpoint yet
- There is no Swagger/OpenAPI
- There is no authentication/authorization
- There is no pagination
- MongoDB is initialized but not used by the product module
- There is no migration script in `package.json`; schema setup is manual

## License

`UNLICENSED`
