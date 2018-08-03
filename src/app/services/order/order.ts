import { IOrderLineContact, IAddress } from 'interfaces';
import { ProspectCustomer } from '../prospect-customer';
import { ProspectTeamMember } from '../team';
import { Device } from '../catalog/device';
import { Port } from 'services';
import { ServicePack } from '../service-packs/service-pack';

export class Order {
    public acceptTermsAndConditions: boolean;
    public company: string;
    public companyAddress: IAddress;
    public serviceProviderId: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public mainUser: boolean;
    public phoneNumber: string; // company phone
    public contacts: Array<IOrderLineContact>; // team contacts
    public lineAssignments: object;
    public portingLines: Port[] = [];
    public devices: Array<Device>;
    public servicePacks: Array<ServicePack>;

    constructor(
      prospectCustomer: ProspectCustomer,
      teamMembers: ProspectTeamMember[],
      serviceProviderId: string,
      acceptTermsAndConditions: boolean
    ) {
      const teamContacts = [];
      for (let i = 0; i < teamMembers.length; i++) {
        teamContacts.push({
          name: teamMembers[i].fullName,
          email: teamMembers[i].email,
          generatePhoneNum: teamMembers[i].phone
        });
      }
      // TODO: Better way to designate admin users
      teamContacts[0].adminUser = true;

      const devices = [];
      for (let i = 0; i < teamMembers.length; i++) {
        if (teamMembers[i].device) {
          devices.push({
            deviceId: teamMembers[i].device['id'],
            name: teamMembers[i].fullName + ' ' + teamMembers[i].device['name'],
            lineAssignments: [teamMembers[i].phone]
          });
        }
      }

      const servicePacks = [];
      for (let i = 0; i < teamMembers.length; i++) {
        if (teamMembers[i].servicePack) {
          servicePacks.push({
            servicePackId: teamMembers[i].servicePack['servicePackId'],
            name: teamMembers[i].fullName + ' ' + teamMembers[i].servicePack['servicePackName'],
            lineAssignments: [teamMembers[i].phone]
          });
        }
      }

      this.acceptTermsAndConditions = acceptTermsAndConditions;
      this.serviceProviderId = serviceProviderId;
      this.company = prospectCustomer.company;
      this.companyAddress = prospectCustomer.companyAddress;
      this.email = prospectCustomer.email;
      this.firstName = prospectCustomer.firstName;
      this.lastName = prospectCustomer.lastName;
      this.phoneNumber = prospectCustomer.phone;
      this.mainUser = prospectCustomer.mainUser;
      this.contacts = teamContacts;
      this.lineAssignments = {
        autoAttendant: prospectCustomer.autoAttendantPhone,
        userVoiceMessaging: prospectCustomer.voiceMessagingPhone,
        callQueue: prospectCustomer.callQueuePhone,
        fax: prospectCustomer.faxNumber
      };

      this.devices = devices;
      // Once backend is updated to recieve this property we can uncomment this line
      // this.servicePacks = servicePacks;
    }
}
