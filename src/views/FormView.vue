<script >
  export default{
    methods:{
      registrarItem(){
        this.validarCampos();
      },
      cancelar(){
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
      validarCampos(){
        const nomeInput = this.$refs.nomeInput;
        const unidadeInput = this.verificaRadios();
        const quantidadeInput = this.$refs.quantidadeInput;
        const precoInput = this.$refs.precoInput;
        const fabricacaoDataInput = this.$refs.fabricacaoDataInput;
        const vencimentoDataInput = this.$refs.vencimentoDataInput;
        const perecivelInput = this.$refs.perecivelInput;

      },
      verificaRadios(){
        const medidaLitro = this.$refs.medidaLitro;
        const medidaQuilograma = this.$refs.medidaQuilograma;
        const medidaUnidade = this.$refs.medidaUnidade;

        let unidadeSelecionada = null;

        if (medidaLitro.checked) {
          unidadeSelecionada = medidaLitro;
        } else if (medidaQuilograma.checked) {
          unidadeSelecionada = medidaQuilograma;
        } else if (medidaUnidade.checked) {
          unidadeSelecionada = medidaUnidade;
        }
      return unidadeSelecionada;
      },
      validarQuantidade(){
        const quantidadeInput = this.$refs.quantidadeInput;
        
        // Limitar a 3 casas decimais
        if (quantidadeInput.value.indexOf('.') !== -1) {
          const partes = quantidadeInput.value.split('.');
          if (partes[1].length > 3) {
            quantidadeInput.value = partes[0] + '.' + partes[1].substr(0, 3);
          }
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
          <input ref="nomeInput" type="text" class="form-control" id="nomeInput">
        </div>

        <label for="unidadeMedidaRadio" class="form-label"> Unidade de medida</label>
        <div class="mb-3" id="unidadeMedidaRadio">
          <div class="form-check form-check-inline">
            <input ref="medidaLitro" class="form-check-input" type="radio" name="inlineRadioOptions" id="medidaLitro" value="1">
            <label class="form-check-label" for="inlineRadio1">Litro</label>
          </div>
          <div class="form-check form-check-inline">
            <input ref="medidaQuilograma" class="form-check-input" type="radio" name="inlineRadioOptions" id="medidaQuilograma" value="2">
            <label class="form-check-label" for="inlineRadio2">Quilograma</label>
          </div>
          <div class="form-check form-check-inline">
            <input ref="medidaUnidade" class="form-check-input" type="radio" name="inlineRadioOptions" id="medidaUnidade" value="3">
            <label class="form-check-label" for="inlineRadio2">Unidade</label>
          </div>
        </div>

        <div class="mb-3">
          <label for="quantidadeInput" class="form-label">Quantidade</label>
          <input @input="validarQuantidade" ref="quantidadeInput" type="text" class="form-control" id="quantidadeInput">
        </div>

        <div class="mb-3">
          <label for="precoInput" class="form-label">Preço</label>
          <input ref="precoInput" type="text" class="form-control" id="precoInput">
        </div>

        <div class="mb-3">
          <label class="form-label" for="fabricacaoDataInput">Data de fabricação</label>
          <input ref="fabricacaoDataInput" class="form-control" type="date" name="" id="fabricacaoDataInput">
        </div>

        <div class="mb-3">
          <label class="form-label" for="vencimentoDataInput">Data de vencimento</label>
          <input ref="vencimentoDataInput" class="form-control" type="date" name="" id="vencimentoDataInput">
        </div>

        <div class="mb-3 form-check form-switch">
          <input ref="perecivelInput" class="form-check-input" type="checkbox" role="switch" id="perecivelInput">
          <label class="form-check-label" for="perecivelInput">Produto perecível</label>
        </div>

      </form>

      <button @click="registrarItem" class="m-2 btn btn-primary">Salvar</button>
      <button @click="cancelar" class="m-2 btn btn-danger">Cancelar</button>

    </div>
  </main>
</template>


