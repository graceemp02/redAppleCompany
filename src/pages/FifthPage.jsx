/** @format */

import { Stack } from '@mui/system';

import FileInput from '../components/FileInput';
import TextInput from '../components/TextInput';
import DateInput from '../components/DateInput';
const FifthPage = () => {
  return (
    <Stack direction='column' gap='.7vh'>
      <FileInput
        name='certificationApplication'
        lable='Red Apple to Issue Certification Application'
      />
      <TextInput name='certificationApproveBy' lable='Certification Approved By' type='text' />
        <DateInput 
        name='warrantyAgreeDate'
        lable='1 Year Warranty Agreement Termination Date'
        type='date'
      />
      <FileInput
        name='agreementCertification'
        lable='Agreement To Maintain And Keep Certification'
      />
    </Stack>
  );
};

export default FifthPage;
