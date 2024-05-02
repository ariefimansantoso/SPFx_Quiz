import * as React from "react";
import styles from './Questions.module.scss';
import { HttpClient, HttpClientResponse /* SPHttpClientResponse, ISPHttpClientOptions */ } from '@microsoft/sp-http';

export interface IQuestionsDetail {
    TotalScore: number,
    CurrentQuestion: number
}

export interface IQuestionDetailProps {
    httpClient: HttpClient;
}

export default class Questions extends React.Component<IQuestionDetailProps, IQuestionsDetail> {

    private inputName: string = "option-99";
    
    constructor(props: IQuestionDetailProps, state: IQuestionsDetail) {
        super(props);

        this.state = {
            TotalScore: 0,
            CurrentQuestion: 1
        }    
    }

    private IANATimeZones = [
        "Africa/Abidjan",
        "Africa/Accra",
        "Africa/Addis_Ababa",
        "Africa/Algiers",
        "Africa/Asmara",
        "Africa/Asmera",
        "Africa/Bamako",
        "Africa/Bangui",
        "Africa/Banjul",
        "Africa/Bissau",
        "Africa/Blantyre",
        "Africa/Brazzaville",
        "Africa/Bujumbura",
        "Africa/Cairo",
        "Africa/Casablanca",
        "Africa/Ceuta",
        "Africa/Conakry",
        "Africa/Dakar",
        "Africa/Dar_es_Salaam",
        "Africa/Djibouti",
        "Africa/Douala",
        "Africa/El_Aaiun",
        "Africa/Freetown",
        "Africa/Gaborone",
        "Africa/Harare",
        "Africa/Johannesburg",
        "Africa/Juba",
        "Africa/Kampala",
        "Africa/Khartoum",
        "Africa/Kigali",
        "Africa/Kinshasa",
        "Africa/Lagos",
        "Africa/Libreville",
        "Africa/Lome",
        "Africa/Luanda",
        "Africa/Lubumbashi",
        "Africa/Lusaka",
        "Africa/Malabo",
        "Africa/Maputo",
        "Africa/Maseru",
        "Africa/Mbabane",
        "Africa/Mogadishu",
        "Africa/Monrovia",
        "Africa/Nairobi",
        "Africa/Ndjamena",
        "Africa/Niamey",
        "Africa/Nouakchott",
        "Africa/Ouagadougou",
        "Africa/Porto-Novo",
        "Africa/Sao_Tome",
        "Africa/Timbuktu",
        "Africa/Tripoli",
        "Africa/Tunis",
        "Africa/Windhoek",
        "America/Adak",
        "America/Anchorage",
        "America/Anguilla",
        "America/Antigua",
        "America/Araguaina",
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Catamarca",
        "America/Argentina/ComodRivadavia",
        "America/Argentina/Cordoba",
        "America/Argentina/Jujuy",
        "America/Argentina/La_Rioja",
        "America/Argentina/Mendoza",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Salta",
        "America/Argentina/San_Juan",
        "America/Argentina/San_Luis",
        "America/Argentina/Tucuman",
        "America/Argentina/Ushuaia",
        "America/Aruba",
        "America/Asuncion",
        "America/Atikokan",
        "America/Atka",
        "America/Bahia",
        "America/Bahia_Banderas",
        "America/Barbados",
        "America/Belem",
        "America/Belize",
        "America/Blanc-Sablon",
        "America/Boa_Vista",
        "America/Bogota",
        "America/Boise",
        "America/Buenos_Aires",
        "America/Cambridge_Bay",
        "America/Campo_Grande",
        "America/Cancun",
        "America/Caracas",
        "America/Catamarca",
        "America/Cayenne",
        "America/Cayman",
        "America/Chicago",
        "America/Chihuahua",
        "America/Coral_Harbour",
        "America/Cordoba",
        "America/Costa_Rica",
        "America/Creston",
        "America/Cuiaba",
        "America/Curacao",
        "America/Danmarkshavn",
        "America/Dawson",
        "America/Dawson_Creek",
        "America/Denver",
        "America/Detroit",
        "America/Dominica",
        "America/Edmonton",
        "America/Eirunepe",
        "America/El_Salvador",
        "America/Ensenada",
        "America/Fort_Nelson",
        "America/Fort_Wayne",
        "America/Fortaleza",
        "America/Glace_Bay",
        "America/Godthab",
        "America/Goose_Bay",
        "America/Grand_Turk",
        "America/Grenada",
        "America/Guadeloupe",
        "America/Guatemala",
        "America/Guayaquil",
        "America/Guyana",
        "America/Halifax",
        "America/Havana",
        "America/Hermosillo",
        "America/Indiana/Indianapolis",
        "America/Indiana/Knox",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Tell_City",
        "America/Indiana/Vevay",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Indianapolis",
        "America/Inuvik",
        "America/Iqaluit",
        "America/Jamaica",
        "America/Jujuy",
        "America/Juneau",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Knox_IN",
        "America/Kralendijk",
        "America/La_Paz",
        "America/Lima",
        "America/Los_Angeles",
        "America/Louisville",
        "America/Lower_Princes",
        "America/Maceio",
        "America/Managua",
        "America/Manaus",
        "America/Marigot",
        "America/Martinique",
        "America/Matamoros",
        "America/Mazatlan",
        "America/Mendoza",
        "America/Menominee",
        "America/Merida",
        "America/Metlakatla",
        "America/Mexico_City",
        "America/Miquelon",
        "America/Moncton",
        "America/Monterrey",
        "America/Montevideo",
        "America/Montreal",
        "America/Montserrat",
        "America/Nassau",
        "America/New_York",
        "America/Nipigon",
        "America/Nome",
        "America/Noronha",
        "America/North_Dakota/Beulah",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/Nuuk",
        "America/Ojinaga",
        "America/Panama",
        "America/Pangnirtung",
        "America/Paramaribo",
        "America/Phoenix",
        "America/Port_of_Spain",
        "America/Port-au-Prince",
        "America/Porto_Acre",
        "America/Porto_Velho",
        "America/Puerto_Rico",
        "America/Punta_Arenas",
        "America/Rainy_River",
        "America/Rankin_Inlet",
        "America/Recife",
        "America/Regina",
        "America/Resolute",
        "America/Rio_Branco",
        "America/Rosario",
        "America/Santa_Isabel",
        "America/Santarem",
        "America/Santiago",
        "America/Santo_Domingo",
        "America/Sao_Paulo",
        "America/Scoresbysund",
        "America/Shiprock",
        "America/Sitka",
        "America/St_Barthelemy",
        "America/St_Johns",
        "America/St_Kitts",
        "America/St_Lucia",
        "America/St_Thomas",
        "America/St_Vincent",
        "America/Swift_Current",
        "America/Tegucigalpa",
        "America/Thule",
        "America/Thunder_Bay",
        "America/Tijuana",
        "America/Toronto",
        "America/Tortola",
        "America/Vancouver",
        "America/Virgin",
        "America/Whitehorse",
        "America/Winnipeg",
        "America/Yakutat",
        "America/Yellowknife",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville",
        "Antarctica/Macquarie",
        "Antarctica/Mawson",
        "Antarctica/McMurdo",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/South_Pole",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok",
        "Arctic/Longyearbyen",
        "Asia/Aden",
        "Asia/Almaty",
        "Asia/Amman",
        "Asia/Anadyr",
        "Asia/Aqtau",
        "Asia/Aqtobe",
        "Asia/Ashgabat",
        "Asia/Ashkhabad",
        "Asia/Atyrau",
        "Asia/Baghdad",
        "Asia/Bahrain",
        "Asia/Baku",
        "Asia/Bangkok",
        "Asia/Barnaul",
        "Asia/Beirut",
        "Asia/Bishkek",
        "Asia/Brunei",
        "Asia/Calcutta",
        "Asia/Chita",
        "Asia/Choibalsan",
        "Asia/Chongqing",
        "Asia/Chungking",
        "Asia/Colombo",
        "Asia/Dacca",
        "Asia/Damascus",
        "Asia/Dhaka",
        "Asia/Dili",
        "Asia/Dubai",
        "Asia/Dushanbe",
        "Asia/Famagusta",
        "Asia/Gaza",
        "Asia/Harbin",
        "Asia/Hebron",
        "Asia/Ho_Chi_Minh",
        "Asia/Hong_Kong",
        "Asia/Hovd",
        "Asia/Irkutsk",
        "Asia/Istanbul",
        "Asia/Jakarta",
        "Asia/Jayapura",
        "Asia/Jerusalem",
        "Asia/Kabul",
        "Asia/Kamchatka",
        "Asia/Karachi",
        "Asia/Kashgar",
        "Asia/Kathmandu",
        "Asia/Katmandu",
        "Asia/Khandyga",
        "Asia/Kolkata",
        "Asia/Krasnoyarsk",
        "Asia/Kuala_Lumpur",
        "Asia/Kuching",
        "Asia/Kuwait",
        "Asia/Macao",
        "Asia/Macau",
        "Asia/Magadan",
        "Asia/Makassar",
        "Asia/Manila",
        "Asia/Muscat",
        "Asia/Nicosia",
        "Asia/Novokuznetsk",
        "Asia/Novosibirsk",
        "Asia/Omsk",
        "Asia/Oral",
        "Asia/Phnom_Penh",
        "Asia/Pontianak",
        "Asia/Pyongyang",
        "Asia/Qatar",
        "Asia/Qostanay",
        "Asia/Qyzylorda",
        "Asia/Rangoon",
        "Asia/Riyadh",
        "Asia/Saigon",
        "Asia/Sakhalin",
        "Asia/Samarkand",
        "Asia/Seoul",
        "Asia/Shanghai",
        "Asia/Singapore",
        "Asia/Srednekolymsk",
        "Asia/Taipei",
        "Asia/Tashkent",
        "Asia/Tbilisi",
        "Asia/Tehran",
        "Asia/Tel_Aviv",
        "Asia/Thimbu",
        "Asia/Thimphu",
        "Asia/Tokyo",
        "Asia/Tomsk",
        "Asia/Ujung_Pandang",
        "Asia/Ulaanbaatar",
        "Asia/Ulan_Bator",
        "Asia/Urumqi",
        "Asia/Ust-Nera",
        "Asia/Vientiane",
        "Asia/Vladivostok",
        "Asia/Yakutsk",
        "Asia/Yangon",
        "Asia/Yekaterinburg",
        "Asia/Yerevan",
        "Atlantic/Azores",
        "Atlantic/Bermuda",
        "Atlantic/Canary",
        "Atlantic/Cape_Verde",
        "Atlantic/Faeroe",
        "Atlantic/Faroe",
        "Atlantic/Jan_Mayen",
        "Atlantic/Madeira",
        "Atlantic/Reykjavik",
        "Atlantic/South_Georgia",
        "Atlantic/St_Helena",
        "Atlantic/Stanley",
        "Australia/ACT",
        "Australia/Adelaide",
        "Australia/Brisbane",
        "Australia/Broken_Hill",
        "Australia/Canberra",
        "Australia/Currie",
        "Australia/Darwin",
        "Australia/Eucla",
        "Australia/Hobart",
        "Australia/LHI",
        "Australia/Lindeman",
        "Australia/Lord_Howe",
        "Australia/Melbourne",
        "Australia/North",
        "Australia/NSW",
        "Australia/Perth",
        "Australia/Queensland",
        "Australia/South",
        "Australia/Sydney",
        "Australia/Tasmania",
        "Australia/Victoria",
        "Australia/West",
        "Australia/Yancowinna",
        "Brazil/Acre",
        "Brazil/DeNoronha",
        "Brazil/East",
        "Brazil/West",
        "Canada/Atlantic",
        "Canada/Central",
        "Canada/Eastern",
        "Canada/Mountain",
        "Canada/Newfoundland",
        "Canada/Pacific",
        "Canada/Saskatchewan",
        "Canada/Yukon",
        "CET",
        "Chile/Continental",
        "Chile/EasterIsland",
        "CST6CDT",
        "Cuba",
        "EET",
        "Egypt",
        "Eire",
        "EST",
        "EST5EDT",
        "Etc/GMT",
        "Etc/GMT-0",
        "Etc/GMT-1",
        "Etc/GMT-10",
        "Etc/GMT-11",
        "Etc/GMT-12",
        "Etc/GMT-13",
        "Etc/GMT-14",
        "Etc/GMT-2",
        "Etc/GMT-3",
        "Etc/GMT-4",
        "Etc/GMT-5",
        "Etc/GMT-6",
        "Etc/GMT-7",
        "Etc/GMT-8",
        "Etc/GMT-9",
        "Etc/GMT+0",
        "Etc/GMT+1",
        "Etc/GMT+10",
        "Etc/GMT+11",
        "Etc/GMT+12",
        "Etc/GMT+2",
        "Etc/GMT+3",
        "Etc/GMT+4",
        "Etc/GMT+5",
        "Etc/GMT+6",
        "Etc/GMT+7",
        "Etc/GMT+8",
        "Etc/GMT+9",
        "Etc/GMT0",
        "Etc/Greenwich",
        "Etc/UCT",
        "Etc/Universal",
        "Etc/UTC",
        "Etc/Zulu",
        "Europe/Amsterdam",
        "Europe/Andorra",
        "Europe/Astrakhan",
        "Europe/Athens",
        "Europe/Belfast",
        "Europe/Belgrade",
        "Europe/Berlin",
        "Europe/Bratislava",
        "Europe/Brussels",
        "Europe/Bucharest",
        "Europe/Budapest",
        "Europe/Busingen",
        "Europe/Chisinau",
        "Europe/Copenhagen",
        "Europe/Dublin",
        "Europe/Gibraltar",
        "Europe/Guernsey",
        "Europe/Helsinki",
        "Europe/Isle_of_Man",
        "Europe/Istanbul",
        "Europe/Jersey",
        "Europe/Kaliningrad",
        "Europe/Kiev",
        "Europe/Kirov",
        "Europe/Kyiv",
        "Europe/Lisbon",
        "Europe/Ljubljana",
        "Europe/London",
        "Europe/Luxembourg",
        "Europe/Madrid",
        "Europe/Malta",
        "Europe/Mariehamn",
        "Europe/Minsk",
        "Europe/Monaco",
        "Europe/Moscow",
        "Europe/Nicosia",
        "Europe/Oslo",
        "Europe/Paris",
        "Europe/Podgorica",
        "Europe/Prague",
        "Europe/Riga",
        "Europe/Rome",
        "Europe/Samara",
        "Europe/San_Marino",
        "Europe/Sarajevo",
        "Europe/Saratov",
        "Europe/Simferopol",
        "Europe/Skopje",
        "Europe/Sofia",
        "Europe/Stockholm",
        "Europe/Tallinn",
        "Europe/Tirane",
        "Europe/Tiraspol",
        "Europe/Ulyanovsk",
        "Europe/Uzhgorod",
        "Europe/Vaduz",
        "Europe/Vatican",
        "Europe/Vienna",
        "Europe/Vilnius",
        "Europe/Volgograd",
        "Europe/Warsaw",
        "Europe/Zagreb",
        "Europe/Zaporozhye",
        "Europe/Zurich",
        "GB",
        "GB-Eire",
        "GMT",
        "GMT-0",
        "GMT+0",
        "GMT0",
        "Greenwich",
        "Hongkong",
        "HST",
        "Iceland",
        "Indian/Antananarivo",
        "Indian/Chagos",
        "Indian/Christmas",
        "Indian/Cocos",
        "Indian/Comoro",
        "Indian/Kerguelen",
        "Indian/Mahe",
        "Indian/Maldives",
        "Indian/Mauritius",
        "Indian/Mayotte",
        "Indian/Reunion",
        "Iran",
        "Israel",
        "Jamaica",
        "Japan",
        "Kwajalein",
        "Libya",
        "MET",
        "Mexico/BajaNorte",
        "Mexico/BajaSur",
        "Mexico/General",
        "MST",
        "MST7MDT",
        "Navajo",
        "NZ",
        "NZ-CHAT",
        "Pacific/Apia",
        "Pacific/Auckland",
        "Pacific/Bougainville",
        "Pacific/Chatham",
        "Pacific/Chuuk",
        "Pacific/Easter",
        "Pacific/Efate",
        "Pacific/Enderbury",
        "Pacific/Fakaofo",
        "Pacific/Fiji",
        "Pacific/Funafuti",
        "Pacific/Galapagos",
        "Pacific/Gambier",
        "Pacific/Guadalcanal",
        "Pacific/Guam",
        "Pacific/Honolulu",
        "Pacific/Johnston",
        "Pacific/Kanton",
        "Pacific/Kiritimati",
        "Pacific/Kosrae",
        "Pacific/Kwajalein",
        "Pacific/Majuro",
        "Pacific/Marquesas",
        "Pacific/Midway",
        "Pacific/Nauru",
        "Pacific/Niue",
        "Pacific/Norfolk",
        "Pacific/Noumea",
        "Pacific/Pago_Pago",
        "Pacific/Palau",
        "Pacific/Pitcairn",
        "Pacific/Pohnpei",
        "Pacific/Ponape",
        "Pacific/Port_Moresby",
        "Pacific/Rarotonga",
        "Pacific/Saipan",
        "Pacific/Samoa",
        "Pacific/Tahiti",
        "Pacific/Tarawa",
        "Pacific/Tongatapu",
        "Pacific/Truk",
        "Pacific/Wake",
        "Pacific/Wallis",
        "Pacific/Yap",
        "Poland",
        "Portugal",
        "PRC",
        "PST8PDT",
        "ROC",
        "ROK",
        "Singapore",
        "Turkey",
        "UCT",
        "Universal",
        "US/Alaska",
        "US/Aleutian",
        "US/Arizona",
        "US/Central",
        "US/East-Indiana",
        "US/Eastern",
        "US/Hawaii",
        "US/Indiana-Starke",
        "US/Michigan",
        "US/Mountain",
        "US/Pacific",
        "US/Samoa",
        "UTC",
        "W-SU",
        "WET",
        "Zulu"
      ];

    public render(): React.ReactElement<IQuestionDetailProps> {

        let theQuestion = this.getQuestion(this.state.CurrentQuestion - 1);

        return (

         <div className={`${styles.gameQuizContainer}`}>

            <div className={`${styles.gameDetailsContainer}`}>
                <h1>Score : <span id="player-score">{this.state.TotalScore}</span> / {this.questions.length}</h1>
                <h1>Question : <span id="question-number">{this.state.CurrentQuestion}</span> / {this.questions.length}</h1>
            </div>

            <div className={`${styles.gameQuestionContainer}`}>
                <h1 id="display-question">
                    {theQuestion.question}
                </h1>
            </div>

            <div className={`${styles.gameOptionsContainer}`}>                            

                {this.renderAnswerFields(theQuestion)}

            </div>

            <div className={`${styles.nextButtonContainer}`}>
                <button onClick={() => this.renderNextQuestion(theQuestion)}>Next Question</button>
            </div>

        </div>        
        );
    }

    private renderAnswerFields(theQuestion: any) {
        if(theQuestion.hasOptions === true) {        
            let optionType = theQuestion.multipleChoices ? "checkbox" : "radio";
            
            let questionOptionElements = theQuestion.options.map((o: string, key: number) => {
                let labelId = "option-" + key + "-label";
                let inputId = "option-" + key;
                
                return (             
                    <span>
                        <input type={optionType} id={inputId} name={this.inputName} value={o} />
                        <label htmlFor={inputId} className={`${styles.option}`} id={labelId}>{o}</label>
                    </span>
                );
            });

            return questionOptionElements;
        }
        else {
            return <input type="text" id="txtAnswerFreeText" placeholder="Type your answer here" />
        }
    }

    private getQuestion(index: number) {
        return this.questions[index];
    }

    private async renderNextQuestion(currentQuestion: any) {
        let answered = false;
        if(currentQuestion.hasOptions === true && currentQuestion.multipleChoices === true) {
            let answersElement = document.getElementsByName(this.inputName);
            for(var x=0; x < answersElement.length; x++) {
                let theElement: any = document.getElementById(answersElement[x].id);
                let userAnswerChecked = theElement.checked;
                if(userAnswerChecked === true) {
                    currentQuestion.userAnswer.push(theElement.value);
                    answered = true;
                }
            }        
        }
        else if(currentQuestion.hasOptions === true && currentQuestion.multipleChoices === false) {
            let answersElement = document.getElementsByName(this.inputName);
            for(var x=0; x < answersElement.length; x++) {
                let theElement: any = document.getElementById(answersElement[x].id);
                let userAnswerChecked = theElement.checked;
                if(userAnswerChecked === true) {
                    currentQuestion.userAnswer = (theElement).value;
                    answered = true;
                }
            }        
        }
        else {
            currentQuestion.userAnswer = (document.getElementById("txtAnswerFreeText") as HTMLInputElement).value;
            answered = true;
        }

        if(answered) {
            let newScore = 0;
            switch(currentQuestion.ID) {
                case 1:
                    let point1 = currentQuestion.handleAnswer(currentQuestion.userAnswer, this.IANATimeZones);
                    if(point1 === true) {
                        newScore = 1;
                    }
                    break;
                case 2:
                    let point2 = currentQuestion.handleAnswer(currentQuestion.userAnswer, this.props.httpClient);
                    if(point2 === true) {
                        newScore = 1;
                    }
                    break;
                case 3:
                    let point4 = currentQuestion.handleAnswer(currentQuestion.userAnswer, this.IANATimeZones);
                    if(point4 === true) {
                        newScore = 1;
                    }
                    break;
            }
            

            if(newScore > 0) {
                this.setState({
                    TotalScore: this.state.TotalScore + newScore,
                    CurrentQuestion: this.state.CurrentQuestion + 1
                });
            }
        }
        else {
            alert("Please answer the question first.")
        }
    }

    private questions: any[] = [
        {
            ID: 1,
            question: "Which of these values are valid IANA Time Zones (select all that applies)",
            hasOptions: true,
            multipleChoices: true,
            options: ["Europe/Amsterdam", "Asia/Kyoto", "Asia/Jayapura", "Australia/North"],
            userAnswer: [],
            handleAnswer: function(arrAnswer: string[], timeZones: Array<string>) {
                for(var i = 0; i < arrAnswer.length; i++) {
                    if(!timeZones.includes(arrAnswer[i])) {
                        return false;        
                    }
                }

                return true;
            }
        },
        {
            ID: 2,
            question: "If it's 17:45 in Amsterdam now, what time is it now in Los Angeles with Day Light Saving time active?",
            hasOptions: false,
            multipleChoices: false,
            options: [],
            userAnswer: "",
            handleAnswer: function(answer: string, httpClient: HttpClient) {
                const urlValidation: string = "https://timeapi.io/api/Conversion/ConvertTimeZone";  
                const todayDate = new Date(); 
                const currentYear = todayDate.getFullYear();
                const currentMonth = todayDate.getMonth() + 1;
                const strMonth = currentMonth < 10 ? ("0" + currentMonth.toString()) : currentMonth.toString();
                const today = todayDate.getDate();
                const strToday = today < 10 ? ("0" + today.toString()) : today.toString();

                const body: string = JSON.stringify({  
                    "fromTimeZone": "Europe/Amsterdam",
                    "dateTime": currentYear + "-" + strMonth + "-" + strToday + " 17:45:00",
                    "toTimeZone": "America/Los_Angeles",
                    "dstAmbiguity": ""
                  });  
                  
                  httpClient.post(urlValidation,  
                  HttpClient.configurations.v1,  
                  {  
                    headers: {  
                        'Accept': 'application/json;odata=nometadata',
                        'Content-type': 'application/json;odata=verbose',
                        'odata-version': '',
                        "X-HTTP-Method": "POST"
                    },  
                    body: body  
                  })  
                  .then((response: HttpClientResponse) => {  
                    return response.json().then((responseJSON) => {  
                        console.log(responseJSON);
                      if (response.status === 404) {
                        // expected the possibility of list not found, do something else
                      } else if (response.status === 200) {
                          // expected the possibility of list found, responseJSON is the list object
                          console.log("success");
                      } else {
                          // was some other error                          
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
        },
        {
            ID: 3,
            question: "Can you guess how many time zones are there according to IANA? (it should be no more than 600)",
            hasOptions: false,
            multipleChoices: false,
            options: [],
            userAnswer: "",
            handleAnswer: function(strAnswer: string, timeZones: Array<string>) {
                let intAnswer = parseInt(strAnswer);
                if(timeZones.length === intAnswer) {
                    return true;
                }
                return false;
            }
        },
        {
            ID: 4,
            question: "What day of the year it is today?",
            hasOptions: false,
            multipleChoices: false,
            options: [],
            userAnswer: ""
        }
    ];
}   