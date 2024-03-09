// import { Injectable } from '@nestjs/common';
// import { Builder, By, WebDriver } from 'selenium-webdriver';

// @Injectable()
// export class LinkedinService {
//   private driver: WebDriver;

//   constructor() {
//     this.driver = new Builder().forBrowser('chrome').build();
//   }

//   async scrapeProfileData(linkedinUrl: string) {
//     try {
//       await this.driver.get(linkedinUrl);

//       // Find the element containing the name
//       const nameElement = await this.driver.findElement(By.css('h1.text-heading-xlarge'));

//       // Extract the name text from the h1 element
//       const name = await nameElement.getText();

//       // Find the element containing the photo
//       const photoElement = await this.driver.findElement(By.css('img.profile-photo-edit__preview'));

//       // Extract the photo URL
//       const photoUrl = await photoElement.getAttribute('src');

//       // You can scrape more data here...

//       return {
//         name,
//         photoUrl,
//         linkedinUrl,
//         // Add more scraped data here...
//       };
//     } catch (error) {
//       console.error('Error scraping LinkedIn profile:', error);
//       return null;
//     } finally {
//       await this.driver.quit();
//     }
//   }
// }
