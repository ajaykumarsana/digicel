export class AudioFile {
    level: string;
    mediaFileType: string;
    name: string;

    constructor (sourceObject: Object) {
        this.level = sourceObject['level'] || '';
        this.mediaFileType = sourceObject['mediaFileType'] || '';
        this.name = sourceObject['name'] || '';
    }
}

