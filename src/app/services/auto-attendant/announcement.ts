export class Announcement {
    mime: string;
    url: string;

    constructor (sourceObject: Object) {
        this.mime = sourceObject['mime'] || '';
        this.url = sourceObject['url'] || '';
    }
}

