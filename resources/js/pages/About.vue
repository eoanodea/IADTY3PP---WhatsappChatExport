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

    <div class="bx--col-lg-6 logo-container">
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
      
      <p class="theBoys lineHeight">Eoan O <span class="logoCol">Dea</span></p>
      <br/><br/>
      <p class="introMessage">(Freelance Web. Developer)</p>
    </div>

    <div class="bx--col-lg-6 align">
      <h1 class="introMessage">DESIGNER</h1>
      
      <hr style="border: 1px solid #0bb5ff; width:40%;"/>
      <br/><br/><br/>
      
      <p class="theBoys lineHeight">John Carlo M. <span class="logoCol">Ramos</span></p>
      <br/><br/>
      <p class="introMessage">(Freelance Photographer)</p>
    </div>
  </div>

  <!-- Row 3 -->
  <div class="bx--row">
    <div class="bx--col-lg-12 align">
      <h1 class="introMessage">About <span class="accentCol">Us</span></h1>
      
      <hr style="border: 1px solid #7851a9; width:40%;"/>
      <br/><br/><br/>

      <p class="introMessage introSection">As freelancers ourselves, 
        we understand the issues that other freelancers and clients face. 
        Due to our current profession, developing and designing the 
        Clientel<span class="logoCol">igence</span> application has a personal belonging for us. 
        However, this application is not just developed for our own personal 
        gains, this is also developed for all kinds of 
        freelancers and clients within the creative industry. 
        By designing and developing an application that allows 
        freelancers to manage their clients, services, 
        projects, payment preferences and invoices as well as allowing
        clients to monitor and create a transaction for their projects, 
        we hope to provide the optimum workflow that we all desire.</p>
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
    line-height: 1.1;
  }

  .theBoys {
    font-size: 56px;
    text-align: center;
  }
</style>
