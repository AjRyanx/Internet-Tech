import { Users, Phone, MapPin, Droplet } from 'lucide-react';

interface MemberProfile {
  id: number;
  name: string;
  bloodGroup: string;
  stateOfOrigin: string;
  phoneNumber: string;
  hobbies: string[];
  avatarColor: string;
}

const memberProfiles: MemberProfile[] = [
  {
    id: 1,
    name: 'Adebayo Oluwaseun',
    bloodGroup: 'O+',
    stateOfOrigin: 'Lagos',
    phoneNumber: '+234 801 234 5678',
    hobbies: ['Coding', 'Reading', 'Chess', 'Photography'],
    avatarColor: '#10b981',
  },
  {
    id: 2,
    name: 'Chioma Nwosu',
    bloodGroup: 'A+',
    stateOfOrigin: 'Anambra',
    phoneNumber: '+234 802 345 6789',
    hobbies: ['Music', 'Dancing', 'Cooking', 'Travel'],
    avatarColor: '#6366f1',
  },
  {
    id: 3,
    name: 'Ibrahim Mohammed',
    bloodGroup: 'B+',
    stateOfOrigin: 'Kano',
    phoneNumber: '+234 803 456 7890',
    hobbies: ['Football', 'Gaming', 'Writing', 'Swimming'],
    avatarColor: '#f59e0b',
  },
  {
    id: 4,
    name: 'Fatima Abubakar',
    bloodGroup: 'AB+',
    stateOfOrigin: 'Kaduna',
    phoneNumber: '+234 804 567 8901',
    hobbies: ['Painting', 'Poetry', 'Hiking', 'Volunteering'],
    avatarColor: '#ec4899',
  },
  {
    id: 5,
    name: 'Ngozi Okafor',
    bloodGroup: 'O-',
    stateOfOrigin: 'Enugu',
    phoneNumber: '+234 805 678 9012',
    hobbies: ['Fashion', 'Movies', 'Fitness', 'Baking'],
    avatarColor: '#8b5cf6',
  },
  {
    id: 6,
    name: 'Emeka Okonkwo',
    bloodGroup: 'A-',
    stateOfOrigin: 'Imo',
    phoneNumber: '+234 806 789 0123',
    hobbies: ['Basketball', 'Technology', 'Music Production', 'Traveling'],
    avatarColor: '#14b8a6',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function MemberProfiles() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-accent" />
          <h1>Member Profiles</h1>
        </div>
        <p className="text-muted-foreground">
          Detailed information about all group members
        </p>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {memberProfiles.map((member) => (
          <div
            key={member.id}
            className="bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Card Header with Avatar */}
            <div className="bg-gradient-to-br from-primary to-primary/80 p-6 pb-16 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div
                  className="w-24 h-24 rounded-full border-4 border-card flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: member.avatarColor }}
                >
                  <span className="text-2xl">{getInitials(member.name)}</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="pt-16 pb-6 px-6">
              {/* Name */}
              <div className="text-center mb-6">
                <h3 className="text-card-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">Group Member</p>
              </div>

              {/* Details Grid */}
              <div className="space-y-4 mb-6">
                {/* Blood Group */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-sm">Blood Group</p>
                    <p className="text-card-foreground">{member.bloodGroup}</p>
                  </div>
                </div>

                {/* State of Origin */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-sm">State of Origin</p>
                    <p className="text-card-foreground">{member.stateOfOrigin}</p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-sm">Phone Number</p>
                    <p className="text-card-foreground">{member.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Hobbies Tag Cloud */}
              <div>
                <p className="text-muted-foreground text-sm mb-3">Hobbies & Interests</p>
                <div className="flex flex-wrap gap-2">
                  {member.hobbies.map((hobby, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors cursor-default"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6">
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-2 text-sm">Total Members</p>
          <p className="text-3xl text-card-foreground">{memberProfiles.length}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-2 text-sm">Blood Groups</p>
          <p className="text-3xl text-card-foreground">
            {new Set(memberProfiles.map(m => m.bloodGroup)).size}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-2 text-sm">States</p>
          <p className="text-3xl text-card-foreground">
            {new Set(memberProfiles.map(m => m.stateOfOrigin)).size}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-2 text-sm">Total Hobbies</p>
          <p className="text-3xl text-card-foreground">
            {new Set(memberProfiles.flatMap(m => m.hobbies)).size}
          </p>
        </div>
      </div>
    </div>
  );
}
