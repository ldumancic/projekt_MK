import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  start = true;
  stopTimer = false;

  projectName: string;
  stopVrijeme: string;
  stopVrijemeMilisekunde: Number;

  razlikaMilisekunde: Number;
  razlikaSekunde: Number
  razlikaMinute: Number;
  razlikaSati: Number;

  duration: String;

  Startaj() {
    this.start = false
  }

  vratiParametarVremena(p) {
    if (Number(p) < 10) {
      return '0' + p
    } else {
      return p
    }
  }

  date = new Date()
  startVrijemeMilisekunde= this.date.getTime()
  dan = this.vratiParametarVremena(this.date.getUTCDate())
  mjesec = this.vratiParametarVremena(this.date.getMonth() + 1)
  godina = this.date.getFullYear()
  sati = this.vratiParametarVremena(this.date.getHours())
  minute = this.vratiParametarVremena(this.date.getUTCMinutes())

  startVrijeme = this.dan + '.' + this.mjesec + '.' + this.godina + '. ' + this.sati + ':' + this.minute

  projekti = [{
    projektIme: "",
    projektStart: this.startVrijeme,
    projektStop: "",
    projektTrajanje: "",
  }]

  constructor(private dialog : MatDialog) {}

  openDialog(){
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(res => {
    this.projectName = res.projectNameData
    this.stopVrijeme = res.vrijemeData
    this.stopVrijemeMilisekunde = res.stopVrijemeMilisekunde
    this.razlikaMilisekunde = Number(this.stopVrijemeMilisekunde) - Number(this.startVrijemeMilisekunde)
    this.razlikaSekunde = Math.floor(Number(this.razlikaMilisekunde) / 1000)
    this.razlikaMinute = Math.floor(Number(this.razlikaSekunde) / 60)
    this.razlikaSati = Math.floor(Number(this.razlikaMinute) / 60)
    this.razlikaSati = Number(this.razlikaSati) % 24
    this.duration = this.vratiParametarVremena(this.razlikaSati.toString()) + ':' + this.vratiParametarVremena(this.razlikaMinute.toString())
    if((this.projekti[this.projekti.length -1].projektStop == "")) {
      this.projekti[0].projektIme = this.projectName;
      this.projekti[0].projektStop = this.stopVrijeme;
      this.projekti[0].projektTrajanje = this.duration.toString()
    } 
    else {
      this.projekti.push({
        projektIme : this.projectName,
        projektStart: this.startVrijeme,
        projektStop: this.stopVrijeme,
        projektTrajanje: this.duration.toString()
      })
    }
    
    this.stopTimer = true
    console.log(this.projekti)
    })
  }
  
}
