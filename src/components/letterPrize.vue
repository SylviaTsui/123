<template>
  <div id="wrapper">
  
    <div class="prize">
  
      <img src="../assets/prize/letter.png"  class="letter"/>
  
    </div>
  
  </div>
</template>

<script>

  
  export default {
  
    name: '',
  
    components: {
  
      
  
    },
  
    data() {
  
      return {
        url:""

      }
  
    }
  
  }
</script>

<style scoped>

.prize {
  
    width: 60vw;
  
    height: 70vh;
  
    position: absolute;
  
    left: 50%;
  
    top: 45%;
  
    transform: translate(-50%, -50%);
  
    display: flex;
  
    justify-content: center;
  
    align-items: center;
  
  }
  
  
  
  .prize img {
  
    width: 100%;
  
  }
  
</style>