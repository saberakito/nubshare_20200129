import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
interface registerData{
  success:boolean,
  message:string,
  data:string,
  register_text_detail:string,
  type:string
}
interface myData{
  success:boolean,
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  loggedInStatus = true;
  member_id:any;
  
  constructor(private http:Http, private http2: HttpClient) {
    if(JSON.parse(localStorage.getItem('data'))!=null){
      this.member_id = JSON.parse(localStorage.getItem('data')).member_id;
     }
   }

  setLoggedIn(value: boolean){
    localStorage.setItem("login", 'success');
    this.loggedInStatus = value;
  }
  get isLoggedIn(){
    return this.loggedInStatus
  }

private local = window.location.origin;
//private local = "http://localhost:80";
//private local = "http://betufa55.com";

 





  





  saveLink(data,link,id_post,page_name,page_post,link_like){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"save_link",data:data,link:link,time_stamp:id_post,name_page:page_name,post_message:page_post,link_like:link_like,m_id:this.member_id});
  }

  getPost(m_id){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"getPost",m_id:this.member_id});
  }

  getDataLink(link){
    return this.http2.get<contactData>('http://localhost:3000/getContent/'+encodeURIComponent(link),{});
  }

  getDataLike(link,data_id){
    return this.http2.post<contactData>('http://localhost:3000/getLike/'+encodeURIComponent(link),{data_id:data_id});
  }

  getDataShare(id_post,data_id){
    return this.http2.post<contactData>('http://localhost:3000/getShare/'+encodeURIComponent(id_post),{data_id:data_id});
  }

  getDataComment(link,link_id,data_id,filter_status,filter_text){
    return this.http2.post<contactData>('http://localhost:3000/getComment/'+encodeURIComponent(link_id),{link_real:link,data_id:data_id,filter_status:filter_status,filter_text:filter_text});
  }

  getDataLike_from_mysql(data_id){
    return this.http2.post(this.local+'/api_nubshare/dataAdjust.php',{ac:"get_user_like",m_id:this.member_id,data_id:data_id});
  }
  getAllDataLike_from_mysql(data_id){
    return this.http2.post<like>(this.local+'/api_nubshare/dataAdjust.php',{ac:"get_all_user_like",m_id:this.member_id,data_id:data_id});
  }

  getUserWin_from_mysql(data_id,data_type){
    return this.http2.post<like>(this.local+'/api_nubshare/dataAdjust.php',{ac:"get_win_user_like",m_id:this.member_id,data_id:data_id,data_type:data_type});
  }


  saveDataLike(data_id,data_array_user_like,type_data){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"save_like",type_data:type_data,m_id:this.member_id,data_id:data_id,data_array_user_like:data_array_user_like});
  }
  saveUserWin(data_id,type_event,user_id,user_name){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"save_user_win",m_id:this.member_id,data_id:data_id,user_id:user_id,user_name:user_name,type_event:type_event});
  }
  getUserWin(data_id,type_event){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"get_user_win",m_id:this.member_id,data_id:data_id,type_event:type_event});
  }


  saveSetting(data,type){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"saveSetting",data:data,type:type,m_id:this.member_id});
  }
  getSettingSite(type){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"getSettingSite",type,m_id:this.member_id});
  }


  saveMember(data:string){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"saveMember",data:data});
  }
  ValidateUser(username:string,password:string){
    return this.http2.post<myData>(this.local+'/api_nubshare/dataAdjust.php',{ac:'login',username:username,password:password});
     //return {success:true};
   }

}

interface contactData{
  success:boolean,
  post_message:string,
  dp_id:string,
  data_id:string,
  image_link:string,
  all_likes:string,
  image_post:string,
  all_comments:string,
  dp_name_page:string,
  dp_link_like:string,
  data_user_like:string,
  message:string,
  data:[],
  contact_text_detail:string,
  type:string,
  status_link:boolean
}

interface like{
  success:boolean,
  post_message:string,
  data_like:any,
  data:any,
  data_share:any,
  data_comment:any
}


