import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.medel";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public productForm! : FormGroup;

  constructor(private fb:FormBuilder, private productService:ProductService) {
  }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      name : this.fb.control('',[Validators.required]),
      price : this.fb.control(0,[Validators.required,Validators.min(10),]),
      checked : this.fb.control(false),
    }) }

  saveProduct() {
    let product : Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({next:data => {
        alert(JSON.stringify(data));
      },error : err => {
      console.log(err);
      }
    });

  }
}
