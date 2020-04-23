import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-to-image',
  templateUrl: './to-image.component.html',
  styleUrls: ['./to-image.component.css']
})
export class ToImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  convertImageWholePage() {
    html2canvas(document.body).then(canvas => {
      // necessary setting
      const generatedImage = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      window.location.href = generatedImage;
    });
  }

  convertImageWithDataOnly() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const generatedImage = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      window.location.href = generatedImage;
    });
  }


}
