// // linkedin.controller.ts

// import { Controller, Post, Body } from '@nestjs/common';
// import { LinkedinService } from './linkedin.service';

// @Controller('linkedin')
// export class LinkedinController {
//   constructor(private readonly linkedinService: LinkedinService) {}

//   @Post()
//   async scrapeProfile(@Body('linkedinUrl') linkedinUrl: string) {
//     return this.linkedinService.scrapeProfileData(linkedinUrl);
//   }
// }
