/** @format */

import { Stack } from '@mui/system';
import TextInput from '../components/TextInput';
const FourthPage = () => {
  return (
    <Stack direction='column' gap='.7vh'>
      <TextInput name='depositCheque' lable='Deposit cheque/payment' type='text' />
      <TextInput name='equipmentSetting' lable='All Equipment Setting Completion 25%' type='text' />
      <TextInput name='internalDuct' lable='Internal Duct Work Completion 25%' type='text' />
      <TextInput name='exhaust' lable='Entry/ Exhaust System Completion 15%' type='text' />
      <TextInput name='wiring' lable='Wiring Rough Installation Completion 15%' type='text' />
      <TextInput
        name='finalPayment'
        lable='Final Payment After Red Apple Verification 20%'
        type='text'
      />
    </Stack>
  );
};

export default FourthPage;
