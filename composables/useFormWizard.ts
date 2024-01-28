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

    activeStep = computed<Component | undefined>(() => {
        this.activeStepId.value;
        return (
            this.steps.value.find((step) => step.id == this.activeStepId.value)?.component ??
            this.steps.value[0].component
        );
    });

    state: Ref<Result<T>> = ref({ options: {}, nextStepId: this.steps.value?.[0]?.id });
    private storedOptions?: Options;

    activeStepId = ref<string | undefined>();

    navigationStack = useStack<string | undefined>();

    first = computed<boolean>(() => this.activeStepId.value == this.steps.value[0].id);
    last = computed<boolean>(() => this.activeStepId.value == this.steps.value[this.steps.value.length - 1].id);

    activeStepIndex = computed<number>(() => {
        let index: number = 0;
        this.steps.value.map((step, i) => {
            if (step.id == this.activeStepId.value) index = i;
        });
        return index;
    });

    private constructor(public id: string, steps: Step[]) {
        this.activeStepId.value = steps[0].id;
        this.navigationStack.push(steps[0].id);
        this.steps.value = steps;

        if(!process.client) return


        const persistedData = localStorage.getItem(FormWizard.getStorageKey(id))
        if(!persistedData) return
        this.state.value.data = JSON.parse(persistedData)
    }

    static getInstance = <T>(id: string, steps?: Step[], data? : boolean) => {
        const existingForm = this.forms.find((form) => form.id == id);

        if (existingForm) return existingForm;


        if(data) {
            const persistedData = localStorage.getItem(FormWizard.getStorageKey(id))
            if(!persistedData) return {}
            return Object.assign(JSON.parse(persistedData), { clear : () => FormWizard.clearData(id)} )
        }

        if (!steps || steps.length == 0) {
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

        localStorage.setItem(FormWizard.getStorageKey(this.id), JSON.stringify(this.state.value.data))
    };

    previous = (stepId?: string) => {
        if (stepId) {
            if (!this.canGoBackTo(stepId)) return;

            while (this.navigationStack.peek() != stepId) {
                this.navigationStack.pop();
            }
            this.activeStepId.value = this.navigationStack.peek();
            return;
        }

        if (this.storedOptions?.previous) {
            this.storedOptions.previous();
            this.storedOptions.previous = undefined;
            return;
        }
        this.navigationStack.pop();
        this.activeStepId.value = this.navigationStack.peek();
    };

    canGoBackTo = (stepId: string) => {
        return this.navigationStack.includes(stepId);
    };

    reset = () => {

        this.activeStepId.value = this.steps.value[0].id;
        this.navigationStack.clear();
        this.navigationStack.push(this.steps.value[0].id);
        this.activeStep = computed<Component | undefined>(() => {
            this.activeStepId.value;
            return (
                this.steps.value.find((step) => step.id == this.activeStepId.value)?.component ??
                this.steps.value[0].component
            );
        });

        this.first = computed<boolean>(() => this.activeStepId.value == this.steps.value[0].id);
        this.last = computed<boolean>(() => this.activeStepId.value == this.steps.value[this.steps.value.length - 1].id);

        this.activeStepIndex = computed<number>(() => {
            let index: number = 0;
            this.steps.value.map((step, i) => {
                if (step.id == this.activeStepId.value) index = i;
            });
            return index;
        });
    

        this.state.value.data = undefined
        this.state.value.options = undefined;
        this.storedOptions = undefined;
    };

    static clearData = (id : string) => {
        localStorage.removeItem(FormWizard.getStorageKey(id))
    }

    static getStorageKey(id : string){
        return `form-wizard:${id}`
    }

}

export default <T>(id: string, steps?: Step[], getData? : boolean): FormWizard<T> => FormWizard.getInstance<T>(id, steps, getData);
