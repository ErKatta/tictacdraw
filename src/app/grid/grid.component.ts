import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild('gridcanvas', { static: false })
  gridcanvas: ElementRef<HTMLCanvasElement>; 
  public ctx: CanvasRenderingContext2D;

  constructor() { }
ngAfterViewInit(): void {
//throw new Error('Method not implemented.');
var ctx =  this.gridcanvas.nativeElement.getContext('2d');
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();
}

  ngOnInit() {
  }

}