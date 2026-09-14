import { nameAvatarUrl } from 'lib/nameAvatarUrl';

/** Fallback avatar seed used when a user has no name yet. */
export const DEFAULT_USER_AVATAR = nameAvatarUrl('user');

export const FILTER_DATE = 'Jan 6, 2025';

export const ROLE_CYCLE = [
  [{ key: 'teacher', label: 'Teacher' }],
  [{ key: 'dean', label: 'Dean' }],
  [{ key: 'student', label: 'Student' }],
  [{ key: 'admin', label: 'Admin' }],
];

export const USERS_SEED = (() => {
  const first = [
    {
      id: 'u1',
      name: 'Olivia Rhye',
      handle: 'olivia',
      avatar: nameAvatarUrl('olivia'),
      roles: [{ key: 'teacher', label: 'Teacher' }],
      profileType: 'User',
      phone: '+998 (33) 408 28 08',
      lastSession: 'Jan 6, 2025',
    },
    {
      id: 'u2',
      name: 'Phoenix Baker',
      handle: 'phoenix',
      avatar: nameAvatarUrl('phoenix'),
      roles: [{ key: 'dean', label: 'Dean' }],
      profileType: 'User',
      phone: '+998 (33) 408 28 08',
      lastSession: 'Jan 6, 2025',
    },
    {
      id: 'u3',
      name: 'Lana Steiner',
      handle: 'lana',
      avatar: nameAvatarUrl('lana'),
      roles: [{ key: 'student', label: 'Student' }],
      profileType: 'Student',
      phone: '+998 (33) 408 28 08',
      lastSession: 'Jan 6, 2025',
    },
    {
      id: 'u4',
      name: 'Demi Wilkinson',
      handle: 'demi',
      avatar: nameAvatarUrl('demi'),
      roles: [{ key: 'admin', label: 'Admin' }],
      profileType: 'User',
      phone: '+998 (33) 408 28 08',
      lastSession: 'Jan 6, 2025',
    },
    {
      id: 'u5',
      name: 'Candice Wu',
      handle: 'candice',
      avatar: nameAvatarUrl('candice'),
      roles: [
        { key: 'teacher', label: 'Teacher' },
        { key: 'student', label: 'Student' },
      ],
      profileType: 'User',
      phone: '+998 (33) 408 28 08',
      lastSession: 'Jan 6, 2025',
    },
  ];
  const rest = [];
  for (let i = 6; i <= 100; i += 1) {
    const rc = ROLE_CYCLE[(i - 6) % ROLE_CYCLE.length];
    rest.push({
      id: `u${i}`,
      name: `Team Member ${i}`,
      handle: `member${i}`,
      avatar: nameAvatarUrl(`member${i}`),
      roles: rc,
      profileType: i % 3 === 0 ? 'Student' : 'User',
      phone: `+998 (33) ${String(400 + (i % 90)).padStart(3, '0')} ${String(28 + (i % 70)).padStart(2, '0')} ${String(10 + (i % 89)).padStart(2, '0')}`,
      lastSession: 'Jan 6, 2025',
    });
  }
  return [...first, ...rest];
})();

export const roleBadgeClass = {
  teacher: 'border-[#D6BBFB] bg-[#F9F5FF] text-[#6941C6]',
  dean: 'border-[#B2DDFF] bg-[#EFF8FF] text-[#175CD3]',
  student: 'border-[#B2DDFF] bg-[#F0F9FF] text-[#026AA2]',
  admin: 'border-[#ABEFC6] bg-[#ECFDF3] text-[#027A48]',
};

export const selectFieldClass =
  'h-10 w-full min-w-[140px] cursor-pointer appearance-none rounded-xl border border-[#D0D5DD] bg-white py-2 pl-3.5 pr-9 text-sm font-medium text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15';

export const iconBtn =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25';
