<script>
  export default {
    name: 'itens',
    data(){
      return{
        itens:[]
      }
    },
  
    mounted(){
      // assim que a pagina é carregada, é chamada a 
      // funcao para carregar a tabela 
      this.atualizaTabela();
    },
    
    methods:{
      atualizaTabela(){
        // busca os itens dentro do localstorage
        // entao são armazenados na variavel itens
        const itensExistentes = JSON.parse(localStorage.getItem('itens')) || [];
        this.itens = itensExistentes;
        console.log(this.itens);
      },

      excluir(index){
        this.itens.splice(index, 1);
        localStorage.setItem('itens',JSON.stringify(this.itens));
        alert("Item excluido com sucesso!");
      }
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
              <RouterLink class="btn btn-success" 
              :to="{name: 'form', params: {index: index} }">
                editar {{index}}
              </RouterLink>

              <button @click="excluir(index)" class="btn btn-danger">
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
  