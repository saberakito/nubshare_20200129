import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input('value_app') value_app: string;
  id:any;
  sub:any;
  constructor(private route:ActivatedRoute,private todoServcie:TodoService) { }
  public data_deatail:string = "<img src='/assets/images/loading/05.gif'>";
  public data_title:string;
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
      if(this.value_app!=null){
        this.id = this.value_app;
      }
      
    });
  }

}
