import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-event_record',
  templateUrl: './event_record.component.html',
  styleUrls: ['./event_record.component.css']
})


export class Event_recordComponent implements OnInit {
 

  constructor(private todoServcie:TodoService, ) { 
    
  }
  public listPosts:DataPost[];
  public userWins:user_win[];
  public data_like:any = 0;
  public data_share:any = 0;
  public data_comment:any = 0;
  public post_id_glo:any;
  ngOnInit() {
    //call service
    
    this.todoServcie.getPost('1').subscribe((response)=>{
      this.listPosts = response.data;
    });
  }

  selectPost(post_id){
    this.post_id_glo = post_id;
    this.todoServcie.getAllDataLike_from_mysql(post_id).subscribe((response)=>{
      if(response.data_like.length!=0){
        this.data_like = JSON.parse(response.data_like.dul_data_user).data_user_like.length;
      }else{
        this.data_like = 0;
      }
      if(response.data_share.length!=0){
        this.data_share = JSON.parse(response.data_share.dul_data_user).data_user_like.length;
      }else{
        this.data_share = 0;
      }
      if(response.data_comment.length!=0){
        this.data_comment = JSON.parse(response.data_comment.dul_data_user).data_user_like.length;
      }else{
        this.data_comment = 0;
      }
    });
    this.todoServcie.getUserWin_from_mysql(post_id,'1').subscribe((response)=>{

    });
    
  }

  selectTypeData(type_data){
    if( this.post_id_glo!=null){
      this.todoServcie.getUserWin_from_mysql(this.post_id_glo,type_data).subscribe((response)=>{
        if(response.success==true){
          console.log(response.data);
          this.userWins = response.data;
        }else{
          alert('Error!');
        }
      });
    }else{
      alert('กรุณาเลือกโพสที่ต้องการ');
    }
  }
}



interface DataPost {
  dp_id :any;
  dp_time_stamp :any;
  dp_m :any;
  dp_name_page :any;
  dp_link :any;
  dp_link_like :any;
  all_likes :any;
  all_comments :any;
  image_link :any;
  post_message :any;
  dp_create:any;
  db_update:any;
}

interface user_win {
  dw_id:any;
  dw_m:any;
  dw_type_event:any;
  dw_link_id:any;
  dw_fb_id:any;
  dw_fb_name:any;
  dw_create_date:any;
  dw_update_date:any;
}