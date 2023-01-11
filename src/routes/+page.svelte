<script lang="ts">
  import { onMount } from "svelte";
  let spells : Record<string, unknown>[];
  let chant : string;
  let result : string;

  onMount(async () => {
    await updateSpells();
  });
  
  async function addSpell() {
    await fetch("/api/upstash", {
      method: "POST",
      body: JSON.stringify({ chant, result }),
      headers: { "Content-Type": "application/json" },
    });
    await updateSpells();
  }

  async function updateSpells() {
    const response = await fetch("/api/upstash", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    spells = data.spells;
  }

</script>

<div class="flex flex-col text-center w-full max-w-3xl h-full">
  <h1 class="text-3xl">Welcome to SvelteKit</h1>
  <p class="text-lg">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

  <p class="text-lg">Save a Spell</p>
  <div class="flex flex-row gap-8">
    <input type="text" name="chant" placeholder="mooserver" bind:value={chant} />
    <input type="text" name="result" placeholder="theshhhhwords" bind:value={result} />
  </div>
  <button on:click={addSpell}>Save</button>
  {#if spells}
    {#each spells as spell}
      <div class="flex flex-row gap-8">
        <p>{spell.chant}</p>
        <p>{spell.result}</p>
      </div>
    {/each}
  {:else}
    <p>You have no saved spells</p>
  {/if}

</div>
