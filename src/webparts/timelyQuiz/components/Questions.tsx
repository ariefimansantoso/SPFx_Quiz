import * as React from "react";
import styles from './Questions.module.scss';

export interface IQuestionsDetail {
    TotalScore: number,
    CurrentQuestion: number
  }

export default class Questions extends React.Component<{}, IQuestionsDetail> {

    constructor(props: any, state: IQuestionsDetail) {
        super(props);

        this.state = {
            TotalScore: 0,
            CurrentQuestion: 1
        }    
    }

    public render(): React.ReactElement {

        let theQuestion = this.getQuestion(this.state.CurrentQuestion - 1);

        return (

         <div className={`${styles.gameQuizContainer}`}>

            <div className={`${styles.gameDetailsContainer}`}>
                <h1>Score : <span id="player-score">{this.state.TotalScore}</span> / 5</h1>
                <h1>Question : <span id="question-number">{this.state.CurrentQuestion}</span> / 5</h1>
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
                <button>Next Question</button>
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
                        <input type={optionType} id={inputId} name={inputId} value={o} />
                        <label htmlFor={inputId} className={`${styles.option}`} id={labelId}>{o}</label>
                    </span>
                );
            });

            return questionOptionElements;
        }
        else {
            return <input type="text" placeholder="Type your answer here" />
        }
    }

    private getQuestion(index: number) {
        return this.questions[index];
    }

    private questions: any[] = [
        {
            question: "Which of these values are valid IANA Time Zones (select all that applies)",
            hasOptions: true,
            multipleChoices: true,
            options: ["Europe/Amsterdam", "Asia/Kyoto", "Asia/Jayapura", "Australia/North"],
            userAnswer: []
        },
        {
            question: "Which one of the following IANA Time Zones has Day Light Saving",
            hasOptions: true,
            multipleChoices: false,
            options: ["Europe/Moscow", "Australia/Melbourne", "Pacific/Fiji", "Canada/Yukon"],
            userAnswer: ""
        },
        {
            question: "If it's 17:45 in Amsterdam now, what time is it now in Los Angeles with Day Light Saving time active?",
            hasOptions: false,
            multipleChoices: false,
            options: [],
            userAnswer: ""
        },
        {
            question: "Can you guess how many time zones are there according to IANA? (it should be no more than 600)",
            hasOptions: false,
            multipleChoices: false,
            options: [],
            userAnswer: ""
        },
        {
            question: "What day of the year it is today?",
            hasOptions: false,
            multipleChoices: false,
            options: [],
            userAnswer: ""
        }
    ];
}   