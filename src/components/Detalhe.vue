<template>
    <div>

        <div class="center">
            <router-link class="btn btn-success" title="detalhe" to="/">
                listar todas fotos
            </router-link>
        </div>
        <br><br>

        <div v-if="detail.name">
            <div class="center">
                <img style="width: 800px;" :src="helperImage(detail.name)" :alt="detail.name">
            </div>

            <h2 class="center titulo">Label</h2>

            <div class="div-center">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Score</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(label, index) in labels">
                          <td>{{label.description}}</td>
                          <td>{{label.score}}</td>                      
                        </tr>                  
                    </tbody>
                  </table>
            </div>

            <h2 class="center titulo">Face</h2>
            <textarea style="width: 100%; height: 250px;">{{detail.jsonFace}}</textarea>          

            <h2 class="center titulo">Text</h2>
            <textarea style="width: 100%; height: 250px;">{{detail.jsonText}}</textarea>
        </div>

        <div v-else class="center big-text">
            Carregando...
        </div>
    </div>
    
</template>

<script>
export default {
  name: 'home',
  
  data () {
    return {
      detail: {}
    }
  },

  created: function () {     
     this.fetchDetailImage();
  },

  computed: {

      labels: function() {
          if (!this.detail.jsonLabel) {
              this.detail.jsonLabel = '[]';
          }
          return JSON.parse(this.detail.jsonLabel);
      }
  },

  methods: {
    
    fetchDetailImage: function() {
      let file = this.$route.query.fileId;
      this.$http.get(this.helperUrl(`/images/detail?file=${file}`)).then(response => {        
          this.detail = response.body;
          console.log(this.detail);

      }, response => {
          alert('ocorreu um erro ao solicitar o servidor remoto');
      });
    }

  }
}
</script>

<style scoped>

  .label-detect {
    background-color: #eee;
    padding: 4px;
    margin: 4px;
  }

  .big-text {
      font-size: 80px;
  }

  .center {
      text-align: center;
  }

  .div-center {
      margin: 0 auto;
      width: 70%;
  }

  .titulo {
      background-color: #ccc;
      padding: 10px;
      margin-top: 5px;
  }

</style>