<?php $this->load->view('partials/html_start'); ?>

<div class="register">
    <div class="title-wrapper">
        <div class="container">
            <h1>Noter</h1>
        </div>
    </div>
    <div class="register-wrapper">
        <div class="container">
            <h3>Register</h3>
            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="email-field form-control" placeholder="Email address" required="" autofocus="">
            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="password-field form-control" placeholder="Password" required="">
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input type="password" id="confirm-password" class="confirm-password-field form-control" placeholder="Confirm Password" required="">
            <button class="btn btn-lg btn-primary btn-block btn-register" type="button">Register</button>
            <a href="/">Login</a>
        </div>
    </div>
</div>

<script>
    noter.register.initialize();
</script>

<?php $this->load->view('partials/html_end'); ?>