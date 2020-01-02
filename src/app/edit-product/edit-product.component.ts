import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private currentProduct: Product;
  private url: string;
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private catService: CatalogueService) { }

  ngOnInit() {
    this.url = atob(this.activatedRoute.snapshot.params.id);
    this.catService.getResource(this.url)
      .subscribe(data => {
        this.currentProduct = data;
      }, err => {
        console.log(err);
      })
    console.log(this.url);
  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url, value)
      .subscribe(data =>{
        alert("Mise à jour effectué avec succès");
        this.router.navigateByUrl("/products");
      }, err => {
        console.log(err);
      })
  }
}
