import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';

type ProfileUser = {
  firstName: string;
  lastName: string;
  scdLastName: string;
  email: string;
  phone: string;
  birthDate: string;
  direction: string;
  logo: string;
  name: string;
  phoneCompany: string;
  website: string;
};

async function postProfile(userProfile: ProfileUser) { // CRUD
  const res = await axios.post('/wp-json/app/v1/p', userProfile); // TODO: change endpoint to V2
  return res;
}

const makeProfile = makeMutation(['update-profile'], postProfile, ['auth-user']);

export default makeProfile;
