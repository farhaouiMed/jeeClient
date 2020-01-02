import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public produits : any ;
  public  size: number = 5;
  public currentPage: number = 0;
  public totalPages: number;
  public  pages: Array<number>;
  private currentKeyword: string = "";

  constructor(private catService: CatalogueService, private router: Router) { }

  ngOnInit() {
  }
  onGetProducts(){
    this.catService.getProducts(this.currentPage, this.size )
      .subscribe(data =>{
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.produits = data;
      }, err =>{
        console.log(err);
      });
  }
  onPageProduct(i){
    this.currentPage = i;
    this.chercherProduits();
  }
  onChercher(form: any) {
    this.currentPage = 0;
    this.currentPage = form.keyword;
    this.chercherProduits();
  }

  chercherProduits() {
    this.catService.getProductsByKeyword(this.currentKeyword, this.currentPage, this.size )
      .subscribe(data =>{
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.produits = data;
      }, err =>{
        console.log(err);
      });
  }

  onDeleteProduct(p) {
    let conf = confirm("Etes vous sûre ?");
    if (conf) {
      this.catService.deleteResource(p._links.self.href)
        .subscribe(data => {
          this.chercherProduits();
        }, err => {
          console.log(err);
        })
    }
  }

  onEditProduct(p) {
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/" + btoa(url));
  }
}
