import { Injectable } from '@angular/core';


@Injectable()
export class RecommendedGreetingService {

    // This need some work for translations, etc
    getLeadIn(action: string, description: string) {
        let leadin = 'For';

        switch (action.toLowerCase()) {
            case 'name dialing':
            case 'repeat menu':
                leadin = 'To';
                break;
            case 'transfer without prompt':
                if (description.toLowerCase() === 'leave a message') {
                    leadin = 'To';
                }
                break;
            case 'transfer with prompt':
                break;
            default:
                break;
        }

        return leadin;
    }
}
