import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-template-outlet',
  templateUrl: './ng-template-outlet.component.html',
  styleUrls: ['./ng-template-outlet.component.css']
})
export class NgTemplateOutletComponent {

  public keyValueRecord: Record<string, string> = {foo: 'bar', biz: 'baz', boo: 'bear'}

}
