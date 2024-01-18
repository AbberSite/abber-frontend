import type { Component } from 'vue';

type Options = { activeNavigationIndex?: number; ignore?: boolean; previous?: Function };

interface Result<T> {
    nextStepId: string;
    options?: Options;
    data?: T;
}

type Step = {
    id: string;
    component: Component;
};

class FormWizard<T> {
    static forms: FormWizard<any>[] = [];

    steps = ref<Step[]>([]);

    activeStep = computed<Component|undefined>(() => this.steps.value.find((step) => step.id == this.activeStepId.value)?.component);

    state: Ref<Result<T>> = ref({ options: {}, nextStepId: this.steps.value?.[0]?.id });
    private storedOptions?: Options;

    activeStepId = ref<string | undefined>();

    navigationStack = useStack<string | undefined>();

    first = computed<boolean>(() => this.activeStepId.value == this.steps.value[0].id)
    last = computed<boolean>(() => this.activeStepId.value == this.steps.value[this.steps.value.length - 1].id)

    activeStepIndex = computed<number>(() => {
        let index : number = 0; 

        this.steps.value.map((step, i) => {
            if(step.id == this.activeStepId.value) index = i 
        })
        return index
    })

    private constructor(public id: string, steps: Step[]) {
        this.activeStepId.value = steps[0].id
        this.navigationStack.push(steps[0].id);

        this.steps.value = steps;
    }

    static getInstance = <T>(id: string, steps?: Step[]) => {
        const existingForm = this.forms.find((form) => form.id == id);

        if (existingForm) return existingForm;

        if (!steps) {
            throw Error('No steps provided');
        }

        const newForm = new FormWizard<T>(id, steps);

        this.forms.push(newForm);

        return newForm;
    };

    next = (result: Result<T>) => {
        this.activeStepId.value = result.nextStepId;
        if (!result.options?.ignore) {
            this.navigationStack.push(this.activeStepId.value);
        }


        if (result.data) {
            if (!this.state.value.data) {
                this.state.value.data = Object.assign({}, result.data);
            } else {
                this.state.value.data = Object.assign(this.state.value.data as Object, result.data);
            }
        }

        this.storedOptions = result.options;
    };
    previous = () => {
        if (this.storedOptions?.previous) {
            this.storedOptions.previous();
            this.storedOptions.previous = undefined;
            return;
        }
        this.navigationStack.pop();
        this.activeStepId.value = this.navigationStack.peek();
    };
}

export default <T>(id: string, steps?: Step[]): FormWizard<T> => FormWizard.getInstance<T>(id, steps);
