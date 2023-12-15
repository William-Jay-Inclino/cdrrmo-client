<template>

    <div ref="myModal" class="modal fade" id="stockInModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title" id="staticBackdropLabel">Stock In</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer justify-content-between">
                    <button ref="cancelButton" class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-success" type="button" data-dismiss="modal">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>