import { Component, OnInit,AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-promociones-com',
  templateUrl: './promociones-com.component.html',
  styleUrls: ['./promociones-com.component.scss'],
})
export class PromocionesComComponent implements OnInit {
  @ViewChild("expandWrapper", { static:false}) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "150px";
  constructor(public renderer: Renderer2) { }

  ngOnInit() {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }

}
