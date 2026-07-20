# Rick and Morty — Desafio AZShip Front-end Web

Aplicação web em React para gerenciar os episódios de *Rick and Morty*, consumindo a
[Rick and Morty API](https://rickandmortyapi.com/graphql) (GraphQL).

> **Status:** ambiente de desenvolvimento configurado. As funcionalidades ainda não foram
> implementadas.

## Funcionalidades previstas

- [ ] Listar episódios com número, nome, data de exibição e quantidade de personagens
- [ ] Detalhar episódio com a lista de personagens (foto, nome, espécie, status)
- [ ] Favoritar e desfavoritar episódios
- [ ] Marcar episódio como visto
- [ ] Listar episódios favoritos
- [ ] Buscar episódio pelo nome

## Rodando o projeto

Requer **Node.js 20.19+ ou 22.12+** (exigência do Vite 8).

```bash
npm install
npm run dev
```

A aplicação sobe em **http://localhost:3005**.

### Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Dev server na porta 3005 |
| `npm run build` | Type-check (`tsc -b`) e build de produção |
| `npm run preview` | Serve o build gerado, também na 3005 |
| `npm run lint` | Análise estática com oxlint |

## Stack

| Ferramenta | Papel |
|---|---|
| React 19 + TypeScript | UI e tipagem |
| Vite 8 | Build e dev server |
| TanStack Query 5 | Cache de dados remotos, estados de loading/erro |
| Zustand 5 (+ `persist`) | Favoritos e vistos, persistidos em `localStorage` |
| React Router 7 | Navegação |
| Tailwind CSS 4 | Estilo e responsividade |


---

Desafio proposto pela equipe de engenharia da AZShip.
