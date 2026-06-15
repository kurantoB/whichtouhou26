import { defineStore } from 'pinia';

function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}

export const useQuizStore = defineStore('quizStore', {
    state: () => ({
        currentQuestion: 0,
        // store tuples of [questionIndex, chosenOptionIndex]
        answers: [] as [number, number][],
        // a shuffled order of question indices
        questionOrder: [] as number[],
        quizResult: null as null | {
            closestMatchCharacter: number
            runnerUpCharacter: number
            closestMatchBlurb: string
            runnerUpBlurb: string
            leanings: number[]
        }
    }),
    actions: {
        initQuiz(totalQuestions: number) {
            this.questionOrder = Array.from({ length: totalQuestions }, (_, i) => i);
            shuffle(this.questionOrder);
            this.currentQuestion = 0;
            this.answers = [];
        },
        recordAnswer(choice: number) {
            const qIdx = this.questionOrder[this.currentQuestion] ?? this.currentQuestion;
            this.answers.push([qIdx, choice]);
            this.currentQuestion += 1;
        },
        setQuizResult(result: {
            closestMatchCharacter: number
            runnerUpCharacter: number
            closestMatchBlurb: string
            runnerUpBlurb: string
            leanings: number[]
        }) {
            this.quizResult = result;
        },
        clearQuizResult() {
            this.quizResult = null;
        }
    }
})