import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
// import * as M from '../../../assets/script/materialize/js/materialize.min.js';
import * as $ from 'jquery';
import * as AOS from 'aos';


declare  var testHoldon,HoldOn,validURL:  any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  public list_posts:listpost[];
  public user_name:string;
  public user_tel:string;
  public user_line:string;
  public dp_link:string = 'https://www.facebook.com/ejan2016/posts';
  public text_return:string = ''; 
  public type_event:any;
  public dp_id:string;
  public image_link:string;
  public all_likes:string;
  public all_comments:string;
  public image_post:string;
  public post_message:string;
  public name_page:string;
  public link_like:string;
  public data_user_like:any;
  public user_win:any;
  public user_win_id:any;
  public data_user_win:any;
  
  public wordbox:any;
  images = [  
     //{ img: "/assets/images/bg_slide/Slide2.jpg" },  
     //{ img: "/assets/images/bg_slide/slide1.jpg" },
  ];  
  
  slideConfig = {
    "slidesToShow": 1,  
    "dots": false,  
    "infinite": true ,
    "autoplay":true ,
    "autoplaySpeed":7000,
    mobileFirst: true,
    centerMode: true,
    arrows: false,
    centerPadding: '0.1px',
  };
  height: string = '';
  imageSize:{width:600, height: 300};
  arrowSize: string = '30px';
  showArrows: boolean = false;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 7000;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = '100% 100%';
  backgroundPosition: string = 'top center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = false;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = true;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  imageObject: Array<object> = [{
      // image: '/assets/images/bg_slide/Slide2.jpg',
      // thumbImage: '/assets/images/bg_slide/Slide2.jpg'
  }, 

  
  // {
  //     image: '/assets/images/content/slide2.jpg',
  //     thumbImage: '/assets/images/content/slide2.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // },{
  //     image: '/assets/images/content/slide3.jpg',
  //     thumbImage: '/assets/images/content/slide3.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // }
  ];

  // imageUrls: (string | IImage)[] = [
  //   { url: '/assets/images/bg_slide/Slide2.jpg' },
  //   // { url: '/assets/images/bg_slide/slide3.jpg' },
  //   // { url: '/assets/images/content/slide3.jpg' }
  // ];
  imageUrls = [  
     { img: "/assets/images/bg_slide/slide1.jpg" },  
     { img: "/assets/images/bg_slide/Slide2.jpg" },
  ];
  public slideData:slideData[];
  constructor(private todoServcie:TodoService,private router:Router) { }
  public todoList:Todo[];

  options = {
    fullWidth: true
  };
  
  public login_status_check:any;

 
  ngOnInit() {
    if(localStorage.getItem("login")=="success"){
      this.login_status_check = '1';
    }
    this.login_status_check = '1';
    // var elems = document.querySelectorAll('.carousel');
    // var instances = M.Carousel.init(elems,this.options);
    
    

    
    
    
  }
  inputFilter:any;
  filterComment(){
    var dp_id = $("[name='dp_id']").val();
    var type_event = $("[name='type_event']").val();
    var checkBoxEvent = $("#filterComment_id").prop('checked');
    if(checkBoxEvent){
      this.inputFilter = checkBoxEvent;
    }else{
      this.inputFilter = checkBoxEvent;
    }
  }

  resetSelect(){
    $("#nubshare").css('background','unset');
    $("#nubcomment").css('background','unset');
    $("#nublike").css('background','unset');
    $("[name=user_win_id]").val('');
    $("[name=user_win]").val('');
    this.data_user_win = [];
    localStorage.setItem('user_like',JSON.stringify('[]'));
  }

  selctPost(id_post,link,link_like,page_name,page_post){
    $("#nub_like").val(link_like);
    var link_id = link.split('/')[3].split('?')[0];
    $("#link_id").val(link_id);
    $("#link_post").val(link);
    
    var objPost = $(".timeline-item");
    var arrow_post = $(".timeline-arrow");
    for(var i =0;i<objPost.length;i++){
      $(objPost[i]).removeClass('active_post');
    }
    for(var i =0;i<arrow_post.length;i++){
      $(arrow_post[i]).removeClass('active_post_arrow');
    }
    this.resetSelect();
    
    $("#"+id_post).addClass('active_post');
    $($("#"+id_post).children()[0]).addClass('active_post_arrow');

      var service = this.todoServcie;
      service.saveLink('',link,id_post,page_name,page_post,link_like).subscribe(data2=>{
        this.dp_id = data2.dp_id;
      });
     // service.saveLink(data[0]['data_text_like_and_share'][0],form.value.dp_link).subscribe(data2=>{
          //   debugger;
          //   this.dp_id = data2.dp_id;
          //   this.image_link = data2.image_link;
          //   this.all_likes = data2.all_likes;
          //   this.all_comments =data2.all_comments;
          //   this.image_post =data2.image_link;
          //   this.post_message =data2.post_message;
          //   this.name_page =data2.dp_name_page;
          //   this.link_like =data2.dp_link_like;
          //   service.getDataLike_from_mysql(this.dp_id).subscribe(data3=>{
          //     localStorage.setItem('user_like',JSON.stringify(data3));
          //       this.data_user_like = data3;
          //   });
          //   service.getUserWin(this.dp_id).subscribe(data4=>{
          //       this.data_user_win = data4;
          //   });
          //   HoldOn.close();
          // });
  }

  randomSlot(data){
    var wordlist = data.data_user_like;
    var data_user_name = '';
    var data_user_id = ''; 
    function buildSlotItem (text) {
      data_user_name = text.user_name;
      data_user_id = text.user_data;
        return $('<div>').addClass('slottt-machine-recipe__item')
                        .text(text.user_name).attr('id',text.user_data);
    }

    function buildSlotContents ($container, wordlist) {
      var items = wordlist.map(buildSlotItem);
      $container.append(items);
    }

    function popPushNItems ($container, n) {
        var children = $container.find('.slottt-machine-recipe__item');
        children.slice(0, n).insertAfter(children.last());

        if (n === children.length) {
          popPushNItems($container, 1);
        }
    }

    // After the slide animation is complete, we want to pop some items off
    // the front of the container and push them onto the end. This is
    // so the animation can slide upward infinitely without adding
    // inifinte div elements inside the container.
    function rotateContents ($container, n) {
        setTimeout(function () {
          popPushNItems($container, n);
          $container.css({top: 0});
        }, 300);    
    }

    function randomSlotttIndex(max) {
      var randIndex = (Math.random() * max | 0);
      //return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
      return randIndex;
    }


    $(function () {
      var wordbox = $('#wordbox .slottt-machine-recipe__items_container');
      buildSlotContents(wordbox, wordlist);  
      buildSlotContents(wordbox, wordlist);  
      buildSlotContents(wordbox, wordlist);  
      buildSlotContents(wordbox, wordlist);  
      function animate() {
        var wordIndex = randomSlotttIndex(wordlist.length);
        wordbox.animate({top: -wordIndex*150}, 500, 'swing', function () {
          rotateContents(wordbox, wordIndex);
          
          
          
        });
        $("[name=user_win_id]").val($($("#wordbox").children().children()[0]).attr("id"));
      }
      
      animate();
     // return {user_name:$($("#wordbox").children().children()[0]).html(),user_data:$($("#wordbox").children().children()[0]).attr("id")};
    });
    
  }

  getLike(){
    this.resetSelect();
    this.type_event = '1';
    var url_like = $("#nub_like").val();
    if(url_like!=null&&url_like!=''){
      testHoldon('sk-circle','กำลังดึงข้อมูล');
      var service = this.todoServcie;
      service.getDataLike(url_like,this.dp_id).subscribe(data=>{
        if(data.status_link!=false){
          service.saveDataLike(data.data_id,JSON.stringify(data),'1').subscribe(data=>{

          });
          
          localStorage.setItem('user_like',JSON.stringify(data));
          $("#nubshare").css('background','unset');
          $("#nubcomment").css('background','unset');
          $("#nublike").css('background','rgb(247, 247, 178)');
        }else{
          alert('get data failed.');
        }
        
        HoldOn.close();
      });
      service.getUserWin(this.dp_id,this.type_event).subscribe(data4=>{
        this.data_user_win = data4;
      });
    }else{
      alert('เลือก post ที่ต้องจัดกิจกรรม');
    }
  }

  getShare(){
    this.resetSelect();
    this.type_event = '2';
   // var url_like = $("#nub_like").val();
    var link_id = $("#link_id").val();
    var link_post = $("#link_post").val();
    if(link_id!=null&&link_id!=''){
      testHoldon('sk-circle','กำลังดึงข้อมูล');
      var service = this.todoServcie;
      service.getDataShare(link_post,this.dp_id).subscribe(data=>{
        if(data.status_link!=false){
          service.saveDataLike(data.data_id,JSON.stringify(data),'3').subscribe(data=>{

          });
          localStorage.setItem('user_like',JSON.stringify(data));
          $("#nubshare").css('background','rgb(247, 247, 178)');
          $("#nubcomment").css('background','unset');
          $("#nublike").css('background','unset');
        }else{
          alert('get data failed.');
        }
        
        HoldOn.close();
      });
      service.getUserWin(this.dp_id,this.type_event).subscribe(data4=>{
        this.data_user_win = data4;
      });
    }else{
      alert('เลือก post ที่ต้องจัดกิจกรรม');
    }
    
  }

  getComment(){
    this.resetSelect();
    this.type_event = '3';
    var link_id = $("#link_id").val();
    var link =  $("#link_post").val();
    var checkBoxEvent = $("#filterComment_id").prop('checked');
    var filterText = $("#filterTextComment").val();
    if(link_id!=null&&link_id!=''){
      testHoldon('sk-circle','กำลังดึงข้อมูล');
      var service = this.todoServcie;
      service.getDataComment(link,link_id,this.dp_id,checkBoxEvent,filterText).subscribe(data=>{
        service.saveDataLike(data.data_id,JSON.stringify(data),'2').subscribe(data=>{

        });
        localStorage.setItem('user_like',JSON.stringify(data));
        $("#nubshare").css('background','unset');
        $("#nubcomment").css('background','rgb(247, 247, 178)');
        $("#nublike").css('background','unset');
        HoldOn.close();
        this.closebutton.nativeElement.click();
      });
      service.getUserWin(this.dp_id,this.type_event).subscribe(data4=>{
        
        this.data_user_win = data4;
      });
    }else{
      alert('เลือก post ที่ต้องการจัดกิจกรรม');
    }
    
  }

  onSubmit(form: NgForm): void {
   if(!validURL(form.value.dp_link)){
    alert('url ไม่ถูกต้อง');
   }else{
    testHoldon('sk-circle','กำลังดึงข้อมูล');
     var get_data = "";
      var service = this.todoServcie;
      var image_link = this.image_link;
      var all_likes = this.all_likes;
      var all_comments = this.all_comments;
      var image_post = this.image_post;
      var post_message = this.post_message;
      service.getDataLink(form.value.dp_link).subscribe(data=>{
        if(data.status_link==false){
          alert('ไม่สามารถอ่านข้อมูลโพสที่ต้องการได้ อาจเป็นเพราะโพสที่ระบุไม่ใช่โพสสาธารณะ หรือURLอาจไม่ถูกต้อง');
          HoldOn.close();
        }else{
          this.list_posts = data['list_post'];
          HoldOn.close();
         
        }
      });
   } 
  //  testHoldon('sk-circle','กำลังดึงข้อมูล');

    
  }
  saveLike(data,data_id) {
   testHoldon('sk-circle','กำลังเซฟข้อมูล');
    var link_like = $(data.currentTarget).attr("id");
    this.todoServcie.getDataLike(link_like,data_id).subscribe(data2=>{
      var data_id = data2.data_id;
      var string_array_user_like = JSON.stringify(data2.data_user_like);
      this.todoServcie.saveDataLike(data_id,string_array_user_like,'1').subscribe(data3=>{
        this.todoServcie.getDataLike_from_mysql(this.dp_id).subscribe(data3=>{
          localStorage.setItem('user_like',JSON.stringify(data3));
            this.data_user_like = data3;
        });
       HoldOn.close();
      });
    });
  }

  randomUser(){
    
    
    if($("[name='dp_id']").val()!=null&&$("[name='dp_id']").val()!=''&&$("[name='type_event']").val()!=null&&$("[name='type_event']").val()!=''){
      var objArray = JSON.parse(localStorage.getItem('user_like'));
      this.randomSlot(objArray);
    }else{
      alert('เลือก post ที่ต้องการจัดกิจกรรม และ ประเภทกิจกรรม');
    }
    
    //var user_win = objArray.data_user_like[Math.floor(Math.random()*objArray.data_user_like.length)];
   // debugger;
    
  }

  onSubmitUserWin(form: NgForm): void {
    if($("[name='dp_id']").val()!=null&&$("[name='dp_id']").val()!=''&&$("[name='type_event']").val()!=null&&$("[name='type_event']").val()!=''){
      var user_win_id = $($("#wordbox").children().children()[0]).attr("id");
      var user_win_name = $($("#wordbox").children().children()[0]).html();
      this.todoServcie.saveUserWin(form.value.dp_id,form.value.type_event,user_win_id,user_win_name).subscribe(data=>{
        this.todoServcie.getUserWin(form.value.dp_id,this.type_event).subscribe(data4=>{
          this.data_user_win = data4;
        });
      });
    }else{
      alert('เลือก post ที่ต้องการจัดกิจกรรม และ ประเภทกิจกรรม');
    }
    
  };


  open_popup() {
   // const modalRef = this.modalService.open(NgbdModalContent);
   // modalRef.componentInstance.name = 'World';
  }

}
interface Todo{
  adjust_page_id:number;
  adjust_page_type:string;
  adjust_page_title:string;
  adjust_page_description:string;
  adjust_page_short_description:string;
  adjust_page_image_name:string;
  adjust_page_image_type:string;
}

interface slideData {
  adjust_page_id :string;
  adjust_page_type :string;
  adjust_page_title :string;
  adjust_page_description :string;
  adjust_page_short_description :string;
  adjust_page_image_name :string;
  adjust_page_image_type :string;
  adjust_page_sort :string;
  adjust_page_hide :string;
  adjust_page_delete :string;
  adjust_page_create_by :string;
  adjust_page_create_date :string;
  adjust_page_update_date :string;
}


interface listpost{
  name_page:any;
  post_message:any;
  image_video:any;
  image_post:any;
  title_time:any;
  time_stamp:any;
  link_slect_post:any;
  link_like:any;
}
