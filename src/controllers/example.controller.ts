import { Service } from 'typedi';
import { ExampleService } from '../services';

@Service()
export class ExampleController {
    constructor(private service: ExampleService) {
        this.delete = this.delete.bind(this);
        this.find = this.find.bind(this);
        this.list = this.list.bind(this);
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }

    delete() {}

    find() {}

    list() {}

    store() {}

    update() {}
}
