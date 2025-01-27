import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-modal',
  imports: [CommonModule],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent implements OnInit {
  @Input() code: string = '';
  splittedCode: string[] = [];

  constructor(private modalRef: MatDialogRef<RegistrationModalComponent>) { }

  ngOnInit() {
    this.splitCode(this.code);
  }

  closeModal() {
    this.modalRef.close();
  }

  splitCode(code: string) {
    this.splittedCode = code.split('');
  }

  saveAsImage() {
    console.log('save as image');
    const modalContent = document.querySelector('.modal-content') as HTMLElement;
    if (modalContent) {
      import('html-to-image').then((htmlToImage: any) => {
        htmlToImage.toPng(modalContent)
          .then((dataUrl: any) => {
            const link = document.createElement('a');
            link.download = `registration-code-${this.code}.png`;
            link.href = dataUrl;
            link.click();
          })
          .catch((error: any) => {
            console.error('Error generating image:', error);
          });
      });
    }
  }
}
