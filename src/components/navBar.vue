<template>
    <div class="wrapper">
        <nav>
            <RouterLink to="/">
              <img src="../assets/form.png" alt="">
            </RouterLink>
            <RouterLink to="/table">
              <img src="../assets/table.png" alt="">
            </RouterLink>
        </nav>
    </div>
</template>
<style scoped>

nav {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-align: left;
  margin-top: 2rem;
  background-color: rgba(65, 100, 74, 0.7);
  height: 50vh;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  gap:25px
}

img{
  max-width: 50px;
  margin: 0.5rem;
}
  nav a.router-link-exact-active {
    color: var(--color-text);
  }
  
  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }
  
  nav a {
    display: inline-block;
    border-left: 1px solid var(--color-border);
  }
  
  nav a:first-of-type {
    border: 0;
  }
    .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
}
</style>