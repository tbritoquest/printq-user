<template>
  <div class="homepage grid">
    <div class="pic center">
      <img src="@/assets/homepage-pic.jpg" alt=""> 
    </div>
    <div>
      <div class="form">
        <h3 class="title is-3">Sign in to PrintQ</h3>

        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" value="John Doe">
          
          </div>
          <!-- <p class="help is-danger">This email is invalid</p> -->
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password" value="1234567890">
          </div>
          <p class="help">Must be 8 characters at least</p>
        </div>

          <div class="other">
            <label class="checkbox">
              <input type="checkbox" checked>
              Remember me
            </label>
            <a href="">Forgot password?</a>
          </div><br>
        <!-- <button class="button  is-fullwidth" > -->
          <router-link :to="{name: 'Customers'}" class="navbar-item button is-fullwidth is-medium">Sign in</router-link>
        <!-- </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .homepage.grid{
    display:grid;
    grid-template-columns: 1.5fr 1fr;
    height:100%;
  }
  .homepage .pic{
    background: #FAE3DB;
  }
  .homepage .pic img{
    height:530px;
  }
  .homepage .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .homepage .form{
    max-width:500px;
    margin: 0 auto;
    margin-top: 11em;
  }
  .homepage .form .title{
    text-align: center;
    color: #2D2D48;
    font-weight: bold !important;
  }
  .homepage .form input{
    background: #ECF2F7;
    border-radius: 8px;
  }
   .homepage .form input:focus{
    border: none;
  }
  .homepage .form .button{
      color:#fff;
      background: #4C6FFF;
      border-radius:8px;
  }
  .homepage .other{
    display: flex;
    justify-content: space-between;
  }
</style>