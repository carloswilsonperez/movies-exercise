import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Movie, Comment } from "./interfaces";

@Component({
    selector: 'detail-dialog',
    templateUrl: 'detail-dialog.component.html',
    styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialog {
    @ViewChild('comment') commentInput: ElementRef;
    @ViewChild('name') nameInput: ElementRef;

    comments: Comment[] = [];
    formTouched = false;

    constructor(
        private dialogRef: MatDialogRef<DetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data: {movie: Movie}
    ) {
        this.comments = data.movie.comments || [];
    }

    closeDialog(){
        this.dialogRef.close(
            { data: 
                {
                    Film: this.data.movie.Film,
                    comments: this.comments,
                    formTouched: this.formTouched
                }
            }
        );

        this.commentInput.nativeElement.value = '';
        this.nameInput.nativeElement.value = '';
    }

    addComment(comment: string, name: string) {
        this.comments.push( { comment: comment, name: name });
        this.commentInput.nativeElement.value = '';
        this.nameInput.nativeElement.value = '';
        this.formTouched = true;
    }
}