import { component$, Resource, useResource$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { grafbaseClient } from '~/utils/grafbase';

export const GetAllPlantsQuery = { query: 
  `query GetAllPlants($first: Int!) {
    plantCollection(first: $first) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }`,
  variables: {
    first: 100
  }
}

export const AddNewPlantMutation = (name: string, description: string) => ({ query: 
  `mutation AddNewPlant($name: String!, $description: String!) {
    plantCreate(input: { name: $name, description: $description }) {
      plant {
        id
        name
        description
      }
    }
  }`,
  variables: {
    name,
    description
  }
})

export default component$(() => {
  const newPlant = useSignal('');
  const newPlantDescription = useSignal('');

  const plantResource = useResource$(async () => {
		return await grafbaseClient(GetAllPlantsQuery);
	});

  console.log('data', plantResource)
  return (
    <div>
      <h1>Plants</h1>
      <Resource
        value={plantResource}
        onResolved={(plant) => plant?.plantCollection?.edges?.map(({ node }) => (
          <>
          <div>{node?.name}: {node?.description}</div>
          </>
        ))
        }
      ></Resource>
      <h2>New plant</h2>
      <input id="name" name="name" placeholder="Name" value={newPlant.value} onInput$={ event =>
      newPlant.value = (event.target as HTMLInputElement).value } />
      <br />
      <input id="description" name="description" placeholder="Describe the plant" value={newPlantDescription.value} onInput$={ event =>
      newPlantDescription.value = (event.target as HTMLInputElement).value } />
      <br />
      <button
        onClick$={async () => {
          await grafbaseClient(AddNewPlantMutation(newPlant.value, newPlantDescription.value))    
        }}
      > Add Plant
      </button>
    </div>
  );
});