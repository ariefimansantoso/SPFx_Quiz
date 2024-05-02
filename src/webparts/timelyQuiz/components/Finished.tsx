import * as React from "react";
import styles from './Questions.module.scss';

export default class Finished extends React.Component {

    public render(): React.ReactElement {
        return (

            <div className={`${styles.gameQuizContainer}`}>

            <div className="game-details-container">
                <h1>Score : <span id="player-score"></span> / 5</h1>
                <h1>Question : <span id="question-number"></span> / 5</h1>
            </div>

            <div className="game-question-container">
                <h1 id="display-question">Finished.</h1>
            </div>            

            <div className="next-button-container">
                <button>Next Question</button>
            </div>

        </div>
        );
    }
}   