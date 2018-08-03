
// not sure where this object is used, but going to make a hunt group service and class in services
import { TeamMember } from 'services';

export class HuntGroup {
  groupId: string;
  teamMembers: TeamMember[];
  members: string[];
  groupName: string;
  policy: 'Circular' | 'Regular' | 'Simultaneous' | 'Uniform' | 'Weighted';
  phoneNumber: string;
  extension: string;
  open: boolean;
}
