import { component$, useResource$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { grafbaseClient } from '~/utils/grafbase';

type Plant = {
  id?: string
  name: string
  description: string
}

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

export const AddNewPlantMutation = { query: 
  `mutation AddNewPlant($name: String!, $description: String!) {
    plantCreate(input: { name: $name, description: $description }) {
      plant {
        id
        name
      }
    }
  }`,
  variables: {
    first: 100
  }
}

export default component$(() => {

  const state = useStore<Plant>({name: 'plant', description: 'green'})

  const plantResource = useResource$(async () => {
		const { plants } = await grafbaseClient(GetAllPlantsQuery);
  console.log('plants', plants)

		return plants;
	});

  console.log('data', plantResource)
  return (
    <div>
      <h1>Plants</h1>
      <form>
        <fieldset>
          <legend>New plant</legend>
          <input id="name" name="name" placeholder="Name" onChange$={ event =>
          state.name = event.target.value } />
          <br />
          <textarea
            id="description"
            name="description"
            placeholder="Describe the plant"
            onChange$={ event =>
              state.description = event.target.value }
            rows={5}
          ></textarea>
          <br />
          <button
            onClick$={async () => {
              const { plant } = await grafbaseClient(AddNewPlantMutation)    
            }}
          > Yooo
					</button>

        </fieldset>
      </form>

{/* 
      {plantResource?.plantCollection?.edges?.map(({ node }) => (
        <>
        <div>{node.id}</div>
        <div>{node.name}</div>
        <div>{node.description}</div>
        </>
      ))} */}
      
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
