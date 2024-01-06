class FormWizard {
    data = ref<any>({});
    activeStep = ref(0);
    activeNavigationIndex = ref(0);
    navigationStack = useStack<number>();

    constructor() {
        this.navigationStack.push(0);
    }

    next = (result: any) => {
        if (!result) {
            this.activeStep.value++;
            this.navigationStack.push(this.activeStep.value);
            return;
        }

        this.data.value = Object.assign(this.data.value, result);

        if (result.nextStep) {
            this.activeStep.value = result.nextStep;
        } else {
            this.activeStep.value++;
        }

        if (this.data.value.activeNavigationIndex) {
            this.activeNavigationIndex.value = this.data.value.activeNavigationIndex;
        } else {
            this.activeNavigationIndex.value = this.activeStep.value;
        }

        this.data.value.nextStep = undefined;

        this.data.value.activeNavigationIndex = undefined;

        if (this.data.value.clearReturn) {
            this.data.value.returnStep = undefined;
            this.data.value.clearReturn = undefined;
        }

        if(result.ignore) return

        this.navigationStack.push(this.activeStep.value);



    };

    previous = () => {

        this.navigationStack.pop();
        this.activeStep.value = this.navigationStack.peek();
        this.activeNavigationIndex.value = this.activeStep.value;

    };
}

export default () => new FormWizard();
