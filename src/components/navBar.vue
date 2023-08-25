<template>
    <div class="wrapper">
        <nav>
            <RouterLink to="/" class="link" data-text="Formulário">
              <img src="../assets/form.png" alt="">
            </RouterLink>
            <RouterLink to="/table" class="link" data-text="Tabela">
              <img src="../assets/table.png" alt="">
            </RouterLink>
        </nav>
    </div>
</template>

<style scoped>
  .link {
    position: relative;
    background-color: rgba(0, 82, 83, 0.5);
    border-radius: 4rem;
    display: inline-block;
  }

  .link::before {
    content: attr(data-text);
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    transform: translateY(-50%);
    background-color: rgba(0, 82, 83, 0.8);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
  }

  .link:hover::before {
    opacity: 1;
    visibility: visible;
  }

  .link:hover {
    background-color: rgba(0, 82, 83, 0.8);
  }

  img{
    max-width: 50px;
    margin: 1rem;
  }

  nav  {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    text-align: left;
    margin-top: 2rem;
    height: 50vh;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    gap:25px
  }
  
  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
</style>