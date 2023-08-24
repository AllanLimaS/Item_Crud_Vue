<script>
  export default {
    name: 'itens',
    data(){
      return{
        itens:[]
      }
    },
  
  mounted(){
    // Quando a pagina é carregada, é buscado os itens dentro do localstorage
    // entao são armazenados na variavel itens
    const itensExistentes = JSON.parse(localStorage.getItem('itens')) || [];
    this.itens = itensExistentes;
    console.log(this.itens);
  }
}
  </script>

<template>
    <div class="container">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nome do item</th>
            <th>Unidade</th>
            <th>Qnt</th>
            <th>Preço</th>
            <th>Data fab.</th>
            <th>data venc.</th>
            <th>Perecível</th>
            <th>Ações</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in this.itens" :key="index">
            <td>{{ item.nome }}</td>
            <td>{{ item.unidade }}</td>
            <td>{{ item.quantidade }}</td>
            <td>{{ item.preco }}</td>
            <td>{{ item.fabricacao }}</td>
            <td>{{ item.vencimento }}</td>
            <td>{{ item.perecivel }}</td>
            <td>
              <button class="btn btn-success">
                Editar
              </button>
              <button @click="delete(index)" class="btn btn-danger">
                Excluir
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>

  </style>
  