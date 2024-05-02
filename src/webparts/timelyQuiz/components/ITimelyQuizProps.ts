import { SPHttpClient } from '@microsoft/sp-http'; 

export interface ITimelyQuizProps {
  description: string;
  isDarkTheme: boolean;
  listName: string;  
  spHttpClient: SPHttpClient;  
  siteUrl: string;  
}
