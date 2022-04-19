import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild('gridcanvas', { static: false })
  private gridcanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  @Input()
  squareSize: number;
  private squarePerRow: number;
  private squarePerColumn: number;
  private dataMatrix: Array<Array<number>>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    var height = window.innerHeight;
    var width = window.innerWidth;

    // this.gridcanvas.nativeElement.setAttribute('width', String(width));
    // this.gridcanvas.nativeElement.setAttribute('height', String(height));

    this.squarePerRow = Math.floor(width / this.squareSize);
    this.squarePerColumn = Math.floor(height / this.squareSize);

    this.gridcanvas.nativeElement.setAttribute(
      'width',
      String(this.squarePerRow * this.squareSize)
    );
    this.gridcanvas.nativeElement.setAttribute(
      'height',
      String(this.squarePerColumn * this.squareSize)
    );

    console.log(this.squarePerRow, this.squarePerColumn);
    this.gridcanvas.nativeElement.addEventListener('click', (e) => {
      this.onClick(e, this.squareSize);
    });
    this.ctx = this.gridcanvas.nativeElement.getContext('2d');
    this.dataMatrix = Array.from(new Array(this.squarePerRow), () =>
      new Array(this.squarePerColumn).fill(0)
    );

    this.drawGrid();
  }

  drawGrid(): void {
    for (var i = 0; i < this.squarePerRow + 1; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.squareSize, 0);
      this.ctx.lineTo(
        i * this.squareSize,
        this.gridcanvas.nativeElement.height
      );
      this.ctx.stroke();
      this.ctx.closePath();
    }

    for (var i = 0; i < this.squarePerColumn + 1; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.squareSize);
      this.ctx.lineTo(this.gridcanvas.nativeElement.width, i * this.squareSize);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  onClick(e, squareSize): void {
    console.log(e.offsetX, e.offsetY);
    var squareRow = Math.floor(e.offsetX / squareSize);
    var squareColumn = Math.floor(e.offsetY / squareSize);
    console.log(squareRow, squareColumn);
    this.changeSquareState(squareRow, squareColumn);
  }

  changeSquareState(squareRow, squareColumn): void {
    this.dataMatrix[squareRow][squareColumn] =
      this.dataMatrix[squareRow][squareColumn] == 0 ? 1 : 0;
    console.log(this.dataMatrix);
    if (this.dataMatrix[squareRow][squareColumn] == 1) {
      this.fillSquare(squareRow, squareColumn);
    } else {
      this.clearSquare(squareRow, squareColumn);
    }
  }

  fillSquare(squareRow, squareColumn): void {
    console.log(this.squareSize);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      squareRow * this.squareSize,
      squareColumn * this.squareSize,
      this.squareSize,
      this.squareSize
    );
  }

  clearSquare(squareRow, squareColumn): void {
    console.log(this.squareSize);

    this.ctx.clearRect(
      squareRow * this.squareSize,
      squareColumn * this.squareSize,
      this.squareSize,
      this.squareSize
    );
    this.ctx.strokeRect(
      squareRow * this.squareSize,
      squareColumn * this.squareSize,
      this.squareSize,
      this.squareSize
    );
  }
}
