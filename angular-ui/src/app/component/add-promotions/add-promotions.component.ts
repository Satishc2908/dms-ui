import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionService } from 'src/app/services/promotion.service';
import { AddItemsPromotionComponent } from '../promotions/add-items-promotion/add-items-promotion.component';
import { RemovePromotionItemComponent } from './remove-promotion-item/remove-promotion-item.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.css']
})
export class AddPromotionsComponent implements OnInit, AfterViewInit {
  selectedTeam = '';
  selectedDay: string = '';
  showDiv = {
    previous: false,
    current: false,
    next: false
  }
  showdata = false;
  public packingCharges: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  errorMsg: any;
  
  basicInfo:boolean=false;

  buyab: boolean = false;
  volumedc: boolean = false;
  pricedc: boolean = false
  buysets: boolean = false;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  base64textString= "";
  stateName: string[] = ['State 1', 'State 2',];
  fileupload: any;
  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;

  }
  /*-------*/
  countryname: string[] = ['Malaysia (71/126)', 'India (178/178)', 'Philipines (0/135)'];
  statename: string[] = ['Johor(0/42)', 'Kedah(36/36', 'Perak(14/26)', 'Penang(21/22)'];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)', 'West(3/4)'];
  cityname: string[] = ['George town', 'Balik Pulau', 'Batu Refringi', 'Teluk Bahang'];
  selectedItem = null;
  addButton: boolean = false;
  dropdownSettings3: IDropdownSettings = {};
  disabled = false;
  dropdownSettings: IDropdownSettings = {};
  promotionlist: any[] | undefined;
  toppingList3: any = [];
  toppingList: any;
  ShowFilter = false;
  imagepath :any;
  selecetdFile: any;

  imagePreview: any;
  addImage : any;
  totalStepsCount: number | undefined;
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  minDateToFinish = new Subject<string>();
  minDate;

  dateChange(e) {
    this.minDateToFinish.next(e.value.toString());
  }
  @ViewChild('stepper') private myStepper: MatStepper | any;

  // CategoryName:any;
  getgroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"]
  buygroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"];
  CustomerSelect: string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    public promotionTypes: PromotionService) { 
      this.minDateToFinish.subscribe(r => {
        this.minDate = new Date(r);
      })
    }
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });


  /* on Select of Dropdown screen change */

  ngOnInit(): void {
    this.GetPromotionTypes(Event);
    this.addimg();
    // this.toppingList3 = [
    //   { CategoryId: 1, CategoryName: 'Buy(A+B..) get(X+Y..)' },
    //   { CategoryId: 2, CategoryName: 'Buy(A/B..) get(C/D...)' },
    //   { CategoryId: 3, CategoryName: 'Volume Discount' },
    //   { CategoryId: 4, CategoryName: 'Price Discount' },
    // ];

  }

  onTypeSelect(item: any) {
    console.log(item);
  }
  onTypeAll(items: any) {
    console.log('onSelectAll', items);
  }
  onClick(item) {
    this.selectedItem = item;
  }
  displaydata() {
    this.showdata = true;
  }
  hidedata() {
    this.showdata = false;
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  getCategory(event: any) {
    // if (event.CategoryName == 'Buy(A+B..) get(X+Y..)') {
    //   this.goForward(this.myStepper);
    //   this.buyab = true;
    //   this.volumedc = false;
    // }
    // if (event.CategoryName == 'Price Discount') {
    //   this.goForward(this.myStepper);
    //   this.buyab = false;
    //   this.volumedc = true;
    //   this.buysets = false;
    // }
    // if (event.CategoryName == 'Volume Discount') {
    //   this.buyab = false;
    //   this.volumedc = true;
    //   this.buysets = false;
    //   this.goForward(this.myStepper);

    // }
    // if (event.CategoryName == 'Buy(A/B..) get(C/D...)') {
    //   this.buyab = false;
    //   this.volumedc = false;
    //   this.buysets = true;
    //   this.goForward(this.myStepper);

    // }
  }
  GetPromotionTypes(event: any) {
    //  const data = {
    //   promotionTypesId : this.promotionTypesId,
    //   promotionTypesName: this.promotionTypesName
    // }
    this.promotionTypes.GetPromotionTypes().subscribe((res) => {
      // console.log('check promotiontypes', res);
      this.toppingList3 = res.response;
      if (event.promotionTypesName == 'Buy (A+B..) get (X+Y..)') {
        this.goForward(this.myStepper);
        this.buyab = true;
        this.volumedc = false;
        this.buysets = false;
        this.pricedc = false;
      }
      if (event.promotionTypesName == 'Buy (A or B + C or D..) get (X+Y or Y+Z..)') {
        this.buyab = false;
        this.volumedc = false;
        this.buysets = true;
        this.pricedc = false;
        this.goForward(this.myStepper);

      }
      if (event.promotionTypesName == 'Volume Discount') {
        this.buyab = false;
        this.volumedc = true;
        this.buysets = false;
        this.pricedc = false;
        this.goForward(this.myStepper);

      }
      if (event.promotionTypesName == 'Price Discount') {
        this.goForward(this.myStepper);
        this.buyab = false;
        this.volumedc = false;
        this.buysets = false;
        this.pricedc = true;
      }

    })
  }

  disableBackbutton(){
    this.goForward(this.myStepper);
   this.basicInfo=true;
   // alert(this.basicInfo);
 } 

  addCategory() {
    this.addButton = true;
  }
  // toogleShowFilter() {
  //   this.ShowFilter = !this.ShowFilter;
  //   this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { allowSearchFilter: this.ShowFilter });
  // }

  addCountry() {
    this.addCountryButton = true;
  }
  removesub(uId: number) {
    const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(index, 1);
  }
  addFields() {
    this.packingCharges.push({
      sValue: '',
      eValue: '',
      pValue: '',
    });
  }
  addItems() {
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    
    const dialogRef = this.dialog.open(AddItemsPromotionComponent);

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
localStorage.setItem('additem','1')
    })
  }
  addRemoveitem() {

    this.dialog.open(RemovePromotionItemComponent);
  }
  // GetPromotionTypes(){
  // this.promotionTypes.GetPromotionTypes().subscribe ((res)=> {
  //   console.log('check promotiontypes', res);
  // })
  // }
  // addimage(item : any){
  //   console.log(item.target.files[0])
  //   this.fileupload = item.target.files[0]
  // //   const data = {
  // // this.fileupload = item.target.files[0]
  // //   }
  //   this.promotionTypes.Image(this.fileupload).subscribe((res) => {
  // console.log ('image', res)
  
  //   })
  // }
addimg(){
  const data ={
//  const addImage = this.base64textString
  }
  this.promotionTypes.Image(data).subscribe((res) => {
    console.log ('image', res)
      })
     
}
  public onFileChanged(event) {
    this.selecetdFile = event.target.files[0];
    if (this.selecetdFile.size <= 1 * 1024 * 1024) {
    this.handleInputChange(this.selecetdFile); 
    }
    else {
        alert('File size should not be greater than 1MB');
          }
  }
  handleInputChange(files) {
    this.imagePreview = files 
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.imagePreview);
  }
  handleReaderLoaded(e) {
    let reader = e.target;
    this.base64textString = reader.result.substr(reader.result.indexOf(',') + 1);
    console.log(this.base64textString,"base64")
  }
  
}

