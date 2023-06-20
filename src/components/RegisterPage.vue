<template>
    <div class="d-grid container-fluid bt-3 mt-3">
        <div class="row d-grid align-content-center justify-content-center">
            <div>
                <a href="../main/main.html" class="text text-decoration-none ">
                <h1 class="text-center naslov display-1 fw-bold mb-5">
                    Meally</h1> </a>
            </div>
            <form class="form-floating">
                <div>
                    <input type="text" class="mb-3 form-select-lg " id="username" placeholder="Username">
                </div>
                <div>
                    <input type="text" class="mb-3 form-select-lg " id="e-mail" placeholder="e-mail"> 
                </div>
                <div>
                    <input type="password" class="mb-3 form-select-lg text-bg-" id="password" placeholder="Password">
                </div>
                <div>
                    <input type="text" class="mb-3 form-select-lg " id="Phone" placeholder="Phone number">
                </div>
            </form>
        </div>
        <div class="d-grid row align-content-center justify-content-center mb-3 mt-3">
            <div>
                <form>
                    <button type="submit" class="mb-3 btn fw-bold btn-lg gumb">Register</button>
                </form>
            </div>
        </div>
        <div class="row">
            <div>
                <h3 class="text-center">Alredy have an account ?<a href="../login/login.html" class="text text-decoration-none ">Log in. </a></h3>
            </div>
            <div>
                <h3 class="text-center">Back to <a href="../main/main.html" class="text text-decoration-none ">main page. </a></h3>
            </div>
        </div>
    </div>
</template>


<script>
</script>


<style>
.container-fluid{
    min-height: 600px;
}

body {
    background-image:url(../Slike/1.jpg);
    background-size: cover;
  }

.naslov {
    font-size:100px;
    font-weight:100;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    color: #ff6f00;
    font-family:'Brush Script MT';
}

.text {
    color:#a34700;
}
.text:hover{
    color:#ff7b169e;
    transition: 0.7s;   
}

.gumb {
    border-radius: 40px;
    background-color: #ff6f00;
    border-color: black;
    box-shadow: 0px 0px 2px 2px black;
}
.gumb:hover {
    background-color:#ff7b169e;
    transition: 0.7s;
}
</style>
