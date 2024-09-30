import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private http:HttpClient) {}
  personajes:any[] = [];
  comics:any[] = [];
  offset = 0;

  ngOnInit() {
    this.cargarPersonajes(this.offset);
  }

  onIonInfinite(ev:any) {
    this.offset = this.offset + 20;
    console.log("Cargar más personajes")
    this.cargarPersonajes(this.offset);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  cargarPersonajes(num:number){
    console.log(num);
    this.http.get("https://gateway.marvel.com:443/v1/public/characters?offset=" + this.offset + "&apikey=56766a2aafa273967484303fddc57afc&ts=1&hash=51f5847b159423a2b8df259107008d59").subscribe({
      next:(res:any) => {
        this.personajes.push(...res.data.results);
      }, 
      error:(error:any) => {
        console.log(error);
      }
    });
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.offset = 0;
      this.personajes = [];
      this.cargarPersonajes(this.offset);
      event.target.complete();
    }, 2000);
  }

}
