import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
})

export class DialogComponent implements OnInit{

    projectName: string;
    date: Date;
    dan: string;
    mjesec: string;
    godina: Number;
    sati: string;
    minute: string;
    vrijeme: string

    podaci: string[]

    vratiParametarVremena(p) {
        if (Number(p) < 10) {
          return '0' + p
        } else {
          return p
        }
    }

    constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
   
    ngOnInit(): void {
        this.dialogRef.updateSize('80%', '55%');
    }

    stopTimer() {
        this.date = new Date()
        this.dan = this.vratiParametarVremena(this.date.getUTCDate())
        this.mjesec = this.vratiParametarVremena(this.date.getMonth() + 1)
        this.godina = this.date.getFullYear()
        this.sati = this.vratiParametarVremena(this.date.getHours())
        this.minute = this.vratiParametarVremena(this.date.getUTCMinutes())

        this.vrijeme = this.dan + '.' + this.mjesec + '.' + this.godina + '. ' + this.sati + ':' + this.minute

        this.dialogRef.close({
            projectNameData: this.projectName, 
            vrijemeData: this.vrijeme,
            stopVrijemeMilisekunde: this.date.getTime()
        })


    }

    closeDialog() {
        this.dialogRef.close()
    }

    

}