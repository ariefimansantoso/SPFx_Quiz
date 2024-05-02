import { SPHttpClient, HttpClient } from '@microsoft/sp-http'; 

export interface ITimelyQuizProps {
  description: string;
  isDarkTheme: boolean;
  listName: string;  
  spHttpClient: SPHttpClient;
  httpClient: HttpClient;
  siteUrl: string;  
}
