import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('before...', context);
        

        return next.handle()
        .pipe(
            tap(() => {
                console.log('test'); 
                
            }, err => {
                console.log('err', err);
                
            } ),
            
        )
    }

}