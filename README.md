
# Desafio da API de produtos

Projeto feito para um desafio que envolve efetuar operações CRUD dentro de uma API de produtos.

O projeto foi feito primordialmente com **TypeScript** e com o uso de **Fastify** como framework, **Prisma ORM** e foi também documentado de forma simples usando **Swagger**



## Documentação da API

Para acessar a documentação completa do Swagger
```http
  GET products/docs
```
#### Cria um produto

```http
  POST /products
```

#### Retorna todos os produtos

```http
  GET /products
```

#### Edita um produto

```http
  PUT /product/${id}
```

#### Retorna apenas um produto

```http
  GET /product/${id}
```

#### Deleta um produto

```http
  DELETE /product/${id}
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID único do produto|
| `name`      | `number` | **Obrigatório**. Nome único do produto |
| `description`      | `string` | **Opcional**. Descrição opcional do produto (Até 500 caracteres) |
| `price`      | `number` | **Obrigatório**. Preço do produto
| `stock`      | `number` | **Obrigatório**. Estoque do produto |




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

**Opcional**

`PORT`

## Execução
Este projeto utiliza um banco de dados hospedado na nuvem. Para conectar ao banco de dados, siga os seguintes passos:

Inicialize um banco de dados PostgreSQL localmente ou através de um website que oferece o serviço na nuvem, como exemplo, o site **[Neon](https://console.neon.tech/)** oferece esta possibilidade.


Para criar a tabela de produtos:

```bash
  npx prisma migrate
```

Para executar as migrations:

```bash
  npx prisma migrate
```

Para rodar esta API

```bash
  npm run dev
```



## Aprendizados

 - Primeiro contato com Swagger como ferramenta de documentação
 - Avanço nos estudos da ORM utilizada
 - Padrão de projeto que implementa certos conceitos SOLID

