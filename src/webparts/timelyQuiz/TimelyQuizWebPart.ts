import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'TimelyQuizWebPartStrings';
import TimelyQuiz from './components/TimelyQuiz';
import { ITimelyQuizProps } from './components/ITimelyQuizProps';

export interface ITimelyQuizWebPartProps {
  description: string;
}

export default class TimelyQuizWebPart extends BaseClientSideWebPart<ITimelyQuizWebPartProps> {

  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ITimelyQuizProps> = React.createElement(
      TimelyQuiz,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        listName: "QuizUser", 
        spHttpClient: this.context.spHttpClient,
        httpClient: this.context.httpClient,
        siteUrl: "https://06ncf.sharepoint.com"  
      }
    );

    ReactDom.render(element, this.domElement);    
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
