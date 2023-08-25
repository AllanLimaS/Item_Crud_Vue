<script >
  import { vMaska } from "maska"

  export default{
    directives:{ maska : vMaska},
    data() {
      return {
        //  armazena as propriedades da mascara do campo quantidade, para que  
        //  sejam alteradas de maneira dinamica
        maskQuantidade: "0.999",
        tokensQuantidade: "0:\\d:multiple|9:\\d:optional",

        index:null
      };
    },

    mounted(){
      // Quando a pagina é carregada, é verificado se existe algum 
      // parametro no router, indicando uma edição de item
      this.index = this.$route.query.index;

      if(this.index >= 0 ){

        const btnSalvar = this.$refs.btnSalvar;
        btnSalvar.innerHTML = "Editar item";
        const btnCancelar = this.$refs.btnCancelar;
        btnCancelar.innerHTML = "Cancelar edição";
        
        const itens = JSON.parse(localStorage.getItem('itens')) || [];
        const item = itens[this.index];
        
        // verifica se o item existe dentro do local storage
        if(item){

          // Passa todas as informações para o form
          this.$refs.nomeInput.value = item.nome;
          // Ajusta o checkbox 
          switch (item.unidade){
            case "1":
              this.$refs.medidaLitro.checked = true;
              break;
            case "2":
              this.$refs.medidaQuilograma.checked = true;
              break;
            case "3":
              this.$refs.medidaUnidade.checked = true;
              break;
          }
          // ajusta o input da quantidade sem mascara.
          this.$refs.quantidadeInput.disabled = false;
          this.maskQuantidade = "";
          this.tokensQuantidade = "";

          this.$refs.quantidadeInput.value = item.quantidade;
          this.$refs.precoInput.value = item.preco;
          this.$refs.fabricacaoDataInput.value = item.fabricacao;
          this.$refs.vencimentoDataInput.value = item.vencimento;
          this.$refs.perecivelInput.checked = item.perecivel;
        }
      }
    },

    methods:{

      salvarItem(){
        if(this.validarCampos()){

          // cria um objeto com todos os valores do formulário
          const item = {
            nome: this.$refs.nomeInput.value,
            unidade: this.verificaRadios().value,
            quantidade: this.$refs.quantidadeInput.value,
            preco: this.$refs.precoInput.value,
            fabricacao: this.$refs.fabricacaoDataInput.value,
            vencimento: this.$refs.vencimentoDataInput.value,
            perecivel: this.$refs.perecivelInput.checked
          };
          
          // caso seja uma edicao, o objeto é direcionado para outra funcao
          if(this.index >= 0){
            this.editarItemExistente(item);
            return;
          }
          // busca no local storage os itens ja existentes 
          // caso nao exista nenhum, cria um array vazio 
          const itensExistentes = JSON.parse(localStorage.getItem('itens')) || [];
          
          // insere o novo item no array
          itensExistentes.push(item)

          // armazena no local storage
          localStorage.setItem('itens',JSON.stringify(itensExistentes));
          alert("Item cadastrado com sucesso!");
          this.limparCampos();
        }
      },

      editarItemExistente(itemEditado){
        // busca os items no local storage
        const itens = JSON.parse(localStorage.getItem('itens')) || [];
        // altera o item solicitado
        itens[this.index] = itemEditado;
        // atualiza novamente a lista do local storage
        localStorage.setItem('itens',JSON.stringify(itens));
        alert("Item editado com sucesso!");
        this.cancelar();
      },

      limparCampos(){
        this.$refs.nomeInput.value = "";
        this.$refs.medidaLitro.checked = "";
        this.$refs.medidaQuilograma.checked = "";
        this.$refs.medidaUnidade.checked = "";
        this.$refs.quantidadeInput.value = "";
        this.$refs.precoInput.value = "";
        this.$refs.fabricacaoDataInput.value = "";
        this.$refs.vencimentoDataInput.value = "";
        this.$refs.perecivelInput.checked = "";
      },

      cancelar(){
        this.limparCampos();

        // caso houver um index na pagina, esta cancelando uma edicao
        if(this.index >= 0){
          // apaga o index
          this.index = null;
          // apaga o parametro do router
          this.$router.push('/');
          this.$refs.btnSalvar.innerHTML = "Salvar";
          this.$refs.btnCancelar.innerHTML = "Cancelar";
        }
      },

      validarCampos(){
        // verifica se os campos estão preenchidos
        if (!this.$refs.nomeInput.value) {
          alert("Nome para o item é obrigatório.");
          return false;
        }
        if (!this.verificaRadios()) {
          alert("Selecione uma unidade de medida.");
          return false;
        }
        if (!this.$refs.quantidadeInput.value) {
          alert("Campo 'Quantidade' é obrigatório.");
          return false;
        }
        if (!this.$refs.precoInput.value) {
          alert("Preço do item é obrigatório.");
          return false;
        }
        if (!this.$refs.fabricacaoDataInput.value) {
          alert("Data de fabricação do item é obrigatório.");
          return false;
        }

        // verifica o campo de vencimento apenas se for um produto perecivel
        if (this.$refs.perecivelInput.checked) {
          if (!this.$refs.vencimentoDataInput.value) {
            alert("Data de vencimento é obrigatória para produtos perecíveis.");
            return false;
          }
        }
        return true;
      },

      verificaRadios(){
        const medidaLitro = this.$refs.medidaLitro;
        const medidaQuilograma = this.$refs.medidaQuilograma;
        const medidaUnidade = this.$refs.medidaUnidade;

        let unidadeSelecionada = null;
        // verifica qual checkbox de unidade está selecionado
        if (medidaLitro && medidaLitro.checked) {
          unidadeSelecionada = medidaLitro;
        } else if (medidaQuilograma && medidaQuilograma.checked) {
          unidadeSelecionada = medidaQuilograma;
        } else if (medidaUnidade && medidaUnidade.checked) {
          unidadeSelecionada = medidaUnidade;
        }
        // retorna apenas o checkbox selecionado
        return unidadeSelecionada;
      },

      validarQuantidade(){

        const quantidadeInput = this.$refs.quantidadeInput;
        // Verifica se o campo quantidade possui valor 
        if(quantidadeInput.value){
          const unidadeInput = this.verificaRadios();

          // atualiza o texto do input de quantidade com o addon necessário
          if(unidadeInput.value == "1"){
            quantidadeInput.value = quantidadeInput.value + " lt";
          }else if (unidadeInput.value == "2"){
            quantidadeInput.value = quantidadeInput.value + " kg";
          }else if (unidadeInput.value == "3"){
            quantidadeInput.value = quantidadeInput.value + " un";
          }
        }
      },

      atualizaCampoQuantidade(){
        // apaga o conteúdo do campo de quantidade e verifica
        // qual checkbox está selecionado
        const quantidadeInput = this.$refs.quantidadeInput;
        quantidadeInput.value = "";
        const unidadeInput = this.verificaRadios();

        // caso nenhum tipo de unidade estiver selecionado, campo é desabilitado.
        if (unidadeInput == null){
          quantidadeInput.disabled = true;
        }else{
          quantidadeInput.disabled = false;
        }

        // altera a mascara do campo de unidade com base no checkbox preenchido
        if (unidadeInput.value == "1"){
          this.maskQuantidade = "0.999";
          this.tokensQuantidade = "0:\\d:multiple|9:\\d:optional";
        } else if (unidadeInput.value == "2"){
          this.maskQuantidade = "0.999";
          this.tokensQuantidade = "0:\\d:multiple|9:\\d:optional";
        } else if (unidadeInput.value == "3"){
          this.maskQuantidade = "0";
          this.tokensQuantidade = "0:\\d:multiple";
        }
      }
    }
  };
</script>

<template>
  <main>
    <div class="container d-flex flex-column">
      <div class="row">
        <div class="col-12">
          <h1>Formulário</h1>
        </div>
      </div>
      <div class="row justify-content-center align-items-center">

        <form class="col-md-6 col-12 d-flex flex-column align-items-center">
          <div class="mb-3">
            <label for="nomeInput" class="form-label">Nome do item</label>
            <input vMaska="*" ref="nomeInput" type="text" class="form-control" id="nomeInput">
          </div>

          <label for="unidadeMedidaRadio" class="form-label"> Unidade de medida</label>
          <div class="mb-3" id="unidadeMedidaRadio">
            <div class="form-check form-check-inline">
              <input @change="atualizaCampoQuantidade" ref="medidaLitro" class="form-check-input" type="radio" name="inlineRadioOptions" id="medidaLitro" value="1">
              <label class="form-check-label" for="medidaLitro">Litro</label>
            </div>
            <div class="form-check form-check-inline">
              <input @change="atualizaCampoQuantidade" ref="medidaQuilograma" class="form-check-input" type="radio" name="inlineRadioOptions" id="medidaQuilograma" value="2">
              <label class="form-check-label" for="medidaQuilograma">Quilograma</label>
            </div>
            <div class="form-check form-check-inline">
              <input @change="atualizaCampoQuantidade" ref="medidaUnidade" class="form-check-input" type="radio" name="inlineRadioOptions" id="medidaUnidade" value="3">
              <label class="form-check-label" for="medidaUnidade">Unidade</label>
            </div>
          </div>

          <div class="mb-3">
            <label for="quantidadeInput" class="form-label">Quantidade</label>
            <input disabled v-maska 
                  v-bind:data-maska="maskQuantidade"
                  v-bind:data-maska-tokens="tokensQuantidade"
                  @focusout="validarQuantidade" @focusin="atualizaCampoQuantidade"
                  ref="quantidadeInput" type="text" class="form-control" id="quantidadeInput">
          </div>

          <div class="mb-3">
            <label for="precoInput" class="form-label">Preço</label>
            <input v-maska data-maska="R$ 0.99" data-maska-tokens="0:\d:multiple|9:\d:optional" 
                    ref="precoInput" type="text" class="form-control" id="precoInput">
          </div>
        </form>
        <form class="col-md-6 col-12 d-flex flex-column align-items-center">
          <div class="mb-3">
            <label class="form-label" for="fabricacaoDataInput">Data de fabricação</label>
            <input ref="fabricacaoDataInput" class="form-control" type="date" name="" id="fabricacaoDataInput">
          </div>

          <div class="mb-3 form-check form-switch">
            <input ref="perecivelInput" class="form-check-input" type="checkbox" role="switch" id="perecivelInput">
            <label class="form-check-label" for="perecivelInput">Produto perecível</label>
          </div>

          <div class="mb-3">
            <label class="form-label" for="vencimentoDataInput">Data de vencimento</label>
            <input ref="vencimentoDataInput" class="form-control" type="date" name="" id="vencimentoDataInput">
          </div>

          <button ref="btnSalvar" @click="salvarItem" class="m-2 btn btn-primary">Salvar</button>
          <button ref="btnCancelar" @click="cancelar" class="m-2 mb-2  btn btn-danger">Cancelar</button>
        </form>
      </div>
    </div>
  </main>
</template>