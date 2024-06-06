import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Taras Skorohod',
    email: 'skorohodit12@gmail.com',
    password: 'demo1234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+380 95 654 99 92',
    country: 'Ukraine',
    address: 'St. heroes of Sevastopol 15',
    state: 'Kiev',
    city: 'Kiev',
    zipCode: '03124',
    about: 'HI',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
