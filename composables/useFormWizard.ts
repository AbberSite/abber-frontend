import type { Component } from "vue";

type Options = { nextStep?: number; activeNavigationIndex?: number; ignore?: boolean, previous? : Function };

interface Result<T> {
    options?: Options;
    data?: T;
}


class FormWizard<T> {
    static forms: FormWizard<any>[] = [];

    state: Ref<Result<T>> = ref({ options: {} });

    steps = ref<Component[]>([]);

    activeStep = computed<Component>(() => this.steps.value[this.activeStepIndex.value])

    private storedOptions? : Options

    activeStepIndex = ref(0);
    activeNavigationIndex = ref(0);
    navigationStack = useStack<number>();

    private constructor(public id: string, steps : Component[]) {
        this.navigationStack.push(0);
        this.steps.value = steps

    }

    static getInstance = <T>(id: string, steps? : Component[]) => {
        const existingForm = this.forms.find((form) => form.id == id);

        if (existingForm) return existingForm;

        if(!steps){
            throw Error("No steps provided")
        }

        const newForm = new FormWizard<T>(id, steps);

        this.forms.push(newForm);

        return newForm;
    };

    next = (result?: Result<T>) => {
        if (!result || (Object.keys(result.data as {}).length == 0 && Object.keys(result.options as {}).length == 0)) {
            this.activeStepIndex.value++;
            this.navigationStack.push(this.activeStepIndex.value);
            return;
        }

        if (result.data) {
            if (!this.state.value.data) {
                this.state.value.data = Object.assign({}, result.data);
            } else {
                this.state.value.data = Object.assign(this.state.value.data as Object, result.data);
            }
        }

        this.handleOption(result.options);
    };

    handleOption = (options?: Options) => {
        if (options?.nextStep) {
            this.activeStepIndex.value = options.nextStep;
        } else {
            this.activeStepIndex.value++;
        }

        if (options?.activeNavigationIndex) {
            this.activeNavigationIndex.value = options.activeNavigationIndex;
        } else {
            this.activeNavigationIndex.value = this.activeStepIndex.value;
        }

        if (this.state.value.options) {
            this.state.value.options.nextStep = undefined;
            this.state.value.options.activeNavigationIndex = undefined;
        }

        this.storedOptions = options

        if (options?.ignore) return;

        this.navigationStack.push(this.activeStepIndex.value);
    };

    previous = () => {

        if(this.storedOptions?.previous){

            this.storedOptions.previous()
            this.storedOptions.previous = undefined
            return
            
        }

        
        this.navigationStack.pop();
        this.activeStepIndex.value = this.navigationStack.peek();
        this.activeNavigationIndex.value = this.activeStepIndex.value;
    };
}

export default <T>(id: string, steps?: Component[]): FormWizard<T> => FormWizard.getInstance<T>(id, steps);
