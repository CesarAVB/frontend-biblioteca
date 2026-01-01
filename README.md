# 📚 Minha Biblioteca

Sistema completo de gerenciamento de biblioteca pessoal desenvolvido com **Angular 19** (frontend) e **Spring Boot 3** (backend). Interface moderna e responsiva com design system próprio, utilizando Signals e Standalone Components.

## 🎯 Sobre o Projeto

Aplicação full-stack para catalogar e gerenciar sua coleção pessoal de livros. O sistema oferece uma experiência de usuário moderna e fluida, com busca em tempo real, formulários reativos e design responsivo.

## ✨ Funcionalidades

- ✅ **CRUD Completo** - Criar, listar, editar e excluir livros
- 🔍 **Busca em Tempo Real** - Filtro por título, autor ou ISBN
- 📊 **Dashboard Interativo** - Estatísticas da coleção
- 🎨 **Interface Moderna** - Design system com gradientes e animações
- 📱 **Totalmente Responsivo** - Adaptado para mobile, tablet e desktop
- ⚡ **Performance Otimizada** - OnPush change detection e lazy loading
- 🔄 **State Management** - Gerenciamento de estado com Signals

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Estilização avançada
- **Signals** - Gerenciamento de estado reativo
- **Standalone Components** - Arquitetura moderna sem modules
- **Reactive Forms** - Formulários reativos
- **HttpClient** - Comunicação com API REST

### Backend
- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Data JPA** - Persistência de dados
- **MySQL** - Banco de dados
- **Lombok** - Redução de boilerplate
- **Bean Validation** - Validação de dados

### Ferramentas
- **Maven** - Gerenciamento de dependências (backend)
- **npm** - Gerenciamento de pacotes (frontend)
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

### Frontend (Angular)
```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Página principal
│   │   ├── book-card/          # Card de exibição de livro
│   │   ├── book-form/          # Formulário de cadastro/edição
│   │   └── book-list/          # Lista de livros
│   ├── models/
│   │   └── book.model.ts       # Interface do livro
│   ├── services/
│   │   └── book.service.ts     # Serviço de comunicação com API
│   ├── app.config.ts           # Configuração da aplicação
│   └── app.routes.ts           # Rotas da aplicação
├── environments/
│   ├── environment.ts          # Configuração de produção
│   └── environment.development.ts # Configuração de desenvolvimento
└── styles.scss                 # Estilos globais
```

### Backend (Spring Boot)
```
src/main/java/br/com/biblioteca/
├── controller/
│   └── BookController.java     # Endpoints REST
├── model/
│   └── Book.java               # Entidade JPA
├── repository/
│   └── BookRepository.java     # Interface JPA Repository
├── service/
│   └── BookService.java        # Lógica de negócio
├── exception/
│   └── handler/                # Tratamento de exceções
└── BibliotecaApplication.java  # Classe principal
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

**Frontend:**
- Node.js 18+ e npm
- Angular CLI 19

**Backend:**
- Java 21+
- Maven 3.6+
- MySQL 8.0+

### Instalação do Frontend

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd minha-biblioteca
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente**

Edite `src/environments/environment.development.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

4. **Execute o projeto**
```bash
ng serve
```

O frontend estará disponível em `http://localhost:4200`

### Instalação do Backend

1. **Configure o banco de dados**

Crie um arquivo `application.properties` em `src/main/resources/`:

```properties
spring.application.name=biblioteca
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/biblioteca?createDatabaseIfNotExist=true
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

2. **Compile e execute**
```bash
mvn clean install
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080`

## 🔌 Endpoints da API

### Books
- `GET /api/v1/books` - Listar todos os livros
- `GET /api/v1/books/{id}` - Buscar livro por ID
- `POST /api/v1/books` - Criar novo livro
- `PUT /api/v1/books/{id}` - Atualizar livro
- `DELETE /api/v1/books/{id}` - Deletar livro
- `GET /api/v1/books/search?q={query}` - Buscar livros

### Exemplo de Requisição

**POST /api/v1/books**
```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publicadoEm": "2008-08-01"
}
```

## 🎨 Design System

### Paleta de Cores
- **Background Principal**: `#0a0e1a` → `#1a1f35` (gradiente)
- **Cards**: `#1e293b` → `#0f172a` (gradiente)
- **Primária (Blue)**: `#3b82f6` → `#2563eb`
- **Secundária (Purple)**: `#8b5cf6`
- **Accent (Pink)**: `#ec4899`
- **Texto Primário**: `#f1f5f9`
- **Texto Secundário**: `#cbd5e1`
- **Texto Terciário**: `#94a3b8`

### Tipografia
- **Família**: Inter
- **Pesos**: 300, 400, 500, 600, 700, 800

## 📊 Modelo de Dados

### Book (Livro)
```typescript
interface Book {
  id: number;
  titulo: string;        // Máx 200 caracteres
  autor: string;         // Máx 100 caracteres
  isbn: string;          // Máx 20 caracteres
  publicadoEm: string;   // Data no formato ISO (YYYY-MM-DD)
}
```

## 🔄 Gerenciamento de Estado

O projeto utiliza **Signals** do Angular 19 para gerenciamento de estado reativo:

```typescript
// Dashboard Component
books = signal<Book[]>([]);
filteredBooks = signal<Book[]>([]);
searchQuery = signal('');
showForm = signal(false);
isLoading = signal(false);
```

## 🎯 Principais Features do Angular 19

- ✅ **Standalone Components** - Sem necessidade de NgModules
- ✅ **Signals** - Sistema reativo de estado
- ✅ **Control Flow** - `@if`, `@for`, `@switch` no template
- ✅ **inject()** - Injeção de dependências funcional
- ✅ **OnPush Change Detection** - Performance otimizada
- ✅ **Typed Forms** - Formulários fortemente tipados

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Build para Produção

### Frontend
```bash
ng build --configuration production
```

Os arquivos de build estarão em `dist/minha-biblioteca/`

### Backend
```bash
mvn clean package
java -jar target/biblioteca-0.0.1-SNAPSHOT.jar
```

## 🌐 Deploy

### Frontend (Vercel/Netlify)
1. Conecte o repositório
2. Configure o comando de build: `ng build`
3. Diretório de output: `dist/minha-biblioteca`
4. Variáveis de ambiente: `API_URL`

### Backend (Railway/Heroku)
1. Configure as variáveis de ambiente do banco de dados
2. Deploy automático via Git push

## 🔐 Variáveis de Ambiente

### Produção (Frontend)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api-biblioteca.cesaravb.com.br'
};
```

### Produção (Backend)
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

## 🧪 Testes

### Frontend
```bash
ng test
```

### Backend
```bash
mvn test
```

## 📈 Melhorias Futuras

- [ ] Autenticação de usuários (JWT)
- [ ] Categorias de livros
- [ ] Sistema de avaliação (rating)
- [ ] Upload de capas de livros
- [ ] Exportação de dados (PDF, Excel)
- [ ] Wishlist de livros
- [ ] Integração com APIs de livros (Google Books)
- [ ] Dark/Light mode toggle
- [ ] Gráficos e relatórios avançados
- [ ] PWA (Progressive Web App)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Desenvolvedor

**César Augusto**
- Email: cesar.augusto.rj1@gmail.com
- Portfolio: https://quemsoueu-six.vercel.app/

## 🔗 Links

- **Frontend (Produção)**: Em breve
- **Backend (Produção)**: https://api-biblioteca.cesaravb.com.br
- **Frontend (Local)**: http://localhost:4200
- **Backend (Local)**: http://localhost:8080

---

⭐ Se este projeto te ajudou, não esqueça de dar uma estrela!