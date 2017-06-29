<template>
    <div>
        <div class="row" style="width: 500px; margin: 0 auto;">
            <div v-if="bloquear" class="alert alert-info" role="alert">
                Aguarde, estamos processando sua solicitação.
            </div>

            <h1>Upload</h1>
            <br>
            <form class="form-inline" v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
                <div class="form-group">                      
                    <input v-on:change="onFileChange" type="file" class="form-control-file">                    
                </div>
                
                <div class="form-group">                      
                  &nbsp;&nbsp;
                </div>

                <div class="form-group">                      
                    <button type="submit" class="btn btn-primary" :disabled="bloquear">Enviar</button>                    
                </div>
                
            </form>
        </div>
        
        <div class="row">
          <br><br><br>
        </div>  

        <div class="row" style="padding: 20px;">
          <div class="card" v-for="(foto, index) in fotos">
            <img style="width: 400px; height: 280px;" :src="helperImage(foto.name)" :alt="foto.name">
            <p class="card-text" style="text-align: center;">
                
                <span class="label-detect" v-for="(label, i) in showLabels(foto)">
                    {{label.description}}
                </span>

                <br><br>

                <router-link class="btn btn-success" title="detalhe" :to="querystring(foto)">                
                    mais detalhe
                </router-link>
            </p>
          </div>
        </div>
    </div>
  
</template>

<script>
export default {
  name: 'home',
  
  data () {
    return {
      fileUpload: '',
      fotos: [],
      bloquear: false
    }
  },

  created: function () {
     this.buscarFotos();
  },

  methods: {
    
    onFileChange(event) {        
        this.fileUpload = event.target.files;        
    },
    
    onSubmit: function(event) {
        let form = new FormData();        
        form.append('file', this.fileUpload[0]);
        
        this.bloquear = true;
        this.$http.post(this.helperUrl('/v1/upload'), form).then(response => {
            let fileId = response.bodyText; 
            this.fileUpload = '';
            
            this.$http.post(this.helperUrl('/v1/vision/label'), {"fileId": fileId}).then(() => {
                this.$http.post(this.helperUrl('/v1/vision/text'), {"fileId": fileId}).then(() => {
                    this.$http.post(this.helperUrl('/v1/vision/face'), {"fileId": fileId}).then(() => {
                        this.bloquear = false;
                        this.buscarFotos();
                    });
                });
            });            
            
        }).catch(response => { alert('erro no upload'); this.bloquear = false; });

    },

    showLabels: function(foto) {
      let jsonLabel = foto.jsonLabel;
      if (jsonLabel === '') {
        return [];
      }
      
      return JSON.parse(jsonLabel);
    },

    querystring: function(foto) {
        return 'detalhe?fileId=' + foto.name
    },

    buscarFotos: function() {
      
      this.$http.get(this.helperUrl('/images/list')).then(response => {        
          this.fotos = response.body;
      }, response => {    
          //é feito, mas não deu tempo de fazer melhor
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

</style>