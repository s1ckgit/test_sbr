<script>

  import ConverterForm from "./lib/ConverterForm.svelte";

</script>


<h1 class="title">Converter</h1>
<main class="main">
  <ConverterForm />
</main>

<style>
  .main {
    width: 500px;
    padding: 1rem;

    background-color: white;
  }

  .title {
    font-size: 4rem;
    font-weight: 600;
    text-align: center;
  }
</style>