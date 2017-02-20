<div class="modal fade edit-note-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                Edit Note
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon" id="edited-title">Title</span>
                        <input type="text" class="form-control edited-title-field" name="edited-title-field" aria-describedby="edited-title">
                    </div>
                </div>
                <div class="form-group">
                    <textarea class="form-control edited-note-field" name="edited-note-field" rows="5" placeholder="Note"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-cancel" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success btn-save-edited-note">Save</button>
            </div>
        </div>
    </div>
</div>