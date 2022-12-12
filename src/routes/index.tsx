import { component$, Resource, useResource$, useSignal } from '@builder.io/qwik';
import { grafbaseClient } from '~/utils/grafbase';

interface Plants {
  plantCollection: {
    edges: Plant[]
  }
}

interface Plant {
  id: string
  name: string
  description: string
}
export const GetAllPlantsQuery = `
  query GetAllPlants($first: Int!) {
    plantCollection(first: $first) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`

export const AddNewPlantMutation = `
  mutation AddNewPlant($name: String!, $description: String!) {
    plantCreate(input: { name: $name, description: $description }) {
      plant {
        id
        name
        description
      }
    }
  }
`

export default component$(() => {
  const newPlant = useSignal('');
  const newPlantDescription = useSignal('');

  const plantResource = useResource$(async () => {
		return await grafbaseClient({ query: GetAllPlantsQuery, variables: {first: 100}});
	});

  return (
    <div>
      <h1>Plants</h1>
      <Resource
        value={plantResource}
        onResolved={(plant: Plants) => plant?.plantCollection?.edges?.map(({ node }) => (
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
          await grafbaseClient({ query: AddNewPlantMutation, variables: { name: newPlant.value, description: newPlantDescription.value }})    
        }}
      > Add Plant
      </button>
    </div>
  );
});