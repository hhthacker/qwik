# Grafbase ⨯ Fresh

[Join our Community](https://grafbase.com/community)

## Please note

This example uses the qwik web framework &mdash; [learn more](https://qwik.builder.io/docs/getting-started/)

## Getting Started

1. Make sure you node.js v16 or higher and run `npm create qwik@latest`
2. Run `npx degit grafbase/grafbase/examples/qwik` to clone this example
3. Change directory into the new folder `cd qwik`
4. Run `cp .env.example .env` to copy the example `.env.example` file to `.env`
5. Open `.env` in your code editor and provide your Grafbase API endpoint and API key. Example should be fine for `npx grafbase dev`!
6. Run `npx grafbase@latest dev` in your terminal
7. Populate the backend with some `Message` entries using a GraphQL mutation:

```graphql
  mutation {
    plantCreate(input: { name: "pothos", description: "trailing marbled leaves" }) {
      plant {
        id
        name
        description
      }
    }
  }
```

6. In another terminal, run `npm start` and visit [`http://localhost:5173/`](http://localhost:5173/)

## Learn More About Grafbase

To learn more about Grafbase, take a look at the following resources:

- [Grafbase](https://grafbase.com/) - learn about Grafbase features and API.

To learn more about Builder.io, take a look at the following resources:

- [Qwik City Documentation](https://qwik.builder.io/qwikcity/overview/) - learn about Qwik City.
- [Learn Qwik](https://qwik.builder.io/docs/overview/) - learn more about Qwik.

### Run on Codesandbox

- todo