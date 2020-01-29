import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ColorEvent } from 'ngx-color';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-manage_data',
  templateUrl: './manage_data.component.html',
  styleUrls: ['./manage_data.component.css']
})


export class Manage_dataComponent implements OnInit {
 

  constructor(private http:HttpClient,private route:ActivatedRoute,private todoServcie:TodoService, ) { 
    
  }
  public todoContactText:ContactgText[];
  id:any;
  sub:any;
  public colorPicker:any;
  ngOnInit() {
    //call service
    
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
    });
  }

  rederContent(){
    alert();
  }

  handleChange($event: ColorEvent) {
    this.colorPicker = $event.color.hex;
    $("[name=color_site]").val(this.colorPicker);
    $('.header_site').css("background",this.colorPicker);
    console.log($event.color);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  }

  // saveSetting(data,data_id) {
  //   var link_like = $(data.currentTarget).attr("id");
  //   this.todoServcie.getDataLike(link_like,data_id).subscribe(data2=>{
  //     var data_id = data2.data_id;
  //     var string_array_user_like = JSON.stringify(data2.data_user_like);
  //     this.todoServcie.saveSetting(data_id,string_array_user_like,'1').subscribe(data3=>{

  //     });
  //   });
  // }

  public type_site:any = '1';
  public NameSite:any;
  public color_site:any;
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  onSubmit(form: NgForm): void {
    form.value.code = JSON.stringify({colorSite:this.colorPicker,nameSite:form.value.NameSite});
    this.onUpload().subscribe(res=>{
      if(res.name!=null&&res.name!=''){
        this.adjust_page_image_name = res.name;
      }
      if(res.type!=null&&res.type!=''){
        this.adjust_page_image_type = res.type;
      }
      
      form.value.code = JSON.stringify({colorSite:this.colorPicker,nameSite:form.value.NameSite,adjust_page_image_name:this.adjust_page_image_name,adjust_page_image_type:this.adjust_page_image_type});
      form.value.adjust_page_image_name = this.adjust_page_image_name;
      form.value.adjust_page_image_type = this.adjust_page_image_type;
      this.todoServcie.saveSetting(form.value,'1').subscribe(data3=>{
        window.location.reload();
      });
    });
    
    
  }

  public text_site:any;
  previewSetting(){
    this.text_site = $("#NameSite").val();
    $('.Text-site').html(this.text_site);
    $(".header-area").css('background',this.colorPicker.hex)
  }


  
  selectedFile:File = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }
  private local__ = "http://localhost:80";
  onUpload(){
    
    const fd = new FormData();
    if(this.selectedFile!=null){
      fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('pathFile', '/upload/files/');
      return this.http.post<imageData>(this.local__+'/api/dataAdjustUpload.php',fd)
    }else{
      return this.http.post<imageData>(this.local__+'/api/dataAdjustUpload.php',fd)
    }
    
  }

}


interface imageData{
  name:string,
  type:string
}

interface ContactgText {
  contact_text_id :string;
  contact_text_title :string;
  contact_text_detail :string;
  contact_text_sort :string;
  contact_text_hide :string;
  contact_text_delete :string;
  contact_text_create_by :string;
  contact_text_update_by :string;
  contact_text_create_date :string;
  contact_text_update_date :string;
}