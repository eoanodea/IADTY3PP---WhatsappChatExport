<template>
    <!-- <div id="main" style="padding: 50px 0px;">
        Work in Progress {{ msg }}
    </div> -->
<div class="bx--grid" style="margin-left:5%; margin-right:5%;">
  <!-- Row 1 -->
  <div class="bx--row">
    <div class="bx--col-lg-6 align">
      <h1 class="introMessage">CLIENTEL<span class="logoCol">IGENCE</span></h1>
      <br/>
      <p class="introMessage introSection">A cloud-based client management 
        system that allows freelancers to manage their clients, 
        services, projects, payment preferences and invoices as well as 
        permitting Clients to monitor the progress of their 
        projects and make a transaction.
        <br/><br/>
        All in <span class="logoCol">one application</span>.</p>
    </div>

    <div class="bx--col-lg-6">
      <img src="./assets/Logo.png" class="logo">
    </div>
  </div>

  <br/><br/>
  <hr/>

  <!-- Row 2 -->
  <div class="bx--row">
    <div class="bx--col-lg-6 align">
      <h1 class="introMessage">DEVELOPER</h1>
      
      <hr style="border: 1px solid #0bb5ff; width:40%;"/>
      <br/><br/><br/>
      
      <p class="theBoys">Eoan O <span class="logoCol">Dea</span></p>
    </div>

    <div class="bx--col-lg-6 align">
      <h1 class="introMessage">DESIGNER</h1>
      
      <hr style="border: 1px solid #7851a9; width:40%;"/>
      <br/><br/><br/>
      
      <p class="theBoys">John Carlo M. <span class="accentCol">Ramos</span></p>
    </div>
  </div>
  
</div>
</template>
<script>
  
  export default {
    data() {
      return {
        // msg: "🔧🔨"
      }
    },
    components: {
        //
    }
  }
</script>

<style scoped>
  .logo {
    width: 90%;
    padding-top: 3%; 
    padding-bottom: 3%;
  }

  .align {
    padding-top: 8%;
  }

  .introMessage {
    text-align: center;
  }

  .introSection {
    color: #c5c5c5;
    font-size: 24px;
    text-align: 0.7;
  }

  .theBoys {
    font-size: 56px;
    text-align: center;
  }
</style>
