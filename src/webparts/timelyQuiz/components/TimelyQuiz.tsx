import * as React from 'react';
import styles from './TimelyQuiz.module.scss';
import type { ITimelyQuizProps } from './ITimelyQuizProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, Dropdown, PrimaryButton, Stack, IDropdownOption } from '@fluentui/react/lib';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; 
import Questions from './Questions';
import Finished from './Finished';

export interface IQuizUserDetail {
  Fullname: string,
  Country: string,
  InQuestions: boolean,
  Finished: boolean
}

export default class TimelyQuiz extends React.Component<ITimelyQuizProps, IQuizUserDetail> {

  constructor(props: ITimelyQuizProps, state: IQuizUserDetail)
  {
    //step5 define the super method
    super(props);
    //step6 intialize control state to set the default value on page load
    this.state={
      Fullname:"",
      Country:"",
      InQuestions: true,
      Finished: false
    };
    
    this.FullNameOnChanged = this.FullNameOnChanged.bind(this);
    this.CountryOnChanged = this.CountryOnChanged.bind(this);
  }

  private countries: IDropdownOption[] = [ 
    {text: 'Afghanistan', key: 'AF'}, 
    {text: 'Åland Islands', key: 'AX'}, 
    {text: 'Albania', key: 'AL'}, 
    {text: 'Algeria', key: 'DZ'}, 
    {text: 'American Samoa', key: 'AS'}, 
    {text: 'AndorrA', key: 'AD'}, 
    {text: 'Angola', key: 'AO'}, 
    {text: 'Anguilla', key: 'AI'}, 
    {text: 'Antarctica', key: 'AQ'}, 
    {text: 'Antigua and Barbuda', key: 'AG'}, 
    {text: 'Argentina', key: 'AR'}, 
    {text: 'Armenia', key: 'AM'}, 
    {text: 'Aruba', key: 'AW'}, 
    {text: 'Australia', key: 'AU'}, 
    {text: 'Austria', key: 'AT'}, 
    {text: 'Azerbaijan', key: 'AZ'}, 
    {text: 'Bahamas', key: 'BS'}, 
    {text: 'Bahrain', key: 'BH'}, 
    {text: 'Bangladesh', key: 'BD'}, 
    {text: 'Barbados', key: 'BB'}, 
    {text: 'Belarus', key: 'BY'}, 
    {text: 'Belgium', key: 'BE'}, 
    {text: 'Belize', key: 'BZ'}, 
    {text: 'Benin', key: 'BJ'}, 
    {text: 'Bermuda', key: 'BM'}, 
    {text: 'Bhutan', key: 'BT'}, 
    {text: 'Bolivia', key: 'BO'}, 
    {text: 'Bosnia and Herzegovina', key: 'BA'}, 
    {text: 'Botswana', key: 'BW'}, 
    {text: 'Bouvet Island', key: 'BV'}, 
    {text: 'Brazil', key: 'BR'}, 
    {text: 'British Indian Ocean Territory', key: 'IO'}, 
    {text: 'Brunei Darussalam', key: 'BN'}, 
    {text: 'Bulgaria', key: 'BG'}, 
    {text: 'Burkina Faso', key: 'BF'}, 
    {text: 'Burundi', key: 'BI'}, 
    {text: 'Cambodia', key: 'KH'}, 
    {text: 'Cameroon', key: 'CM'}, 
    {text: 'Canada', key: 'CA'}, 
    {text: 'Cape Verde', key: 'CV'}, 
    {text: 'Cayman Islands', key: 'KY'}, 
    {text: 'Central African Republic', key: 'CF'}, 
    {text: 'Chad', key: 'TD'}, 
    {text: 'Chile', key: 'CL'}, 
    {text: 'China', key: 'CN'}, 
    {text: 'Christmas Island', key: 'CX'}, 
    {text: 'Cocos (Keeling) Islands', key: 'CC'}, 
    {text: 'Colombia', key: 'CO'}, 
    {text: 'Comoros', key: 'KM'}, 
    {text: 'Congo', key: 'CG'}, 
    {text: 'Congo, The Democratic Republic of the', key: 'CD'}, 
    {text: 'Cook Islands', key: 'CK'}, 
    {text: 'Costa Rica', key: 'CR'}, 
    {text: 'Cote D\'Ivoire', key: 'CI'}, 
    {text: 'Croatia', key: 'HR'}, 
    {text: 'Cuba', key: 'CU'}, 
    {text: 'Cyprus', key: 'CY'}, 
    {text: 'Czech Republic', key: 'CZ'}, 
    {text: 'Denmark', key: 'DK'}, 
    {text: 'Djibouti', key: 'DJ'}, 
    {text: 'Dominica', key: 'DM'}, 
    {text: 'Dominican Republic', key: 'DO'}, 
    {text: 'Ecuador', key: 'EC'}, 
    {text: 'Egypt', key: 'EG'}, 
    {text: 'El Salvador', key: 'SV'}, 
    {text: 'Equatorial Guinea', key: 'GQ'}, 
    {text: 'Eritrea', key: 'ER'}, 
    {text: 'Estonia', key: 'EE'}, 
    {text: 'Ethiopia', key: 'ET'}, 
    {text: 'Falkland Islands (Malvinas)', key: 'FK'}, 
    {text: 'Faroe Islands', key: 'FO'}, 
    {text: 'Fiji', key: 'FJ'}, 
    {text: 'Finland', key: 'FI'}, 
    {text: 'France', key: 'FR'}, 
    {text: 'French Guiana', key: 'GF'}, 
    {text: 'French Polynesia', key: 'PF'}, 
    {text: 'French Southern Territories', key: 'TF'}, 
    {text: 'Gabon', key: 'GA'}, 
    {text: 'Gambia', key: 'GM'}, 
    {text: 'Georgia', key: 'GE'}, 
    {text: 'Germany', key: 'DE'}, 
    {text: 'Ghana', key: 'GH'}, 
    {text: 'Gibraltar', key: 'GI'}, 
    {text: 'Greece', key: 'GR'}, 
    {text: 'Greenland', key: 'GL'}, 
    {text: 'Grenada', key: 'GD'}, 
    {text: 'Guadeloupe', key: 'GP'}, 
    {text: 'Guam', key: 'GU'}, 
    {text: 'Guatemala', key: 'GT'}, 
    {text: 'Guernsey', key: 'GG'}, 
    {text: 'Guinea', key: 'GN'}, 
    {text: 'Guinea-Bissau', key: 'GW'}, 
    {text: 'Guyana', key: 'GY'}, 
    {text: 'Haiti', key: 'HT'}, 
    {text: 'Heard Island and Mcdonald Islands', key: 'HM'}, 
    {text: 'Holy See (Vatican City State)', key: 'VA'}, 
    {text: 'Honduras', key: 'HN'}, 
    {text: 'Hong Kong', key: 'HK'}, 
    {text: 'Hungary', key: 'HU'}, 
    {text: 'Iceland', key: 'IS'}, 
    {text: 'India', key: 'IN'}, 
    {text: 'Indonesia', key: 'ID'}, 
    {text: 'Iran, Islamic Republic Of', key: 'IR'}, 
    {text: 'Iraq', key: 'IQ'}, 
    {text: 'Ireland', key: 'IE'}, 
    {text: 'Isle of Man', key: 'IM'}, 
    {text: 'Israel', key: 'IL'}, 
    {text: 'Italy', key: 'IT'}, 
    {text: 'Jamaica', key: 'JM'}, 
    {text: 'Japan', key: 'JP'}, 
    {text: 'Jersey', key: 'JE'}, 
    {text: 'Jordan', key: 'JO'}, 
    {text: 'Kazakhstan', key: 'KZ'}, 
    {text: 'Kenya', key: 'KE'}, 
    {text: 'Kiribati', key: 'KI'}, 
    {text: 'Korea, Democratic People\'S Republic of', key: 'KP'}, 
    {text: 'Korea, Republic of', key: 'KR'}, 
    {text: 'Kuwait', key: 'KW'}, 
    {text: 'Kyrgyzstan', key: 'KG'}, 
    {text: 'Lao People\'S Democratic Republic', key: 'LA'}, 
    {text: 'Latvia', key: 'LV'}, 
    {text: 'Lebanon', key: 'LB'}, 
    {text: 'Lesotho', key: 'LS'}, 
    {text: 'Liberia', key: 'LR'}, 
    {text: 'Libyan Arab Jamahiriya', key: 'LY'}, 
    {text: 'Liechtenstein', key: 'LI'}, 
    {text: 'Lithuania', key: 'LT'}, 
    {text: 'Luxembourg', key: 'LU'}, 
    {text: 'Macao', key: 'MO'}, 
    {text: 'Macedonia, The Former Yugoslav Republic of', key: 'MK'}, 
    {text: 'Madagascar', key: 'MG'}, 
    {text: 'Malawi', key: 'MW'}, 
    {text: 'Malaysia', key: 'MY'}, 
    {text: 'Maldives', key: 'MV'}, 
    {text: 'Mali', key: 'ML'}, 
    {text: 'Malta', key: 'MT'}, 
    {text: 'Marshall Islands', key: 'MH'}, 
    {text: 'Martinique', key: 'MQ'}, 
    {text: 'Mauritania', key: 'MR'}, 
    {text: 'Mauritius', key: 'MU'}, 
    {text: 'Mayotte', key: 'YT'}, 
    {text: 'Mexico', key: 'MX'}, 
    {text: 'Micronesia, Federated States of', key: 'FM'}, 
    {text: 'Moldova, Republic of', key: 'MD'}, 
    {text: 'Monaco', key: 'MC'}, 
    {text: 'Mongolia', key: 'MN'}, 
    {text: 'Montserrat', key: 'MS'}, 
    {text: 'Morocco', key: 'MA'}, 
    {text: 'Mozambique', key: 'MZ'}, 
    {text: 'Myanmar', key: 'MM'}, 
    {text: 'Namibia', key: 'NA'}, 
    {text: 'Nauru', key: 'NR'}, 
    {text: 'Nepal', key: 'NP'}, 
    {text: 'Netherlands', key: 'NL'}, 
    {text: 'Netherlands Antilles', key: 'AN'}, 
    {text: 'New Caledonia', key: 'NC'}, 
    {text: 'New Zealand', key: 'NZ'}, 
    {text: 'Nicaragua', key: 'NI'}, 
    {text: 'Niger', key: 'NE'}, 
    {text: 'Nigeria', key: 'NG'}, 
    {text: 'Niue', key: 'NU'}, 
    {text: 'Norfolk Island', key: 'NF'}, 
    {text: 'Northern Mariana Islands', key: 'MP'}, 
    {text: 'Norway', key: 'NO'}, 
    {text: 'Oman', key: 'OM'}, 
    {text: 'Pakistan', key: 'PK'}, 
    {text: 'Palau', key: 'PW'}, 
    {text: 'Palestinian Territory, Occupied', key: 'PS'}, 
    {text: 'Panama', key: 'PA'}, 
    {text: 'Papua New Guinea', key: 'PG'}, 
    {text: 'Paraguay', key: 'PY'}, 
    {text: 'Peru', key: 'PE'}, 
    {text: 'Philippines', key: 'PH'}, 
    {text: 'Pitcairn', key: 'PN'}, 
    {text: 'Poland', key: 'PL'}, 
    {text: 'Portugal', key: 'PT'}, 
    {text: 'Puerto Rico', key: 'PR'}, 
    {text: 'Qatar', key: 'QA'}, 
    {text: 'Reunion', key: 'RE'}, 
    {text: 'Romania', key: 'RO'}, 
    {text: 'Russian Federation', key: 'RU'}, 
    {text: 'RWANDA', key: 'RW'}, 
    {text: 'Saint Helena', key: 'SH'}, 
    {text: 'Saint Kitts and Nevis', key: 'KN'}, 
    {text: 'Saint Lucia', key: 'LC'}, 
    {text: 'Saint Pierre and Miquelon', key: 'PM'}, 
    {text: 'Saint Vincent and the Grenadines', key: 'VC'}, 
    {text: 'Samoa', key: 'WS'}, 
    {text: 'San Marino', key: 'SM'}, 
    {text: 'Sao Tome and Principe', key: 'ST'}, 
    {text: 'Saudi Arabia', key: 'SA'}, 
    {text: 'Senegal', key: 'SN'}, 
    {text: 'Serbia and Montenegro', key: 'CS'}, 
    {text: 'Seychelles', key: 'SC'}, 
    {text: 'Sierra Leone', key: 'SL'}, 
    {text: 'Singapore', key: 'SG'}, 
    {text: 'Slovakia', key: 'SK'}, 
    {text: 'Slovenia', key: 'SI'}, 
    {text: 'Solomon Islands', key: 'SB'}, 
    {text: 'Somalia', key: 'SO'}, 
    {text: 'South Africa', key: 'ZA'}, 
    {text: 'South Georgia and the South Sandwich Islands', key: 'GS'}, 
    {text: 'Spain', key: 'ES'}, 
    {text: 'Sri Lanka', key: 'LK'}, 
    {text: 'Sudan', key: 'SD'}, 
    {text: 'Suriname', key: 'SR'}, 
    {text: 'Svalbard and Jan Mayen', key: 'SJ'}, 
    {text: 'Swaziland', key: 'SZ'}, 
    {text: 'Sweden', key: 'SE'}, 
    {text: 'Switzerland', key: 'CH'}, 
    {text: 'Syrian Arab Republic', key: 'SY'}, 
    {text: 'Taiwan, Province of China', key: 'TW'}, 
    {text: 'Tajikistan', key: 'TJ'}, 
    {text: 'Tanzania, United Republic of', key: 'TZ'}, 
    {text: 'Thailand', key: 'TH'}, 
    {text: 'Timor-Leste', key: 'TL'}, 
    {text: 'Togo', key: 'TG'}, 
    {text: 'Tokelau', key: 'TK'}, 
    {text: 'Tonga', key: 'TO'}, 
    {text: 'Trinidad and Tobago', key: 'TT'}, 
    {text: 'Tunisia', key: 'TN'}, 
    {text: 'Turkey', key: 'TR'}, 
    {text: 'Turkmenistan', key: 'TM'}, 
    {text: 'Turks and Caicos Islands', key: 'TC'}, 
    {text: 'Tuvalu', key: 'TV'}, 
    {text: 'Uganda', key: 'UG'}, 
    {text: 'Ukraine', key: 'UA'}, 
    {text: 'United Arab Emirates', key: 'AE'}, 
    {text: 'United Kingdom', key: 'GB'}, 
    {text: 'United States', key: 'US'}, 
    {text: 'United States Minor Outlying Islands', key: 'UM'}, 
    {text: 'Uruguay', key: 'UY'}, 
    {text: 'Uzbekistan', key: 'UZ'}, 
    {text: 'Vanuatu', key: 'VU'}, 
    {text: 'Venezuela', key: 'VE'}, 
    {text: 'Viet Nam', key: 'VN'}, 
    {text: 'Virgin Islands, British', key: 'VG'}, 
    {text: 'Virgin Islands, U.S.', key: 'VI'}, 
    {text: 'Wallis and Futuna', key: 'WF'}, 
    {text: 'Western Sahara', key: 'EH'}, 
    {text: 'Yemen', key: 'YE'}, 
    {text: 'Zambia', key: 'ZM'}, 
    {text: 'Zimbabwe', key: 'ZW'} 
  ];

  public render(): React.ReactElement<ITimelyQuizProps> {
    const {
      description,
      isDarkTheme,
      siteUrl,
      spHttpClient,
      httpClient,
      listName
    } = this.props;

    let bodyElement;
    if(this.state.InQuestions === false && this.state.Finished === false) {
      bodyElement = this.WelcomeText(escape(description), siteUrl, listName, spHttpClient);
    }
    else if(this.state.InQuestions === true && this.state.Finished === false) {
      bodyElement = <Questions httpClient={httpClient} />
    }
    else if(this.state.Finished === true) {
      bodyElement = <Finished />
    }
    
    return (

      <section className={`${styles.timelyQuiz}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/logo-dark.png') : require('../assets/logo-light.png')} className={styles.welcomeImage} />              
        </div>
        
        {bodyElement}

      </section>
    );
  }

  private WelcomeText(description: string, siteUrl: string, listName: string, spHttpClient: SPHttpClient) {
    return (
      <div>
      <h3>Welcome to {escape(description)}!</h3>
        <p>
          Test your time and time zones knowledge! But first, let&apos;s get to know each other,<br /> fill in your name and country of origin.
        </p>
        
        <div>
          <Stack enableScopedSelectors>
            <Stack.Item align="auto">
              <TextField 
                label="Full Name:"
                value={this.state.Fullname}
                onChange={this.FullNameOnChanged}
              />
            </Stack.Item>
            <Stack.Item align="auto">
              <Dropdown
                label='Country:'
                placeholder='Select your country'
                options={this.countries}
                onChange={this.CountryOnChanged}
              />
            </Stack.Item>              
            <Stack.Item align="center">
              <br />
              <PrimaryButton onClick={() => this.saveDetail(siteUrl, listName, spHttpClient)}>Start Quiz</PrimaryButton>
            </Stack.Item>              
          </Stack>                                          
          </div>
          </div>
    );
  }

  private FullNameOnChanged(fullname:any): void
  {
    this.setState({Fullname:fullname.currentTarget.value});
    console.log("Fullname state value is : "+this.state.Fullname);
  }

  private CountryOnChanged(country:any): void
  {
    this.setState({Country:country.currentTarget.innerText});
    console.log("Country state value is:" + this.state.Country);
  }
  
  private saveDetail(siteUrl: string, listName: string, spHttpClient: SPHttpClient): void {
    const body: string = JSON.stringify({  
      'Title': `${this.state.Fullname}`,
      'Country': `${this.state.Country}`
    });  
    
    spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`,  
    SPHttpClient.configurations.v1,  
    {  
      headers: {  
        'Accept': 'application/json;odata=nometadata',  
        'Content-type': 'application/json;odata=nometadata',  
        'odata-version': ''  
      },  
      body: body  
    })  
    .then((response: SPHttpClientResponse) => {  
      return response.json().then((responseJSON) => {  
        if (response.status === 404) {
          // expected the possibility of list not found, do something else
        } else if (response.status === 201) {
            // expected the possibility of list found, responseJSON is the list object
            this.setState({InQuestions: true });
        } else {
            // was some other error
            console.log(responseJSON);
            // responseJSON is an object with properties "code" and "message"
            // but
            console.log('error message:', responseJSON.error.message); // undefined
        } 
      });    
    })  
    .catch((error): void => {  
      console.log(error);
    });  
  }
}
