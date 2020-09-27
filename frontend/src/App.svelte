<script>
  let longUrl = "";
  let shortUrl = "";
  const shortenUrl = async () => {
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({longUrl})
    }).then(r => r.json())
    shortUrl = res.shortUrl;
    navigator.clipboard.writeText(shortUrl);
  }
</script>

<main>
  <h1>short-url</h1>
  <input bind:value={longUrl}/>
  <button on:click={shortenUrl}>Shorten</button>

  <div>{shortUrl}</div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
