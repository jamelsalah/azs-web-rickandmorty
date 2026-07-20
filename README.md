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

### Por que essas escolhas

**Sem cliente GraphQL dedicado.** GraphQL usa um endpoint único e sempre POST, com a query
no corpo da requisição. Isso cabe numa função de ~20 linhas sobre o `fetch` nativo, sem
nenhuma dependência — o projeto não instala nem o pacote `graphql`.

**Sem Apollo Client.** O grande diferencial do Apollo é o cache normalizado, que existe
para manter a UI consistente depois de *mutations*. A introspecção do schema desta API
mostra que ela só expõe `queryType`: **não há mutations**. O custo do Apollo (bundle
significativamente maior, as peer dependencies obrigatórias `graphql` e `rxjs`, e conceitos
como links e fetch policies) ficaria sem a contrapartida que o justifica.

**Sem axios.** O axios resolve problemas típicos de REST — interceptors, transformação de
resposta, parâmetros de URL — nenhum dos quais aparece num endpoint único com corpo fixo.
Somado a uma camada de cache, seria peso morto.

**TanStack Query** entra onde o `fetch` puro não chega: cache por chave, deduplicação de
requisições, estados de carregamento e erro.

**Zustand** para favoritos e vistos porque `localStorage` sozinho **não é estado reativo**:
gravar nele não dispara re-render. O Zustand fornece a camada reativa e o middleware
`persist` grava no `localStorage` por baixo — são complementares, não alternativas.

## Notas sobre a API

Levantadas por introspecção do próprio endpoint:

- **Sempre POST.** Abrir a URL no navegador (GET) não retorna dados úteis.
- **Responde HTTP 200 mesmo em erro**, sinalizando a falha no array `errors` do corpo.
  Verificar apenas `response.ok` deixaria erros passarem silenciosamente.
- **Somente leitura**: o schema não tem mutations, por isso favoritos e vistos precisam ser
  estado local.
- `filter` é um input object — `filter: { name: $name }` — e aceita apenas `name` e
  `episode`.
- 51 episódios, 20 por página, 3 páginas.
- Uma busca sem resultados devolve `results: []` **e todos os campos de `info` como
  `null`**, inclusive `count` e `pages`.
- Sem autenticação e com CORS liberado.

---

Desafio proposto pela equipe de engenharia da AZShip.
