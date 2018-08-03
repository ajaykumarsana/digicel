import { Portability } from './portability';
import { PortStatus } from './portStatus';

export class PortabilityCheck {
        public isPortable: boolean;
        public portability: Portability;
        public status: PortStatus;

        constructor (sourceObject: Object) {
            this.isPortable = sourceObject['isPortable'] || '';
            this.portability = sourceObject['portability'] || {};
            this.status = sourceObject['status'] || {};
        }
    }
