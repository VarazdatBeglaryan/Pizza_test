import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class PopupComponent implements OnInit {
  src: string | undefined;

  constructor(@Inject('dialogBelonging') private dialogBelonging: DialogBelonging,
  private elementRef: ElementRef,
  private renderer: Renderer2) {}

  ngOnInit(): void {
    this.src = this.dialogBelonging.customData?.src;
  }

  closeDialog(): void {
    this.dialogBelonging.eventsController.close();
  }

  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (clickedInside) {
      this.closeDialog();
    }
  }
}
