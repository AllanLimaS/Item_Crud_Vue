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
      },

      excluir(index){
        this.itens.splice(index, 1);
        localStorage.setItem('itens',JSON.stringify(this.itens));
        alert("Item excluido com sucesso!");
      },

      editar(index){
        // redireciona para o formulario passando o index 
        // do item que será editado
        this.$router.push({path: '/', query : { index: index}});
      },

      getUnidade(unidade){
        // Retorna a string referente ao tipo de unidade do item.
        switch (unidade){
          case "1":
            return "Lt";
          case "2":
            return "Kg";
          case "3":
            return "Un";
        }
      },

      getPerecivel(perecivel){
        // Retorna uma string para a coluna "perecível"
        if(perecivel){
          return "Sim";
        }else{
          return "Não";
        }
      }
    }
  }

</script>

<template>
  <h1>Tabela de itens</h1>
  <div class="table-container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nome do item</th>
          <th>Unidade</th>
          <th>Qnt</th>
          <th>Preço</th>
          <th>Data fab.</th>
          <th>Data venc.</th>
          <th>Perecível</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in this.itens" :key="index">
          <td>{{ item.nome }}</td>
          <td>{{ getUnidade(item.unidade )}}</td>
          <td>{{ item.quantidade }}</td>
          <td>{{ item.preco }}</td>
          <td>{{ item.fabricacao }}</td>
          <td>{{ item.vencimento }}</td>
          <td>{{ getPerecivel( item.perecivel) }}</td>
          <td>
            <button class="btn btn-success" 
                    @click="editar(index)">
                    Editar
            </button>
            <button class="btn btn-danger"
                    @click="excluir(index)" >
                    Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  