import { Injectable,Scope } from '@nestjs/common';
interface technologies {
  name: string;
  type: 'frontend' | 'backend';
}
@Injectable({scope:Scope.DEFAULT})
export class TechnologiesService {
  techData: technologies[] = [];
  constructor() {
    console.log('Tech Service Calling');
  }

  getTechnologies(): technologies[] {
    return this.techData;
  }
}
