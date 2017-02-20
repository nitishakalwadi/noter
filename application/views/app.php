<?php $this->load->view('partials/html_start'); ?>

<?php $this->load->view('partials/navbar'); ?>

<div class="app">
    <div class="title-wrapper">
        <div class="container">
            <!--<h1>Noter</h1>-->
        </div>
    </div>
    
    <div class="new-note container">
        <h3>New Note</h3>
        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon" id="title">Title</span>
                <input type="text" class="form-control title-field" name="title-field" aria-describedby="title">
            </div>
        </div>
        <div class="form-group">
            <textarea class="form-control note-field" name="note-field" rows="5" placeholder="Note"></textarea>
        </div>
        <div class="form-group">
            <button class="btn btn-success btn-block btn-save-note" type="button">Save</button>
        </div>
    </div>
    <div class="notes container">
        
    </div>
</div>

<?php $this->load->view('partials/view_note_modal'); ?>
<?php $this->load->view('partials/edit_note_modal'); ?>

<script>
    noter.app.initialize();
</script>

<?php $this->load->view('partials/html_end'); ?>