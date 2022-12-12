# Grafbase ⨯ Fresh

[Join our Community](https://grafbase.com/community)

## Please note

This example uses the qwik web framework Fresh &mdash; [learn more](https://qwik.builder.io/docs/getting-started/)

## Getting Started

1. Make sure you have [Deno installed](https://deno.land) and ready to go first.
2. Run `npx degit grafbase/grafbase/examples/qwik` to clone this example
3. Change directory into the new folder `cd qwik`
4. Run `cp .env.example .env` to copy the example `.env.example` file to `.env`
5. Open `.env` in your code editor and provide your Grafbase API endpoint and API key. Example should be fine for `npx grafbase dev`!
6. Run `npx grafbase@latest dev` in your terminal
7. Populate the backend with some `Message` entries using a GraphQL mutation:

```graphql
mutation {
  plantCreate(
    input: {
      name: "philodendron", 
      types: [{ 
        create: { 
          variation: "prince of orange",
          rare: false
        }
      }]
    }
  ) {
    plant {
      id
      name
      types(first: 1) {
        edges {
          node {
            variation
            rare
          }
        }
      }
    }
  }
}
```

6. In another terminal, run `qwik start` and visit [`http://localhost:8000`](http://localhost:8000)

## Learn More About Grafbase

To learn more about Grafbase, take a look at the following resources:

- [Grafbase](https://grafbase.com/) - learn about Grafbase features and API.

To learn more about Next.js, take a look at the following resources:

- [Fresh Documentation](https://fresh.deno.dev/) - learn about Fresh.
- [Learn Deno](https://deno.land/) - learn more about Deno.

### Run on Codesandbox

[![Develop with Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/grafbase/grafbase/tree/main/examples/fresh)
