# Clean Shop

> Uma aplicação backend escalável e bem arquitetada utilizando **Clean Architecture** e **Domain-Driven Design (DDD)**, desenvolvida com NestJS, TypeScript e suporte multi-banco de dados.

## 📋 Visão Geral do Projeto

**Clean Shop** é uma aplicação enterprise-grade que demonstra as melhores práticas de arquitetura de software e design patterns. O projeto foi construído com foco em **escalabilidade**, **manutenibilidade** e **testabilidade**, seguindo princípios de Clean Code e SOLID.

### Características Principais

- ✨ **Clean Architecture**: Separação clara de responsabilidades com domain, application e infrastructure layers
- 🏗️ **Domain-Driven Design (DDD)**: Implementação de agregados, entidades, value objects e bounded contexts
- 🔄 **CQRS Pattern**: Separação de command (escrita) e query (leitura) para melhor performance
- 🗄️ **Multi-Database Support**: Suporte nativo para PostgreSQL e MongoDB
- 📝 **TypeScript Strict Mode**: Tipagem forte e segura em tempo de compilação
- 🧪 **Testes Completos**: Cobertura de testes unitários e end-to-end (e2e)
- 📦 **Monorepo Ready**: Estrutura preparada para crescimento com pnpm workspaces
- 🔍 **ESLint + Prettier**: Código formatado e consistente
- 🐳 **Docker Support**: Containerização incluída via docker-compose

## 🏛️ Arquitetura

A aplicação segue os princípios de **Clean Architecture** com as seguintes camadas:

```
src/
├── shared/
│   ├── domain/           # Camada de Domínio (Core da Aplicação)
│   │   ├── entity.ts
│   │   ├── aggregate-root.ts
│   │   └── value-objects/
│   │       ├── unique-id.vo.ts
│   │       └── money.vo.ts
│   └── infrastructure/   # Camada de Infraestrutura
│       └── database/
│           ├── mongodb/
│           └── postgres/
├── app.module.ts         # Módulo raiz da aplicação
└── main.ts              # Entry point da aplicação
```

### Camadas Explicadas

| Camada             | Responsabilidade                                                                       |
| ------------------ | -------------------------------------------------------------------------------------- |
| **Domain**         | Lógica de negócio pura, entidades, agregados e value objects sem dependências externas |
| **Application**    | Casos de uso, orquestração de domínio (a implementar)                                  |
| **Infrastructure** | Detalhes técnicos: bancos de dados, APIs externas, frameworks                          |
| **Presentation**   | Controllers e DTOs para comunicação com clientes (a implementar)                       |

## 🛠️ Stack Tecnológico

### Core

- **Node.js** + **TypeScript 5.7** - Runtime e linguagem tipada
- **NestJS 11** - Framework backend robusto e opinionado
- **RxJS 7** - Programação reativa

### Banco de Dados

- **PostgreSQL** via **Drizzle ORM** - Database toolkit type-safe
- **MongoDB** - NoSQL com driver nativo

### Desenvolvimento

- **ESLint 9** + **Prettier** - Linting e formatação
- **Jest 30** - Testing framework
- **Supertest** - HTTP assertions para testes e2e
- **ts-node** - Execução direta de TypeScript

### DevOps

- **Docker & Docker Compose** - Containerização
- **pnpm** - Package manager eficiente

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- pnpm 8+
- Docker & Docker Compose (para rodar bancos de dados)

### Instalação

```bash
# Instalar dependências
pnpm install

# Copiar variáveis de ambiente
cp .env.example .env

# Iniciar serviços (MongoDB + PostgreSQL)
docker-compose up -d
```

### Executar a Aplicação

```bash
# Modo desenvolvimento (com hot-reload)
pnpm run start:dev

# Modo production
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

A aplicação estará disponível em `http://localhost:3000` (porta configurável via `PORT` em `.env`)

## 🧪 Testes

```bash
# Executar testes unitários
pnpm run test

# Modo watch (re-executa ao salvar)
pnpm run test:watch

# Cobertura de testes
pnpm run test:cov

# Testes end-to-end
pnpm run test:e2e
```

## 📐 Padrões de Design Implementados

### Value Objects

Implementação de **Value Objects** para representar conceitos de negócio imutáveis:

- `UniqueId` - Identificador único tipo-seguro
- `Money` - Representação de valores monetários com precisão

### Agregados (Aggregate Root)

A classe `AggregateRoot` serve como base para definir limites de consistência transacional e rastreabilidade de mudanças (event sourcing ready).

### Entity

Base abstrata para entidades do domínio com comparação por identidade.

## 📦 Estrutura de Arquivos Importantes

```
clean_shop/
├── src/
│   ├── shared/
│   │   ├── domain/           # Lógica de negócio pura
│   │   └── infrastructure/   # Implementações técnicas
│   ├── app.module.ts         # Configuração da aplicação
│   └── main.ts              # Bootstrap
├── test/
│   ├── app.e2e-spec.ts      # Testes end-to-end
│   └── jest-e2e.json        # Configuração Jest e2e
├── docker-compose.yml        # Serviços containerizados
├── package.json             # Dependências do projeto
└── tsconfig.json            # Configuração TypeScript
```

## ⚙️ Configuração

As variáveis de ambiente são gerenciadas centralmente via `@nestjs/config`:

```bash
# .env
PORT=3000
NODE_ENV=development

# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/clean_shop
MONGO_URI=mongodb://localhost:27017/clean_shop
```

## 🎯 Próximos Passos / Roadmap

- [ ] Implementação de use cases (Application layer)
- [ ] Controllers e DTOs (Presentation layer)
- [ ] Autenticação e autorização (JWT)
- [ ] Validação de dados com class-validator
- [ ] Logging estruturado
- [ ] API REST com OpenAPI/Swagger
- [ ] Migrations de banco de dados
- [ ] CI/CD pipeline

## 📚 Referências & Recursos

- [NestJS Documentation](https://docs.nestjs.com)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
- [Drizzle ORM](https://orm.drizzle.team/)

## 💡 Aprendizados & Decisões Arquiteturais

Este projeto demonstra:

- Como estruturar uma aplicação seguindo Clean Architecture
- Implementação prática de DDD com value objects e aggregates
- Separação de concerns entre domain e infrastructure
- Type-safety com TypeScript em todos os layers
- Preparação para escalabilidade com suporte multi-banco de dados

## 📄 Licença

UNLICENSED - Projeto privado

---

**Desenvolvido com ❤️ seguindo as melhores práticas de engenharia de software**
