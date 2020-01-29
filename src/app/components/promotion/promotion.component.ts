import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {


  constructor(private todoServcie:TodoService) { }
  public todoPromotionText:PromotionText[];
  elements: any = [
    { first: '3', last: '90', handle: '120'},
    { first: '7', last: '189', handle: '490'},
    { first: '30', last: '690', handle: '900'},
  ];

  elements2: any = [
    { title: 'นับไลค์ (LIKE)', free: 'ไม่เกิน 1,000 ชื่อ', pro: 'ไม่เกิน 10,000 ชื่อ', vip:'ไม่เกิน 20,000 ชื่อ'},
    { title: 'นับแชร์ (SHARE)', free: 'ไม่เกิน 300 ชื่อ', pro: 'ไม่เกิน 10,000 ชื่อ', vip:'ไม่เกิน 20,000 ชื่อ'},
    { title: 'นับคอมเม้น (COMMENT)', free: 'ไม่เกิน 300 ชื่อ', pro: 'ไม่เกิน 10,000 ชื่อ', vip:'ไม่เกิน 20,000 ชื่อ'},
    { title: 'จัดการกิจกรรมหลากหลาย', free: 'X', pro: 'X', vip:'V'},
    { title: 'นับคอมเม้น (COMMENT)', free: 'X', pro: 'X', vip:'V'},
  ];
  headElements = ['วัน/ราคา', 'pro', 'vip', ];
  headElements2 = ['', 'free', 'pro','vip' ];
  ngOnInit() {
    
   
  }

}

interface PromotionText {
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