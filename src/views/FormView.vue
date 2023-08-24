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

      itens: []
    };
  },
    methods:{

      registrarItem(){
        if(this.validarCampos()){
          const nomeInput = this.$refs.nomeInput;
          const unidadeInput = this.verificaRadios();
          const quantidadeInput = this.$refs.quantidadeInput;
          const precoInput = this.$refs.precoInput;
          const fabricacaoDataInput = this.$refs.fabricacaoDataInput;
          const vencimentoDataInput = this.$refs.vencimentoDataInput;
          const perecivelInput = this.$refs.perecivelInput;

          const novoItem = {
            nome: nomeInput.value,
            unidade: unidadeInput.value,
            quantidade: quantidadeInput.value,
            preco: precoInput.value,
            fabricacao: fabricacaoDataInput.value,
            vencimento: vencimentoDataInput.value,
            perecivel: perecivelInput.checked
          };
          this.itens.push(novoItem);
          const itensExistentes = JSON.parse(localStorage.getItem('itens')) || [];
          itensExistentes.push(novoItem)
          localStorage.setItem('itens',JSON.stringify(itensExistentes));
          this.limparCampos();
        }
        console.log(this.itens);
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
      },

      validarCampos(){
        const nomeInput = this.$refs.nomeInput;
        const unidadeInput = this.verificaRadios();
        const quantidadeInput = this.$refs.quantidadeInput;
        const precoInput = this.$refs.precoInput;
        const fabricacaoDataInput = this.$refs.fabricacaoDataInput;
        const vencimentoDataInput = this.$refs.vencimentoDataInput;
        const perecivelInput = this.$refs.perecivelInput;
    
        if (!nomeInput.value) {
          alert("Campo 'Nome do item' é obrigatório.");
          return;
        }
        if (!unidadeInput) {
          alert("Selecione uma unidade de medida.");
          return;
        }
        if (!quantidadeInput.value) {
          alert("Campo 'Quantidade' é obrigatório.");
          return;
        }
        if (!precoInput.value) {
          alert("Campo 'Preço' é obrigatório.");
          return;
        }
        if (!fabricacaoDataInput.value) {
          alert("Campo 'Data de fabricação' é obrigatório.");
          return;
        }

        if (perecivelInput.checked) {
          if (!vencimentoDataInput.value) {
          alert("Campo 'Data de vencimento' é obrigatório para produtos perecíveis.");
          return;
          }
        }
        return true;
      },

      verificaRadios(){
        const medidaLitro = this.$refs.medidaLitro;
        const medidaQuilograma = this.$refs.medidaQuilograma;
        const medidaUnidade = this.$refs.medidaUnidade;

        let unidadeSelecionada = null;

        if (medidaLitro && medidaLitro.checked) {
          unidadeSelecionada = medidaLitro;
        } else if (medidaQuilograma && medidaQuilograma.checked) {
          unidadeSelecionada = medidaQuilograma;
        } else if (medidaUnidade && medidaUnidade.checked) {
          unidadeSelecionada = medidaUnidade;
        }
      return unidadeSelecionada;
      },

      validarQuantidade(){

        const quantidadeInput = this.$refs.quantidadeInput;
        // Verifica se o campo quantidade possui valor 
        if(quantidadeInput.value){
          const unidadeInput = this.verificaRadios();

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
    <div class="container">
      <form>
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

        

      </form>

      <button @click="registrarItem" class="m-2 btn btn-primary">Salvar</button>
      <button @click="cancelar" class="m-2 btn btn-danger">Cancelar</button>

    </div>
  </main>
</template>


