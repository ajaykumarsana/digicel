import { HuntGroupMember } from './hunt-group-member';

export class HuntGroup {
        public extension: string;
        public huntGroupId: string;
        public huntGroupName: string;
        public isActive: string;
        public language: string;
        public members: HuntGroupMember[];
        public noAnswerNumberOfRings: number;
        public phoneNumber: string;
        public policy: 'Circular' | 'Regular' | 'Simultaneous' | 'Uniform' | 'Weighted';
        public timezone: string;

        constructor (sourceObject: Object) {
            this.extension = sourceObject['extension'] || '';
            this.huntGroupId = sourceObject['huntGroupId'] || '';
            this.huntGroupName = sourceObject['huntGroupName'] || '';
            this.isActive = sourceObject['isActive'] || '';
            this.language = sourceObject['language'] || '';
            this.members = sourceObject['members'] || [];
            this.noAnswerNumberOfRings =  sourceObject['noAnswerNumberOfRings'] || 5;
            this.phoneNumber = sourceObject['phoneNumber'] || '';
            this.policy = sourceObject['policy'] || 'Regular';
            this.timezone = sourceObject['timezone'] || '';
        }
    }
