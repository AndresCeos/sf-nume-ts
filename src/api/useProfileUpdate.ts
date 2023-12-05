import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';

type ProfileUser = {
  names?: string;
  lastName?: string;
  scdLastName?: string;
  address?: string;
  tel?: string;
  date?: string;
  company?: string;
  logoURL?: string;
  phone?: string;
  webSite?: string;
};

async function postProfile(userProfile: ProfileUser) { // CRUD
  const res = await axios.post('/wp-json/app/v1/p', userProfile); // TODO: change endpoint to V2
  return res;
}

const makeProfile = makeMutation(['update-profile'], postProfile, ['auth-user']);

export default makeProfile;
