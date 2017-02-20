<?php $this->load->view('partials/html_start'); ?>

<div class="home">
    <div class="title-wrapper">
        <div class="container">
            <h1>Noter</h1>
        </div>
    </div>
    <div class="login-wrapper">
        <div class="container">
            <h3>Login</h3>
            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="email-field form-control" placeholder="Email address" required="" autofocus="">
            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="password-field form-control" placeholder="Password" required="">
            <button class="btn btn-lg btn-primary btn-block btn-login" type="button">Login</button>
            <a href="/register">Register</a>
        </div>
    </div>
</div>

<script>
    noter.home.initialize();
</script>

<?php $this->load->view('partials/html_end'); ?>