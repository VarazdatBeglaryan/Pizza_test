import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppearanceAnimation, DialogInitializer, DialogLayoutDisplay, DisappearanceAnimation, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  title: string = 'test_project';
  pizzasList = [
    {
      src: '../assets/pizza0.png',
      title: 'Мясная Делюкс',
      desc: 'Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы, соус чили'
    },
    {
      src: '../assets/pizza1.png',
      title: 'Морская Премиум',
      desc: 'Перец, сыр, креветки, кальмары, мидии, лосось'
    },
    {
      src: '../assets/pizza2.png',
      title: 'Бекон и Сосиски',
      desc: 'Бекон, сыр, сосиски, ананас, томатная паста'
    },
    {
      src: '../assets/pizza3.png',
      title: 'Куриная Делюкс',
      desc: 'Курица, ананас, сыр Пепперони, соус для пиццы, томатная паста'
    },
    {
      src: '../assets/pizza4.png',
      title: 'Барбекю Премиум',
      desc: 'Свинина BBQ, соус Барбкею, сыр, курица, соус для пиццы, соус чили'
    },
    {
      src: '../assets/pizza5.png',
      title: 'Пепперони Дабл',
      desc: 'Пепперони, сыр, колбаса 2 видов: обжаренная и вареная'
    },
    {
      src: '../assets/pizza6.png',
      title: 'Куриное трио',
      desc: 'Жареная курица, Тушеная курица, Куриные наггетсы, перец, сыр, грибы, соус для пиццы'
    },
    {
      src: '../assets/pizza7.png',
      title: 'Сырная',
      desc: 'Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный'
    },
  ];
  deliveryForm: FormGroup;
  buttonDisabled = false;

  constructor(private fb: FormBuilder, private toastEvokeService: ToastEvokeService) {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.deliveryForm.controls['name'].valueChanges.subscribe(value => {
      if (value.includes('.')) {
        this.deliveryForm.controls['name'].setValue(value.replace(/\./g, ''), { emitEvent: false });
      }
    });
  }

  submitForm() {
    this.buttonDisabled = true;
    if (this.deliveryForm.valid) {
      setTimeout(() => {
        this.toastEvokeService.success('Спасибо за заказ', '').subscribe();
        this.buttonDisabled = false;
      }, 500);
    } else {
      setTimeout(() => {
        this.toastEvokeService.warning('Form is invalid', '').subscribe();
        this.buttonDisabled = false;
      }, 1000);
    }
  }

  openDialog(pizza: any) {
    const dialogPopup = new DialogInitializer(PopupComponent);
    dialogPopup.setCustomData({ src: pizza.src }); 

    dialogPopup.setConfig({
      width: '80vw', 
      height: 'auto',
      layoutType: DialogLayoutDisplay.NONE,
      animationIn: AppearanceAnimation.NONE,
      animationOut: DisappearanceAnimation.NONE
    });
    

    dialogPopup.openDialog$().subscribe(resp => {
      console.log('dialog response: ', resp);
    });
  }
}
