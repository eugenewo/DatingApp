import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(title: string, message: string, okCallback: () => any) 
{
  alertify.confirm(title, message,
    function(e)
    {
        if (e) {
        okCallback(); }

    });
}

success(message: string)
{
  alertify.notify(message, 'success');
}


error(message: string)
{
  alertify.notify(message, 'error');
}


warning(message: string)
{
  alertify.notify(message, 'warning');
}

message(message: string)
{
  alertify.notify(message, 'message');
}




}