import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendConstructionsService {
  @Output() disparadorConstructions : EventEmitter<any> = new EventEmitter();
  constructor() { }
}
