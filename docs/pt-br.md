# Documentação do Projeto

## Descrição Geral
O GoLedger Challenge é um teste técnico que consiste em desenvolver um sistema de interface web para gerenciamento de dados de um serviço de streaming inspirado em uma blockchain. O objetivo principal é demonstrar habilidades técnicas através da implementação de funcionalidades de registro, edição, exclusão e exibição de artistas, álbuns, músicas e playlists.

O projeto utiliza o Next.js como framework principal, combinado com bibliotecas modernas de UI e gerenciamento de estado. Este projeto é modular e segue boas práticas de organização e reutilização de componentes.

## Tecnologias e Dependências

Principais Tecnologias

- Next.js: Framework React para renderização no lado do servidor (SSR).
- React: Biblioteca JavaScript para construção de interfaces de usuário.
- Tailwind CSS: Framework CSS para estilização.
- Radix UI: Componentes acessíveis para UI.
- React Hook Form: Gerenciamento de formulários.
- Zod: Validação de dados.
- TanStack React Query: Gerenciamento de estado assíncrono.
- Zustand: Biblioteca para gerenciamento de estado leve.

## Estrutura de Pastas
Abaixo está a estrutura de pastas do projeto e uma breve descrição de cada pasta:

### Raiz do Projeto
- public/: Armazena arquivos estáticos como imagens e ícones.
- dictionaries/: Arquivos JSON para internacionalização (ex.: en-us.json e pt-br.json).
- node_modules/: Dependências instaladas.
- package.json: Gerenciamento de dependências e scripts.
  
### Diretório app/ 

Organização principal das páginas da aplicação:

### Diretório components/

Componentes reutilizáveis para modais e outras funcionalidades:

- modals/: Contém modais para criar, editar e deletar entidades.

- - Subpastas:
- - - album/: Modais relacionados a álbuns.
- - - artist/: Modais relacionados a artistas.
- - - playlist/: Modais relacionados a playlists.
- - - - Contém o formulário para adicionar músicas a playlists (add-song-form.tsx).
- - - song/: Modais relacionados a músicas.
- ui/: Componentes genéricos de interface como botões, tabelas, seletores de tema, etc.


### Diretório lib/
Funções utilitárias e helpers para facilitar o uso e reutilização de lógicas no código.

### Diretório service/
Arquivos relacionados à comunicação com APIs:

- api.ts: Configuração principal do Axios para requisições.
- handle-api-error.tsx: Tratamento centralizado de erros de API
  
## Funcionalidades Implementadas
1. Gerenciamento de Artistas, Álbuns, Músicas e Playlists

- Criar, editar e remover registros de artistas, álbuns, músicas e playlists.
- Exibição de todos os registros em tabelas.

2. Internacionalização (i18n)

- Suporte a múltiplos idiomas com next-intl (ex.: inglês e português).

3. Tema Escuro/Claro

- Alternância entre temas usando next-themes.

5. Modais Acessíveis

- Modais para criar, editar e remover entidades, utilizando Radix UI Dialog.

6. Gerenciamento de Estado

- Gerenciamento assíncrono com React Query.
- Gerenciamento local leve com Zustand.
  
## Como Executar o Projeto
**Pré-requisitos**

Certifique-se de ter o Node.js instalado (versão 18 ou superior).

**Instalação**

1. Clone o repositório:
```bash
git clone https://github.com/EduardoHoths/goledger-challenge-web
cd goledger-challenge-web
```
2. Instale as dependências:
```bash
npm install
```
3. Configure o arquivo .env:

Adicione variáveis necessárias, como as credenciais da api.

Exemplo

```bash
NEXT_PUBLIC_API_USER=user
NEXT_PUBLIC_API_PASS=password
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Abra no navegador
```arduino
http://localhost:3000
```

## Considerações Técnicas

### Gerenciamento de Formulários

- Utiliza react-hook-form para validação de formulários.
- Integração com zod para validação de esquemas.

### API

- As requisições são feitas com Axios, configurado em service/api.ts.

### Componentes Modulares

- Componentes reutilizáveis (ex.: botões, dropdowns e modais) em components/ui.

### Melhorias Futuras (Sugestões)

- Implementar paginação para tabelas de exibição.
- Adicionar testes automatizados com Jest.
- Adicionar responsivo em todas as páginas
- Adicionar filtros por colunas
