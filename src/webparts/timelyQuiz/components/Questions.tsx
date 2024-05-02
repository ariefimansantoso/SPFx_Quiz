import * as React from "react";
import styles from './Questions.module.scss';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

export interface IQuestionsDetail {
    TotalScore: number,
    CurrentQuestion: number
  }

const popupStyles = mergeStyleSets({
    root: {
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: '0',
        left: '0',
        position: 'fixed',
        right: '0',
        top: '0',
    },
    content: {
        background: 'white',
        left: '50%',
        maxWidth: '400px',
        padding: '0 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
});

export default class Questions extends React.Component<{}, IQuestionsDetail> {

    private inputName: string = "option-99";
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);

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

    private renderNextQuestion(currentQuestion: any) {
        let answered = false;
        if(currentQuestion.hasOptions === true && currentQuestion.multipleChoices === true) {
            let answersElement = document.getElementsByName(this.inputName);
            for(var x=0; x <= answersElement.length; x++) {
                let userAnswerChecked = (answersElement[x] as HTMLInputElement).checked;
                if(userAnswerChecked === true) {
                    currentQuestion.userAnswer.push((answersElement[x] as HTMLInputElement).value);
                    answered = true;
                }
            }        
        }
        else if(currentQuestion.hasOptions === true && currentQuestion.multipleChoices === false) {
            let answersElement = document.getElementsByName(this.inputName);
            for(var x=0; x <= answersElement.length; x++) {
                let userAnswerChecked = (answersElement[x] as HTMLInputElement).checked;
                if(userAnswerChecked === true) {
                    currentQuestion.userAnswer = (answersElement[x] as HTMLInputElement).value;
                    answered = true;
                }
            }        
        }
        else {
            currentQuestion.userAnswer = (document.getElementById("txtAnswerFreeText") as HTMLInputElement).value;
            answered = true;
        }

        if(answered) {

        }
        else {
            alert("Please answer the question first.")
        }
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