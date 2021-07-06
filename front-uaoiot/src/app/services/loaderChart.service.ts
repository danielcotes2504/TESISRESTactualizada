import {
    ComponentFactoryResolver,
    Injectable,
    Inject,
    ReflectiveInjector
} from '@angular/core';

import { ChartComponent } from '../components/chart.component';

@Injectable()

export class LoaderChart {

    public factoryResolver;
    public rootViewContainer;

    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }

    addDynamicComponent() {
        const factory = this.factoryResolver.resolveComponentFactory(ChartComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);
    }

}
