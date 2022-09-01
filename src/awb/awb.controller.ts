import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

export interface AwbByAwbNumber {
  awbNumber: string;
}
export interface Awb {
  awbId: number;
  awbNumber: string;
  description: string;
}

@Controller('awb')
export class AwbController {
  private readonly awbs = [
    { awbNumber: '1234', awbId: 1, description: 'John' },
    { awbNumber: '6789', awbId: 2, description: 'Doe' },
  ];

  @GrpcMethod('AwbService', 'FindOneByAwbNumber')
  AwbServiceFindOneByAwbNumber(data: any) {
    console.log('AwbServiceFindOneByAwbNumber');
    const ret = this.awbs.find(
      ({ awbNumber }) => awbNumber === data.awbNumber.toString(),
    );

    return ret;
  }
  @GrpcMethod('AwbService', 'FindOneByAwbNumbers')
  AwbServiceFindOneByAwbNumbers(data: any) {
    console.log('AwbServiceFindOneByAwbNumbers');
    // const ret = this.awbs.find(
    //   ({ awbNumber }) => awbNumber === data.awbNumber.toString(),
    // );

    const ret = this.awbs.find(
      (x) => x.awbNumber === data.awbNumber.toString(),
    );

    return ret;
  }

  // @GrpcStreamMethod('HeroService', 'FindMany')
  // findMany(data$: Observable<HeroById>): Observable<Hero> {
  //   console.log('HeroService findMany');

  //   const hero$ = new Subject<Hero>();

  //   const onNext = (heroById: HeroById) => {
  //     const item = this.items.find(({ id }) => id === heroById.id);
  //     hero$.next(item);
  //   };
  //   const onComplete = () => hero$.complete();
  //   data$.subscribe({
  //     next: onNext,
  //     complete: onComplete,
  //   });

  //   return hero$.asObservable();
  // }

  @GrpcStreamMethod('AwbService', 'FindManyByAwbNumber')
  AwbServiceFindMultiByAwbNumber(
    data$: Observable<AwbByAwbNumber>,
  ): Observable<Awb> {
    console.log('AwbServiceFindManyByAwbNumber');

    const awb$ = new Subject<Awb>();

    const onComplete = () => awb$.complete();


    const onNext = (AwbByAwbNumber: AwbByAwbNumber) => {
      const item = this.awbs.find((x) => {
        // console.log(
        //   x.awbNumber.toString(),
        //   AwbByAwbNumber.awbNumber.toString(),
        //   x.awbNumber.toString() === AwbByAwbNumber.awbNumber.toString(),
        // );
        return x.awbNumber.toString() === AwbByAwbNumber.awbNumber.toString();
      });
      awb$.next(item);
    };

    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return awb$.asObservable();
  }
}
