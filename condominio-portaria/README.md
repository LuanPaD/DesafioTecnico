# 📦 Projeto: Desafio - Condomínio Portaria - Backend

API desenvolvida com **Node.js** e **Fastify** para importação e gestão de boletos via arquivos **CSV** e **PDF**, com persistência em **PostgreSQL** e geração de relatórios em **PDF (base64)**.

---

## 📁 Estrutura do Projeto

- `src/models/`: Modelos Sequelize (`Boleto`, `Lote`)
- `src/routes/`: Rotas Fastify (`/importar-csv`, `/importar-pdf`, `/boletos`)
- `src/services/`: Lógica de importação, processamento e persistência
- `src/utils/`: Utilitários de:
  - Geração e exportação de PDFs
  - Separação de páginas de PDF
  - Parsing de CSV
  - Mapeamento de IDs dos documentos
- `uploads/`: Armazena os arquivos CSV e PDF recebidos
- `splitted_pdfs/`: Armazena PDFs individuais gerados por página

---

## 🔌 Endpoints

### ✅ POST `/importar-csv`
Importa dados dos boletos via **arquivo CSV** (`multipart/form-data`).

### ✅ POST `/importar-pdf`
Importa um **PDF** com páginas correspondentes aos boletos, já importados via CSV.

### 📄 GET `/boletos`
Retorna todos os boletos como **JSON** ou um **PDF base64** com suporte a filtros:

#### 🔍 Filtros disponíveis via query params:

| Parâmetro       | Tipo     | Exemplo                                |
|-----------------|----------|----------------------------------------|
| `nome`          | string   | `?nome=João`                           |
| `id_lote`       | número   | `?id_lote=3`                           |
| `valor_inicial` | número   | `?valor_inicial=100`                   |
| `valor_final`   | número   | `?valor_final=300`                     |
| `relatorio`     | 1        | `?relatorio=1` → retorna PDF base64    |

---

## 🧩 Dependências

| Pacote               | Função                                                    |
|----------------------|-----------------------------------------------------------|
| `fastify`            | Framework web rápido e leve                               |
| `@fastify/multipart` | Upload de arquivos via `multipart/form-data`              |
| `@fastify/static`    | Servir arquivos estáticos (PDFs gerados)                  |
| `csv-parser`         | Leitura e parsing de arquivos CSV                         |
| `dotenv`             | Gerenciamento de variáveis de ambiente (.env)             |
| `sequelize`          | ORM para PostgreSQL                                       |
| `pg`                 | Driver PostgreSQL                                         |
| `pdf-lib`            | Manipulação de PDFs (divisão de páginas)                  |
| `pdfkit`             | Geração de arquivos PDF individuais                       |

---

## 📎 Requisitos

- [Node.js](https://nodejs.org)
- [PostgreSQL](https://www.postgresql.org/) (com banco configurado no `.env`)

---

## 🧪 Exemplo de `.env`

```env
DB_USER="seuusuario"
DB_PASSWORD="suasenha"
DB_HOST="localhost"
DB_NAME="database"
DB_PORT="5434"
PORT=3000
```

📡 Exemplos de Consumo das Rotas
📥 Importar CSV
curl -X POST http://localhost:3000/importar-csv \
  -H "Content-Type: multipart/form-data" \
  -F "file=@uploads/csv/boletos.csv"

📥 Importar PDF
curl -X POST http://localhost:3000/importar-pdf \
  -H "Content-Type: multipart/form-data" \
  -F "file=@uploads/pdf/boletos.pdf"

📄 Obter Todos os Boletos (JSON)
curl http://localhost:3000/boletos

📄 Filtrar por Nome e Lote
curl "http://localhost:3000/boletos?nome=João&id_lote=2"

💰 Filtrar por Valor
curl "http://localhost:3000/boletos?valor_inicial=100&valor_final=500"

📤 Gerar Relatório PDF (base64)
curl "http://localhost:3000/boletos?relatorio=1"

🚀 Como Iniciar o Projeto
npm install          # Instala as dependências
npm run seed         # Cria as tabelas e popula a tabela "lote"
npm start            # Inicia o servidor na porta 3000

🔄 Ordem de uso:
Envie um CSV para /importar-csv

Exemplo: http://localhost:3000/importar-csv
Formato: multipart/form-data, campo: file

Em seguida, envie um PDF para /importar-pdf

Exemplo: http://localhost:3000/importar-pdf
Formato: multipart/form-data, campo: file
