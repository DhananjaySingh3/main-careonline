import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-to-pdf',
  templateUrl: './to-pdf.component.html',
  styleUrls: ['./to-pdf.component.css']
})
export class ToPdfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  convertPDFWholePage() {
    html2canvas(document.body).then(canvas => {
      // necessary setting
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('File.pdf');
    });
  }

  convertPDFWithDataOnly() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // necessary setting
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('File.pdf');
    });
  }

}
